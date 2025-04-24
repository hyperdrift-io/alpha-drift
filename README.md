# AlphaDrift

HyperDrift‑grade, AI‑powered crypto‑trading bot

Momentum · Carry · Arbitrage — all wrapped in risk guard‑rails and driven by predictive ML.

⸻

✨ Why AlphaDrift?
- Compoundable edge – momentum + perp‑funding carry + MEV rebates.
- Predictive selector – Allora + LightGBM forecast Sharpe every 5 min.
- Fail‑safe – max‑DD, gas sentinel, oracle gap veto.
- DeFi‑native – on‑chain execution via 0x RFQ + Titan builder rebates.

⸻

🚀 Quick start (dev, paper mode)

```sh
git clone <repo-url>
cd alphadrift
pnpm i
cp .env.example .env
# run database (Timescale)
docker compose up -d db
# start the agent (5‑min paper loop)
pnpm dev
```

You should see a log line every five minutes:

```
[ProviderPool] FeatureVector { ts: … price: … }
[Selector] momentum scored 1.34 Sharpe → TradeIntent emitted
[RiskGuard] OK ✔
```

⸻

🗺 Project map

| Folder           | Purpose                                 |
|------------------|-----------------------------------------|
| src/providers/   | Pyth, Dexscreener, Chainbase, BirdEye   |
| src/store/       | Timescale FeatureStore                  |
| src/strategy/    | momentum, mean‑rev, funding, arb, etc.  |
| __tests__/       | Jest tests                              |
| migrations/      | SQL schema for Timescale tables         |

⸻

⚙️ Environment variables (.env.example)

```
DB_URL=postgres://user:pass@db:5432/alphadrift
```

⸻

🧪 Tests & lint

```
pnpm test    # Jest (Node)
pnpm lint    # ESLint strict
```

Coverage gate ≥90 %.

⸻

📦 Docker compose

```
docker compose up --build    # Node agent + Postgres
```

⸻

🛡 Safety first
- Max draw‑down 5 % intraday → auto‑pause.
- Gas usage >1 % equity/day → throttle.
- Oracle gap 1 % vs DEX mid → veto.

⸻

�� Contributing (solo‑friendly!)
- Follow diff‑first in PRs: git patch then full file.
- Run pnpm test before pushing.
- Significant design changes require an ADR added to /docs/adr/.

⸻

License

MIT 