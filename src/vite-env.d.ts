/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LINKEDIN_CLIENT_ID: string;
  readonly VITE_LINKEDIN_REDIRECT_URI?: string;
  readonly VITE_LINKEDIN_TOKEN_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
