import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

import { NGX_SEO_META_KEYS } from './ngx-seo-meta-keys';
import { NGX_SEO_TITLE_KEYS } from './ngx-seo-title-keys';
import { NgxSeo, NgxSeoMeta } from './ngx-seo';
import { NgxSeoConfig } from './ngx-seo-config';

@Injectable()
export class NgxSeoService {
  constructor(
    @Inject('config') private config: NgxSeoConfig,
    private activatedRoute: ActivatedRoute,
    private meta: Meta,
    private router: Router,
    private title: Title,
  ) {
  }

  /**
   * Will listen to router changes and if seo key exist in router data try to add it to HTML document tags.
   */
  subscribe(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(_ => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data),
      )
      .subscribe(event => {
        if (Object.prototype.hasOwnProperty.call(event, 'seo')) {
          this.setSeo(event.seo);
        }
      });
  }

  setSeo(seo: NgxSeo): void {
    if (!this.config.preserve) {
      this.removeMeta();
    }

    if (Object.prototype.hasOwnProperty.call(seo, 'title')) {
      this.setTitle(seo.title);
    }

    if (Object.prototype.hasOwnProperty.call(seo, 'meta')) {
      this.setMeta(seo.meta);
    }
  }

  setTitle(title: string): void {
    const titleSuffixBefore = this.config.titleSuffixBefore ? this.config.titleSuffixBefore : '';
    const titleSuffixAfter = this.config.titleSuffixAfter ? this.config.titleSuffixAfter : '';

    title = `${titleSuffixBefore}${title}${titleSuffixAfter}`;

    const ogTitle: MetaDefinition = { property: NGX_SEO_TITLE_KEYS.OG_TITLE, content: title };
    const twitterTitle: MetaDefinition = { name: NGX_SEO_TITLE_KEYS.TWITTER_TITLE, content: title };
    const googleTitle: MetaDefinition = { itemprop: NGX_SEO_TITLE_KEYS.NAME, content: title };

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
  }

  setMetaKeywords(metaKeywords: string | string[]): void {
    const keywordsContent: string = typeof metaKeywords === 'string' ? metaKeywords : metaKeywords.join(', ');
    const keywords: MetaDefinition = { name: NGX_SEO_META_KEYS.KEYWORDS, content: keywordsContent };

    this.meta.updateTag(keywords);
  }

  setMetaDescription(metaDescription: string): void {
    const description: MetaDefinition = { name: NGX_SEO_META_KEYS.DESCRIPTION, content: metaDescription };
    const ogDescription: MetaDefinition = { property: NGX_SEO_META_KEYS.OG_DESCRIPTION, content: metaDescription };
    const twitterDescription: MetaDefinition = { name: NGX_SEO_META_KEYS.TWITTER_DESCRIPTION, content: metaDescription };
    const googleDescription: MetaDefinition = { itemprop: NGX_SEO_META_KEYS.DESCRIPTION, content: metaDescription };

    this.meta.removeTag('itemprop="description"'); // Because if we not remove the tag it will not be updated.

    this.meta.updateTag(description);
    this.meta.updateTag(ogDescription);
    this.meta.updateTag(twitterDescription);
    this.meta.updateTag(googleDescription);
  }

  setMetaType(metaType: string): void {
    const ogType: MetaDefinition = { property: NGX_SEO_META_KEYS.OG_TYPE, content: metaType };

    this.meta.updateTag(ogType);
  }

  setMetaCard(metaCard: string): void {
    const twitterCard: MetaDefinition = { name: NGX_SEO_META_KEYS.TWITTER_CARD, content: metaCard };

    this.meta.updateTag(twitterCard);
  }

  setMetaImage(metaImage: string): void {
    const ogImage: MetaDefinition = { property: NGX_SEO_META_KEYS.OG_IMAGE, content: metaImage };
    const twitterImage: MetaDefinition = { name: NGX_SEO_META_KEYS.TWITTER_IMAGE, content: metaImage };
    const googleImage: MetaDefinition = { itemprop: NGX_SEO_META_KEYS.IMAGE, content: metaImage };

    this.meta.removeTag('itemprop="image"'); // Because if we not remove the tag it will not be updated.

    this.meta.updateTag(ogImage);
    this.meta.updateTag(twitterImage);
    this.meta.updateTag(googleImage);
  }

  setMetaUrl(metaUrl: string): void {
    const ogUrl: MetaDefinition = { property: NGX_SEO_META_KEYS.OG_URL, content: metaUrl };
    const twitterUrl: MetaDefinition = { name: NGX_SEO_META_KEYS.TWITTER_URL, content: metaUrl };

    this.meta.updateTag(ogUrl);
    this.meta.updateTag(twitterUrl);
  }

  setMetaAuthor(metaAuthor: string): void {
    const author: MetaDefinition = { name: NGX_SEO_META_KEYS.AUTHOR, content: metaAuthor };

    this.meta.updateTag(author);
  }

  setMetaSiteName(metaSiteName: string) {
    const siteName: MetaDefinition = { name: NGX_SEO_META_KEYS.OG_SITE_NAME, content: metaSiteName };

    this.meta.updateTag(siteName);
  }

  /**
   * Will remove all meta tags from HTML document.
   */
  removeMeta(): void {
    Object.values(NGX_SEO_META_KEYS)
      .forEach(value => {
        this.meta.removeTag(`name="${value}"`);
        this.meta.removeTag(`itemprop="${value}"`);
        this.meta.removeTag(`property="${value}"`);
      });
  }
}
