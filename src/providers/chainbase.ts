import { IProvider } from './abstract';
import { FeatureVector } from '../types';

export class ChainbaseProvider implements IProvider {
  async fetch(): Promise<Partial<FeatureVector>> {
    // Mocked data for demonstration
    return {
      funding8h: 0.1,
    };
  }
}
