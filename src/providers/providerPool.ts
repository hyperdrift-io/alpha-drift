import { FeatureVector } from '../types';
import { IProvider } from './abstract';

function mergeFeatureVectors(vectors: Partial<FeatureVector>[]): FeatureVector {
  // Merge by taking the first defined value for each field
  const now = new Date().toISOString();
  const merged: FeatureVector = {
    ts: now,
    price: NaN,
    vol1h: NaN,
  };
  for (const key of Object.keys(merged) as (keyof FeatureVector)[]) {
    for (const vec of vectors) {
      if (vec[key] !== undefined) {
        // @ts-expect-error: dynamic assignment
        merged[key] = vec[key];
        break;
      }
    }
  }
  // Use now if ts is missing
  if (!merged.ts) merged.ts = now;
  // Validate required fields
  if (
    typeof merged.price !== 'number' || isNaN(merged.price) ||
    typeof merged.vol1h !== 'number' || isNaN(merged.vol1h)
  ) {
    throw new Error('Missing required fields in merged FeatureVector');
  }
  return merged;
}

export class ProviderPool {
  private providers: IProvider[];

  constructor(providers: IProvider[]) {
    this.providers = providers;
  }

  async fetchFeatureVector(): Promise<FeatureVector> {
    const timeout = 1000; // 1 second
    const promises = this.providers.map(provider =>
      Promise.race([
        provider.fetch(),
        new Promise<Partial<FeatureVector>>((_, reject) => setTimeout(() => reject(new Error('Provider timeout')), timeout))
      ])
    );
    const results: Partial<FeatureVector>[] = [];
    for (const p of promises) {
      try {
        results.push(await p);
      } catch (e) {
        // Log or handle provider error/timeout
      }
    }
    return mergeFeatureVectors(results);
  }
}

export * from './providerPool';
