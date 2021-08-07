import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import { NGX_SEO_META_KEYS } from './ngx-seo-meta-keys';
import { NGX_SEO_TITLE_KEYS } from './ngx-seo-title-keys';
import { NgxSeoModule } from '../ngx-seo.module';
import { NgxSeoService } from './ngx-seo.service';

describe('NgxSeoService', () => {
  let title: Title;
  let meta: Meta;
  let service: NgxSeoService;
  let getMetaTagContent: (selector: string, key: string) => string | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), NgxSeoModule.forRoot()],
    });
    title = TestBed.inject(Title);
    meta = TestBed.inject(Meta);
    service = TestBed.inject(NgxSeoService);
    service.removeMeta();
    getMetaTagContent = getMetaTagContentCreator(meta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service).toBeInstanceOf(NgxSeoService);
  });

  it('should be set title correctly', () => {
    expect(title.getTitle()).toBe('');
    expect(getMetaTagContent('property', NGX_SEO_TITLE_KEYS.OG_TITLE))
      .toBeUndefined();
    expect(getMetaTagContent('name', NGX_SEO_TITLE_KEYS.TWITTER_TITLE))
      .toBeUndefined();
    expect(getMetaTagContent('itemprop', NGX_SEO_TITLE_KEYS.NAME))
      .toBeUndefined();
    const titleValue = 'some title';
    service.setTitle(titleValue);
    expect(title.getTitle()).toBe(titleValue);
    expect(getMetaTagContent('property', NGX_SEO_TITLE_KEYS.OG_TITLE))
      .toBe(titleValue);
    expect(getMetaTagContent('name', NGX_SEO_TITLE_KEYS.TWITTER_TITLE))
      .toBe(titleValue);
    expect(getMetaTagContent('itemprop', NGX_SEO_TITLE_KEYS.NAME))
      .toBe(titleValue);
  });

  it('should be set meta keywords correctly', () => {
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.KEYWORDS))
      .toBeUndefined();
    const keywordsValue = 'programming, testing';
    service.setMetaKeywords(keywordsValue);
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.KEYWORDS))
      .toBe(keywordsValue);
  });

  it('should be set meta description correctly', () => {
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.DESCRIPTION))
      .toBeUndefined();
    expect(getMetaTagContent('property', NGX_SEO_META_KEYS.OG_DESCRIPTION))
      .toBeUndefined();
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.TWITTER_DESCRIPTION))
      .toBeUndefined();
    expect(getMetaTagContent('itemprop', NGX_SEO_META_KEYS.DESCRIPTION))
      .toBeUndefined();
    const descriptionValue = 'My description value :P';
    service.setMetaDescription(descriptionValue);
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.DESCRIPTION))
      .toBe(descriptionValue);
    expect(getMetaTagContent('property', NGX_SEO_META_KEYS.OG_DESCRIPTION))
      .toBe(descriptionValue);
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.TWITTER_DESCRIPTION))
      .toBe(descriptionValue);
    expect(getMetaTagContent('itemprop', NGX_SEO_META_KEYS.DESCRIPTION))
      .toBe(descriptionValue);
  });

  it('should be set meta type correctly', () => {
    expect(getMetaTagContent('property', NGX_SEO_META_KEYS.OG_TYPE))
      .toBeUndefined();
    const typeValue = 'something nice';
    service.setMetaType(typeValue);
    expect(getMetaTagContent('property', NGX_SEO_META_KEYS.OG_TYPE))
      .toBe(typeValue);
  });

  it('should be set meta card correctly', () => {
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.TWITTER_CARD))
      .toBeUndefined();
    const cardValue = 'card';
    service.setMetaCard(cardValue);
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.TWITTER_CARD))
      .toBe(cardValue);
  });

  it('should be set meta image correctly', () => {
    expect(getMetaTagContent('property', NGX_SEO_META_KEYS.OG_IMAGE))
      .toBeUndefined();
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.TWITTER_IMAGE))
      .toBeUndefined();
    expect(getMetaTagContent('itemprop', NGX_SEO_META_KEYS.IMAGE))
      .toBeUndefined();
    const imageValue = 'src image...';
    service.setMetaImage(imageValue);
    expect(getMetaTagContent('property', NGX_SEO_META_KEYS.OG_IMAGE))
      .toBe(imageValue);
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.TWITTER_IMAGE))
      .toBe(imageValue);
    expect(getMetaTagContent('itemprop', NGX_SEO_META_KEYS.IMAGE))
      .toBe(imageValue);
  });

  it('should be set meta url correctly', () => {
    expect(getMetaTagContent('property', NGX_SEO_META_KEYS.OG_URL))
      .toBeUndefined();
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.TWITTER_URL))
      .toBeUndefined();
    const urlValue = 'https://www.google.com';
    service.setMetaUrl(urlValue);
    expect(getMetaTagContent('property', NGX_SEO_META_KEYS.OG_URL))
      .toBe(urlValue);
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.TWITTER_URL))
      .toBe(urlValue);
  });

  it('should be set meta author correctly', () => {
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.AUTHOR)).toBeUndefined();
    const authorValue = 'Aviv Haruzi';
    service.setMetaAuthor(authorValue);
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.AUTHOR))
      .toBe(authorValue);
  });

  it('should be set meta site correctly', () => {
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.OG_SITE_NAME))
      .toBeUndefined();
    const siteValue = 'Aviv Haruzi Site';
    service.setMetaSiteName(siteValue);
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.OG_SITE_NAME))
      .toBe(siteValue);
  });

  it('should be set meta canonical correctly', () => {
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.CANONICAL))
      .toBeUndefined();
    const canonicalValue = 'canonical example';
    service.setMetaCanonical(canonicalValue);
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.CANONICAL))
      .toBe(canonicalValue);
  });

  it('should remove all meta tags', () => {
    expect(getMetaTagContent('property', NGX_SEO_META_KEYS.OG_DESCRIPTION))
      .toBeUndefined();
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.TWITTER_DESCRIPTION))
      .toBeUndefined();
    expect(getMetaTagContent('itemprop', NGX_SEO_META_KEYS.DESCRIPTION))
      .toBeUndefined();
    const removeAllMetaTagsValue = 'remove all meta test';
    service.setMetaDescription(removeAllMetaTagsValue);
    expect(getMetaTagContent('property', NGX_SEO_META_KEYS.OG_DESCRIPTION))
      .toBe(removeAllMetaTagsValue);
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.TWITTER_DESCRIPTION))
      .toBe(removeAllMetaTagsValue);
    expect(getMetaTagContent('itemprop', NGX_SEO_META_KEYS.DESCRIPTION))
      .toBe(removeAllMetaTagsValue);
    service.removeMeta();
    expect(getMetaTagContent('property', NGX_SEO_META_KEYS.OG_DESCRIPTION))
      .toBeUndefined();
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.TWITTER_DESCRIPTION))
      .toBeUndefined();
    expect(getMetaTagContent('itemprop', NGX_SEO_META_KEYS.DESCRIPTION))
      .toBeUndefined();
  });
});

const getMetaTagContentCreator = (meta: Meta) => {
  return (selector: string, key: string): string | undefined => {
    return meta.getTag(`${selector}="${key}"`)?.content;
  };
};
