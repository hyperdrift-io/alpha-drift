import { ProviderPool } from './providers/providerPool';
import { PythProvider, DexscreenerProvider, ChainbaseProvider, BirdeyeProvider } from './providers/abstract';
import { FeatureStore } from './store/featureStore';

async function main() {
  const providers = [
    new PythProvider(),
    new DexscreenerProvider(),
    new ChainbaseProvider(),
    new BirdeyeProvider(),
  ];
  const pool = new ProviderPool(providers);
  const store = new FeatureStore();
  try {
    const vector = await pool.fetchFeatureVector();
    await store.upsertRaw(vector);
    console.log('[ProviderPool] FeatureVector', vector);
  } catch (e) {
    console.error('Error in main:', e);
  }
}

main();
