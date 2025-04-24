export interface FeatureVector {
  ts: string;           // ISO UTC
  price: number;        // mid‑price USD
  vol1h: number;        // realised σ (1h)
  funding8h?: number;   // perp funding ‰
  tvl?: number;         // protocol TVL USD
  dexDepth?: number;    // 1 bp depth USD
}
