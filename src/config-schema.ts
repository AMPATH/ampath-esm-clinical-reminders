import { Type } from '@openmrs/esm-framework';
export const configSchema = {
  etlBaseUrl: {
    _type: Type.String,
    _description: 'ETL Endpoint',
    _default: 'etl',
  },
};

export type Config = {
  etlBaseUrl: string;
};
