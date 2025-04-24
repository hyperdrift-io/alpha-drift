import { FeatureVector } from '../types';

export interface IProvider {
  fetch(): Promise<Partial<FeatureVector>>;
}

export * from './pyth';
export * from './dexscreener';
export * from './chainbase';
export * from './birdeye';
