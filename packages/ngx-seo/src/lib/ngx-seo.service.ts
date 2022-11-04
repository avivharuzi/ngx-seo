import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { NGX_SEO_META_KEYS } from './ngx-seo-meta-keys';
import { NGX_SEO_TITLE_KEYS } from './ngx-seo-title-keys';
import { NgxSeo, NgxSeoMeta } from './ngx-seo';
import { NGX_SEO_CONFIG_TOKEN, NgxSeoConfig } from './ngx-seo-config';

@Injectable()
export class NgxSeoService {
  constructor(
    @Inject(NGX_SEO_CONFIG_TOKEN) private config: NgxSeoConfig,
    private activatedRoute: ActivatedRoute,
    private meta: Meta,
    private router: Router,
    private title: Title
  ) {
    if (config.listenToRouteEvents) {
      this.subscribe();
    }
  }

  setSeo(seo: NgxSeo): void {
    if (!this.config.preserve) {
      this.removeMeta();
    }

    if (seo.title) {
      this.setTitle(seo.title);
    }

    if (seo.meta) {
      this.setMeta(seo.meta);
    }
  }

  setTitle(title: string): void {
    title = this.config.changeTitle(title);

    const ogTitle: MetaDefinition = {
      property: NGX_SEO_TITLE_KEYS.ogTitle,
      content: title,
    };
    const twitterTitle: MetaDefinition = {
      name: NGX_SEO_TITLE_KEYS.twitterTitle,
      content: title,
    };
    const googleTitle: MetaDefinition = {
      itemprop: NGX_SEO_TITLE_KEYS.name,
      content: title,
    };

    this.meta.removeTag('itemprop="name"'); // Because if we not remove the tag it will not be updated.

    this.title.setTitle(title);

    this.meta.updateTag(ogTitle);
    this.meta.updateTag(twitterTitle);
    this.meta.updateTag(googleTitle);
  }

  setMeta(meta: NgxSeoMeta): void {
    if (meta.keywords) {
      this.setMetaKeywords(meta.keywords);
    }

    if (meta.description) {
      this.setMetaDescription(meta.description);
    }

    if (meta.type) {
      this.setMetaType(meta.type);
    }

    if (meta.card) {
      this.setMetaCard(meta.card);
    }

    if (meta.image) {
      this.setMetaImage(meta.image);
    }

    if (meta.url) {
      this.setMetaUrl(meta.url);
    }

    if (meta.author) {
      this.setMetaAuthor(meta.author);
    }

    if (meta.siteName) {
      this.setMetaSiteName(meta.siteName);
    }

    if (meta.canonical) {
      this.setMetaCanonical(meta.canonical);
    }

    if (meta.customTags && meta.customTags.length > 0) {
      this.setMetaCustomTags(meta.customTags);
    }
  }

  setMetaKeywords(metaKeywords: string | string[]): void {
    const keywordsContent: string =
      typeof metaKeywords === 'string' ? metaKeywords : metaKeywords.join(', ');
    const keywords: MetaDefinition = {
      name: NGX_SEO_META_KEYS.keywords,
      content: keywordsContent,
    };

    this.meta.updateTag(keywords);
  }

  setMetaDescription(metaDescription: string): void {
    const description: MetaDefinition = {
      name: NGX_SEO_META_KEYS.description,
      content: metaDescription,
    };
    const ogDescription: MetaDefinition = {
      property: NGX_SEO_META_KEYS.ogDescription,
      content: metaDescription,
    };
    const twitterDescription: MetaDefinition = {
      name: NGX_SEO_META_KEYS.twitterDescription,
      content: metaDescription,
    };
    const googleDescription: MetaDefinition = {
      itemprop: NGX_SEO_META_KEYS.description,
      content: metaDescription,
    };

    this.meta.removeTag('itemprop="description"'); // Because if we not remove the tag it will not be updated.

    this.meta.updateTag(description);
    this.meta.updateTag(ogDescription);
    this.meta.updateTag(twitterDescription);
    this.meta.updateTag(googleDescription);
  }

  setMetaType(metaType: string): void {
    const ogType: MetaDefinition = {
      property: NGX_SEO_META_KEYS.ogType,
      content: metaType,
    };

    this.meta.updateTag(ogType);
  }

  setMetaCard(metaCard: string): void {
    const twitterCard: MetaDefinition = {
      name: NGX_SEO_META_KEYS.twitterCard,
      content: metaCard,
    };

    this.meta.updateTag(twitterCard);
  }

  setMetaImage(metaImage: string): void {
    const ogImage: MetaDefinition = {
      property: NGX_SEO_META_KEYS.ogImage,
      content: metaImage,
    };
    const twitterImage: MetaDefinition = {
      name: NGX_SEO_META_KEYS.twitterImage,
      content: metaImage,
    };
    const googleImage: MetaDefinition = {
      itemprop: NGX_SEO_META_KEYS.image,
      content: metaImage,
    };

    this.meta.removeTag('itemprop="image"'); // Because if we not remove the tag it will not be updated.

    this.meta.updateTag(ogImage);
    this.meta.updateTag(twitterImage);
    this.meta.updateTag(googleImage);
  }

  setMetaUrl(metaUrl: string): void {
    const ogUrl: MetaDefinition = {
      property: NGX_SEO_META_KEYS.ogURL,
      content: metaUrl,
    };
    const twitterUrl: MetaDefinition = {
      name: NGX_SEO_META_KEYS.twitterURL,
      content: metaUrl,
    };

    this.meta.updateTag(ogUrl);
    this.meta.updateTag(twitterUrl);
  }

  setMetaAuthor(metaAuthor: string): void {
    const author: MetaDefinition = {
      name: NGX_SEO_META_KEYS.author,
      content: metaAuthor,
    };

    this.meta.updateTag(author);
  }

  setMetaSiteName(metaSiteName: string): void {
    const siteName: MetaDefinition = {
      name: NGX_SEO_META_KEYS.ogSiteName,
      content: metaSiteName,
    };

    this.meta.updateTag(siteName);
  }

  setMetaCanonical(metaCanonical: string): void {
    const canonical: MetaDefinition = {
      name: NGX_SEO_META_KEYS.canonical,
      content: metaCanonical,
    };

    this.meta.updateTag(canonical);
  }

  setMetaCustomTags(customTags: MetaDefinition[]): void {
    customTags.forEach((customTag) => {
      this.meta.updateTag(customTag);
    });
  }

  /**
   * Will remove all meta tags from HTML document.
   */
  removeMeta(): void {
    Object.values(NGX_SEO_META_KEYS).forEach((value) => {
      this.meta.removeTag(`name="${value}"`);
      this.meta.removeTag(`itemprop="${value}"`);
      this.meta.removeTag(`property="${value}"`);
    });
  }

  /**
   * Will listen to router changes and if seo key exist in router data try to add it to HTML document tags.
   */
  private subscribe(): Subscription {
    return this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        if (data['seo']) {
          this.setSeo(data['seo']);
        }
      });
  }
}
