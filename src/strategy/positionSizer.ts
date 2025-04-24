import { FeatureVector } from '../types';

export class PositionSizer {
  size(vector: FeatureVector): number {
    // Mock sizing logic
    return Math.max(1, (vector.tvl ?? 10000) / 10000);
  }
}

export * from './positionSizer';
