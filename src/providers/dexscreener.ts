import { IProvider } from './abstract';
import { FeatureVector } from '../types';

export class DexscreenerProvider implements IProvider {
  async fetch(): Promise<Partial<FeatureVector>> {
    // Mocked data for demonstration
    return {
      tvl: 1000000,
      dexDepth: 50000,
    };
  }
}
