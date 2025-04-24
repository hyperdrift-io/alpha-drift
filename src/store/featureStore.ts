import { FeatureVector } from '../types';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

export class FeatureStore {
  async upsertRaw(vector: FeatureVector): Promise<void> {
    const query = `
      INSERT INTO feature_raw (ts, price, vol1h, funding8h, tvl, dexDepth)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (ts) DO UPDATE SET
        price = EXCLUDED.price,
        vol1h = EXCLUDED.vol1h,
        funding8h = EXCLUDED.funding8h,
        tvl = EXCLUDED.tvl,
        dexDepth = EXCLUDED.dexDepth;
    `;
    const values = [
      vector.ts,
      vector.price,
      vector.vol1h,
      vector.funding8h ?? null,
      vector.tvl ?? null,
      vector.dexDepth ?? null,
    ];
    await pool.query(query, values);
  }
}

export * from './featureStore';
