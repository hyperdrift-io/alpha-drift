import { IProvider } from './abstract';
import { FeatureVector } from '../types';

export class PythProvider implements IProvider {
  async fetch(): Promise<Partial<FeatureVector>> {
    // Mocked data for demonstration
    return {
      price: 42000,
      vol1h: 0.03,
      ts: new Date().toISOString(),
    };
  }
}
