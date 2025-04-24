import { FeatureVector } from '../types';

export class ArbStrategy {
  score(vector: FeatureVector): number {
    // Mock scoring logic
    return (vector.tvl ?? 0) / 1000;
  }
}

export * from './arb';
