export interface NgxSeoMeta {
  keywords?: string | string[];
  description?: string;
  type?: string;
  card?: string;
  image?: string;
  url?: string;
  author?: string;
  siteName?: string;
}

export interface NgxSeo {
  title?: string;
  meta?: NgxSeoMeta;
}
