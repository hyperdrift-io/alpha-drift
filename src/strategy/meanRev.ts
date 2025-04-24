import { FeatureVector } from '../types';

export class MeanRevStrategy {
  score(vector: FeatureVector): number {
    // Mock scoring logic
    return (vector.vol1h ?? 0) - (vector.price ?? 0);
  }
}

export * from './meanRev';
