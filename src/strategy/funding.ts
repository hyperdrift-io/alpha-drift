import { FeatureVector } from '../types';

export class FundingStrategy {
  score(vector: FeatureVector): number {
    // Mock scoring logic
    return (vector.funding8h ?? 0) * 10;
  }
}

export * from './funding';
