import { InjectionToken } from '@angular/core';

export interface NgxSeoConfig {
  changeTitle: (title: string) => string;
  preserve: boolean;
  listenToRouteEvents: boolean;
}

export const defaultNgxSeoConfig: NgxSeoConfig = {
  changeTitle: (title) => title,
  preserve: false,
  listenToRouteEvents: true,
};

export const NGX_SEO_CONFIG_TOKEN = new InjectionToken<NgxSeoConfig>(
  'ngx-seo.config'
);
