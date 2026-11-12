// CatalogRecord - Basis-Typ für Katalogeinträge
// recordType ist optional, da nicht alle Fragments es enthalten
export type CatalogRecord = {
    id: string;
    recordType?: string;
    status?: "XTD_ACTIVE" | "XTD_INACTIVE" | null;
    name?: string | null;
  majorVersion?: number;
  minorVersion?: number;
    comment?: string | null;
    tags?: Array<{ id: string; name: string }>;
};

// Runtime Environment Configuration Types
export interface RuntimeEnvironmentConfig {
  MINIO_ENDPOINT: string;
  MINIO_PORT: string;
  MINIO_USE_SSL: string;
  MINIO_BUCKET_NAME: string;
  MINIO_ACCESS_KEY: string;
  MINIO_SECRET_KEY: string;
}

// Erweitere das Window Interface
declare global {
  interface Window {
    ENV_CONFIG: RuntimeEnvironmentConfig;
  }
}
