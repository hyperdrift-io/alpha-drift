import { IProvider } from './abstract';
import { FeatureVector } from '../types';

export class BirdeyeProvider implements IProvider {
  async fetch(): Promise<Partial<FeatureVector>> {
    // No unique fields for this stub
    return {};
  }
}
