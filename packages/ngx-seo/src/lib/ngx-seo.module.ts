import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import {
  defaultNgxSeoConfig,
  NGX_SEO_CONFIG_TOKEN,
  NgxSeoConfig,
} from './ngx-seo-config';
import { NgxSeoService } from './ngx-seo.service';

@NgModule()
export class NgxSeoModule {
  constructor(@Optional() @SkipSelf() parentModule?: NgxSeoModule) {
    if (parentModule) {
      throw new Error(
        'NgxSeoModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(
    config: Partial<NgxSeoConfig> = {}
  ): ModuleWithProviders<NgxSeoModule> {
    const updatedConfig: NgxSeoConfig = {
      ...defaultNgxSeoConfig,
      ...config,
    };

    return {
      ngModule: NgxSeoModule,
      providers: [
        NgxSeoService,
        {
          provide: NGX_SEO_CONFIG_TOKEN,
          useValue: updatedConfig,
        },
      ],
    };
  }
}
