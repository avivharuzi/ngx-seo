import { MetaDefinition } from '@angular/platform-browser';

export interface NgxSeoMeta {
  keywords?: string | string[];
  description?: string;
  type?: string;
  card?: string;
  image?: string;
  url?: string;
  author?: string;
  siteName?: string;
  canonical?: string;
  customTags?: MetaDefinition[];
}

export interface NgxSeo {
  title?: string;
  meta?: NgxSeoMeta;
}
