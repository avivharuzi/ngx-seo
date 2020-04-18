import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { NgxSeoConfig } from './shared/ngx-seo-config';
import { NgxSeoService } from './shared/ngx-seo.service';

@NgModule({
  imports: [CommonModule],
})
export class NgxSeoModule {
  constructor(@Optional() @SkipSelf() parentModule?: NgxSeoModule) {
    if (parentModule) {
      throw new Error('NgxSeoModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: NgxSeoConfig = { preserve: false }): ModuleWithProviders {
    return {
      ngModule: NgxSeoModule,
      providers: [
        NgxSeoService,
        {
          provide: 'config',
          useValue: config,
        },
      ],
    };
  }
}
