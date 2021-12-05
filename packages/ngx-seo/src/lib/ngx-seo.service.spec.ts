import { Meta, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { NGX_SEO_META_KEYS } from './ngx-seo-meta-keys';
import { NGX_SEO_TITLE_KEYS } from './ngx-seo-title-keys';
import { NgxSeoModule } from './ngx-seo.module';
import { NgxSeoService } from './ngx-seo.service';

describe('NgxSeoService', () => {
  let title: Title;
  let meta: Meta;
  let service: NgxSeoService;
  let getMetaTagContent: (selector: string, key: string) => string | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgxSeoModule.forRoot()],
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
    expect(
      getMetaTagContent('property', NGX_SEO_TITLE_KEYS.ogTitle)
    ).toBeUndefined();
    expect(
      getMetaTagContent('name', NGX_SEO_TITLE_KEYS.twitterTitle)
    ).toBeUndefined();
    expect(
      getMetaTagContent('itemprop', NGX_SEO_TITLE_KEYS.name)
    ).toBeUndefined();
    const titleValue = 'some title';
    service.setTitle(titleValue);
    expect(title.getTitle()).toBe(titleValue);
    expect(getMetaTagContent('property', NGX_SEO_TITLE_KEYS.ogTitle)).toBe(
      titleValue
    );
    expect(getMetaTagContent('name', NGX_SEO_TITLE_KEYS.twitterTitle)).toBe(
      titleValue
    );
    expect(getMetaTagContent('itemprop', NGX_SEO_TITLE_KEYS.name)).toBe(
      titleValue
    );
  });

  it('should be set meta keywords correctly', () => {
    expect(
      getMetaTagContent('name', NGX_SEO_META_KEYS.keywords)
    ).toBeUndefined();
    const keywordsValue = 'programming, testing';
    service.setMetaKeywords(keywordsValue);
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.keywords)).toBe(
      keywordsValue
    );
  });

  it('should be set meta description correctly', () => {
    expect(
      getMetaTagContent('name', NGX_SEO_META_KEYS.description)
    ).toBeUndefined();
    expect(
      getMetaTagContent('property', NGX_SEO_META_KEYS.ogDescription)
    ).toBeUndefined();
    expect(
      getMetaTagContent('name', NGX_SEO_META_KEYS.twitterDescription)
    ).toBeUndefined();
    expect(
      getMetaTagContent('itemprop', NGX_SEO_META_KEYS.description)
    ).toBeUndefined();
    const descriptionValue = 'My description value :P';
    service.setMetaDescription(descriptionValue);
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.description)).toBe(
      descriptionValue
    );
    expect(getMetaTagContent('property', NGX_SEO_META_KEYS.ogDescription)).toBe(
      descriptionValue
    );
    expect(
      getMetaTagContent('name', NGX_SEO_META_KEYS.twitterDescription)
    ).toBe(descriptionValue);
    expect(getMetaTagContent('itemprop', NGX_SEO_META_KEYS.description)).toBe(
      descriptionValue
    );
  });

  it('should be set meta type correctly', () => {
    expect(
      getMetaTagContent('property', NGX_SEO_META_KEYS.ogType)
    ).toBeUndefined();
    const typeValue = 'something nice';
    service.setMetaType(typeValue);
    expect(getMetaTagContent('property', NGX_SEO_META_KEYS.ogType)).toBe(
      typeValue
    );
  });

  it('should be set meta card correctly', () => {
    expect(
      getMetaTagContent('name', NGX_SEO_META_KEYS.twitterCard)
    ).toBeUndefined();
    const cardValue = 'card';
    service.setMetaCard(cardValue);
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.twitterCard)).toBe(
      cardValue
    );
  });

  it('should be set meta image correctly', () => {
    expect(
      getMetaTagContent('property', NGX_SEO_META_KEYS.ogImage)
    ).toBeUndefined();
    expect(
      getMetaTagContent('name', NGX_SEO_META_KEYS.twitterImage)
    ).toBeUndefined();
    expect(
      getMetaTagContent('itemprop', NGX_SEO_META_KEYS.image)
    ).toBeUndefined();
    const imageValue = 'src image...';
    service.setMetaImage(imageValue);
    expect(getMetaTagContent('property', NGX_SEO_META_KEYS.ogImage)).toBe(
      imageValue
    );
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.twitterImage)).toBe(
      imageValue
    );
    expect(getMetaTagContent('itemprop', NGX_SEO_META_KEYS.image)).toBe(
      imageValue
    );
  });

  it('should be set meta url correctly', () => {
    expect(
      getMetaTagContent('property', NGX_SEO_META_KEYS.ogURL)
    ).toBeUndefined();
    expect(
      getMetaTagContent('name', NGX_SEO_META_KEYS.twitterURL)
    ).toBeUndefined();
    const urlValue = 'https://www.google.com';
    service.setMetaUrl(urlValue);
    expect(getMetaTagContent('property', NGX_SEO_META_KEYS.ogURL)).toBe(
      urlValue
    );
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.twitterURL)).toBe(
      urlValue
    );
  });

  it('should be set meta author correctly', () => {
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.author)).toBeUndefined();
    const authorValue = 'Aviv Haruzi';
    service.setMetaAuthor(authorValue);
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.author)).toBe(
      authorValue
    );
  });

  it('should be set meta site correctly', () => {
    expect(
      getMetaTagContent('name', NGX_SEO_META_KEYS.ogSiteName)
    ).toBeUndefined();
    const siteValue = 'Aviv Haruzi Site';
    service.setMetaSiteName(siteValue);
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.ogSiteName)).toBe(
      siteValue
    );
  });

  it('should be set meta canonical correctly', () => {
    expect(
      getMetaTagContent('name', NGX_SEO_META_KEYS.canonical)
    ).toBeUndefined();
    const canonicalValue = 'canonical example';
    service.setMetaCanonical(canonicalValue);
    expect(getMetaTagContent('name', NGX_SEO_META_KEYS.canonical)).toBe(
      canonicalValue
    );
  });

  it('should create custom meta tags', () => {
    const customTag1 = 'myCustomTag1';
    const customTag2 = 'myCustomTag2';
    const customTag1Content = 'myCustomTag1 content!';
    const customTag2Content = 'myCustomTag2 content!';
    expect(getMetaTagContent('name', customTag1)).toBeUndefined();
    expect(getMetaTagContent('name', customTag2)).toBeUndefined();
    service.setMetaCustomTags([
      { name: customTag1, content: customTag1Content },
      { name: customTag2, content: customTag2Content },
    ]);
    expect(getMetaTagContent('name', customTag1)).toBe(customTag1Content);
    expect(getMetaTagContent('name', customTag2)).toBe(customTag2Content);
  });

  it('should remove all meta tags', () => {
    expect(
      getMetaTagContent('property', NGX_SEO_META_KEYS.ogDescription)
    ).toBeUndefined();
    expect(
      getMetaTagContent('name', NGX_SEO_META_KEYS.twitterDescription)
    ).toBeUndefined();
    expect(
      getMetaTagContent('itemprop', NGX_SEO_META_KEYS.description)
    ).toBeUndefined();
    const removeAllMetaTagsValue = 'remove all meta test';
    service.setMetaDescription(removeAllMetaTagsValue);
    expect(getMetaTagContent('property', NGX_SEO_META_KEYS.ogDescription)).toBe(
      removeAllMetaTagsValue
    );
    expect(
      getMetaTagContent('name', NGX_SEO_META_KEYS.twitterDescription)
    ).toBe(removeAllMetaTagsValue);
    expect(getMetaTagContent('itemprop', NGX_SEO_META_KEYS.description)).toBe(
      removeAllMetaTagsValue
    );
    service.removeMeta();
    expect(
      getMetaTagContent('property', NGX_SEO_META_KEYS.ogDescription)
    ).toBeUndefined();
    expect(
      getMetaTagContent('name', NGX_SEO_META_KEYS.twitterDescription)
    ).toBeUndefined();
    expect(
      getMetaTagContent('itemprop', NGX_SEO_META_KEYS.description)
    ).toBeUndefined();
  });
});

const getMetaTagContentCreator = (meta: Meta) => {
  return (selector: string, key: string): string | undefined => {
    return meta.getTag(`${selector}="${key}"`)?.content;
  };
};
