# AlphaDrift — Concise Road‑map (3 Milestones)

> Each milestone prompt is copy‑ready for Cursor (**`#model: gpt-4.1`**); no extra decisions needed.  Follow diff‑first rule and maintain tests ≥90 % coverage.

| # | Milestone | Bundled Scope | Expected Outcome |
|---|-----------|---------------|------------------|
| **M0** | **Scaffold & Engine** | README · pkg/tsconfig · ProviderPool · FeatureStore · Strategy lib + PositionSizer · IdleRestake | Repo compiles, tests pass, `pnpm dev` logs FeatureVector every tick. |
| **M1** | **Decision & Execution** | Selector + Predictor stub · Execution Router + MEV builder · RiskGuard · Agent wiring · Multi‑instance advisory lock | Agent produces TradeIntent, risk‑checked, paper logs TX hash. |
| **M2** | **DriftBrain + CI** | Python FastAPI service (/predict, /train) · Optuna trainer · Dockerfile · GitHub Actions (Node+Py) | `/predict` returns Sharpe; CI green; docker‑compose up brings entire stack. |

---
## Milestone 0 Prompt
```text
#model: gpt-4.1
Ship Milestone 0 for AlphaDrift.
─────────────────────────────────────────────────
1. CONTEXT: empty repo.
2. MUST CREATE:
   • README.md (vision, quick‑start)
   • package.json (deps @elizaos/core, dotenv, jest)
   • tsconfig.json (strict)
   • src/types.ts (FeatureVector spec)
   • src/providers/{abstract, pyth, dexscreener, chainbase, birdeye, providerPool}.ts
   • migrations/001_init.sql (Timescale schema)
   • src/store/featureStore.ts (+ tests)
   • src/strategy/{momentum, meanRev, funding, arb, positionSizer, idleRestake}.ts (+ tests)
   • src/index.ts & src/agent.ts wiring ProviderPool→FeatureStore.
   • __tests__/ all Jest ≥90 %.
3. RULES: diff‑first then full, no `any`, env via dotenv.
4. DELIVERABLE ORDER: ProviderPool ➜ FeatureStore ➜ strategies ➜ agent wire.
Start with ProviderPool patch.
```

---
## Milestone 1 Prompt
```text
#model: gpt-4.1
Ship Milestone 1: Decision & Execution.
1. CONTEXT: M0 code compiles.
2. MUST ADD:
   • src/selector/{selector, alloraPredictor(stub), llmOverlay}.ts
   • src/execution/{router, swap0x, swapCow, swapParaswap, mevBuilder}.ts
   • src/risk/{riskGuard, drawdownCheck, gasCheck, oracleGapCheck}.ts
   • Idempotent hash + trade_log table; pg_advisory_lock(42) in agent.
   • Tests for selector, router, risk guard (nock mocks).
3. Update agent.ts to register selector, router, riskGuard; verify TradeIntent printed.
4. RULES: diff‑first, coverage ≥90 %.
Start with selector patch.
```

---
## Milestone 2 Prompt
```text
#model: gpt-4.1
Ship Milestone 2: DriftBrain side‑car + CI.
1. CONTEXT: Node agent paper‑trades.
2. MUST ADD PYTHON:
   • python-quant/ {main.py FastAPI, train.py, requirements.txt}
   • Endpoints: /predict (schema {predSharpe,edgeProb}), /train, /health
   • Dockerfile (python:3.11-slim) and docker‑compose service.
   • pytest with httpx mocks.
   • Optuna 10 000 TPE trials, LightGBM model save.
3. NODE UPDATE: src/selector/alloraPredictor.ts call /predict via axios.
4. CI: .github/workflows/{node.yml, python.yml, docker.yml}.
5. RULES: diff‑first, tests ≥90 %.
Start with FastAPI skeleton.
```

---
## Cursor Rules (global)
1. `#model: gpt-4.1` for code; `#model: claude` for docs.
2. Emit git diff then full file.
3. Keep requests ≤1500 tokens; chunk if needed.
4. Mock external HTTP in tests.

---
End of road‑map.

