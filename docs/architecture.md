# AlphaDrift — System Architecture (v1.0)

> **Purpose** One authoritative blueprint describing every component, interface, and design decision.  Implementers must not deviate without an explicit design‑change RFC.

---
## 1 Context & Goals
* **Goal** Autonomous, AI‑assisted crypto‑trading agent for HyperDrift projects. 
* **Constraints** Runs 24 × 7, low‑fee on‑chain execution, codebase in TS/Node; heavy ML in Python.

---
## 2 Macro Diagram
```mermaid
flowchart TD
  subgraph Node_Core
    PP(ProviderPool) --> FS((FeatureStore))
    FS --> Sel(Selector)
    Sel --> St{{Strategy Lib}}
    St --> Exe(Execution Router)
    Exe --> RG(RiskGuard)
    St -.-> Idle(Idle Restake)
  end
  subgraph DriftBrain [Python ML side‑car]
    FS ==> Brn[/ /predict\n/train /]
  end
  Exe --> ChainDEX((On‑chain))
  Exe --> RFQ((CEX RFQ))
  Brn ..> FS
```
*Solid lines* = synchronous calls. *Dashed* = event/idle hooks.

---
## 3 Detailed Interfaces

| Name | Direction | Payload / Spec | Notes |
|------|-----------|----------------|-------|
| **FeatureVector** | Provider → FeatureStore | See §4 | TS type enforced. |
| **/predict** | Node → DriftBrain | `{feature:FeatureVector}` → `{predSharpe:number, edgeProb:number}` | FastAPI JSON, 75 ms budget. |
| **TradeIntent** | Strategy → Router | `{pair, side, notionalUSD, hash}` | `hash = sha256(ts|pair|side)`. |
| **RiskDecision** | Router → RiskGuard | TradeIntent | RiskGuard returns `allow | veto`. |

### 3.1 FeatureVector spec (TypeScript)
```ts
export interface FeatureVector {
  ts: string;           // ISO UTC
  price: number;        // mid‑price USD
  vol1h: number;        // realised σ (1h)
  funding8h?: number;   // perp funding ‰
  tvl?: number;         // protocol TVL USD
  dexDepth?: number;    // 1 bp depth USD
}
```

---
## 4 Persistence Schema (Timescale)
```sql
CREATE TABLE feature_raw (
  ts timestamptz PRIMARY KEY,
  price numeric NOT NULL,
  vol1h numeric NOT NULL,
  funding8h numeric,
  tvl numeric,
  dexDepth numeric
);
SELECT create_hypertable('feature_raw','ts');

CREATE MATERIALIZED VIEW feature_window AS
SELECT time_bucket('5 minutes', ts) AS bucket,
       avg(price)  AS price_ma_5m,
       avg(vol1h)  AS vol1h_ma_5m,
       avg(funding8h) AS funding8h_ma_5m
FROM feature_raw
GROUP BY bucket;
```

---
## 5 Runtime Sequence
1. **Tick** (5‑min interval) emitted by `ElizaAgent`.
2. **ProviderPool** asynchronously fetches data (1‑s timeout) and merges into a FeatureVector.
3. **FeatureStore.upsertRaw** stores the vector; Timescale mat‑view refreshes.
4. **Selector** pulls latest 5‑min window, calls **DriftBrain /predict** for `predSharpe`.
5. Selector ranks strategies; highest score (>threshold) emits TradeIntent.
6. **Execution Router** queries 0x, CoW, Paraswap → chooses min effective price; wraps on‑chain swap via Titan builder; calculates idempotent hash; inserts into `trade_log`.
7. **RiskGuard.validate** runs max‑DD, gas‑budget, oracle‑gap checks; veto pauses agent via `agent.pause()`.
8. **IdleRestake** fires when Selector returns `flat`—moves idle USDC→sDAI, ETH→stETH.

---
## 6 Scaling & HA
* **pg_advisory_lock(42)** wraps selection+emit to ensure only one instance per tick.
* Duplicate TX prevented via `trade_log` hash unique index.
* DriftBrain can scale horizontally; /predict stateless.

---
## 7 Security
* Signing key stored in Docker secret, mounted read‑only.
* Env managed via `.env` (dev) or Docker secrets (prod).
* All HTTP → providers through env proxy to avoid metadata leak.

---
## 8 Container Topology (docker‑compose)
```yaml
services:
  alphadrift:
    build: .
    environment:
      - DB_URL=postgres://...
    depends_on: [db, driftbrain]
  driftbrain:
    build: python-quant/
    environment:
      - DB_URL=postgres://...
  db:
    image: postgres:15
```
*Optional scale*: `docker compose up --scale alphadrift=3`.

---
## 9 Non‑Goals / Out‑of‑scope
* HFT (<50 ms) latency.
* Native C++/Rust kernels.
* On‑chain options execution.

---
_End of architecture file_

