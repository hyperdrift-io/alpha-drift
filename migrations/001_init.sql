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

CREATE TABLE IF NOT EXISTS trade_log (
  id SERIAL PRIMARY KEY,
  ts timestamptz NOT NULL,
  pair TEXT NOT NULL,
  side TEXT NOT NULL,
  notionalUSD NUMERIC NOT NULL,
  hash TEXT UNIQUE NOT NULL,
  tx_hash TEXT,
  status TEXT DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);
