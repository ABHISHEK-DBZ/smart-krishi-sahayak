/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_OPENWEATHER_API_KEY: string;
  readonly VITE_AGMARKNET_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
