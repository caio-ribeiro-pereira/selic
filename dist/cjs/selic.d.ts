import { RatesObject, RatesList } from './types.js';
/**
  * Fetch brazilian selic, cdi and ipca rates apy in object
  *
  * @returns {Promise<RatesObject>} Promise rates in object
  */
export declare function getRatesObject(): Promise<RatesObject>;
/**
  * Fetch brazilian selic, cdi and ipca rates apy in array
  *
  * @returns {Promise<RatesList[]>} Promise rates in array
  */
export declare function getRatesList(): Promise<RatesList[]>;
/**
  * Fetch brazilian selic rate
  *
  * @returns {Promise<number>} Selic rate
  */
export declare function getSelicRate(): Promise<number>;
/**
  * Fetch brazilian ipca rate
  *
  * @returns {Promise<number>} IPCA rate
  */
export declare function getIpcaRate(): Promise<number>;
/**
  * Fetch brazilian cdi rate
  *
  * @returns {Promise<number>} CDI rate
  */
export declare function getCdiRate(): Promise<number>;
