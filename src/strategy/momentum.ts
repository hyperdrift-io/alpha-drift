import { FeatureVector } from '../types';

export class MomentumStrategy {
  score(vector: FeatureVector): number {
    // Mock scoring logic
    return (vector.price ?? 0) * (vector.vol1h ?? 0);
  }
}

export * from './momentum';
