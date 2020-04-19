# ngx-seo

Update SEO title and meta tags easily in Angular apps.

I created this library because other libraries are not fit enough to my requirements.

![npm](https://img.shields.io/npm/v/@avivharuzi/ngx-seo) ![NPM](https://img.shields.io/npm/l/@avivharuzi/ngx-seo) ![npm bundle size](https://img.shields.io/bundlephobia/min/@avivharuzi/ngx-seo)

## Environment Support

- Angular 6+
- Server-side Rendering

## Installation

```sh
npm i @avivharuzi/ngx-seo
```

OR

```sh
yarn install @avivharuzi/ngx-seo
```

## Usage

### Import NgxSeoModule

Import `NgxSeoModule` into `AppModule` imports.

```ts
import { NgxSeoModule } from '@avivharuzi/ngx-seo';

imports: [
  // ...
  NgxSeoModule.forRoot(),
],
```

### Update Title and Meta Tags from Routes Data 

Declare SEO data for each route recommended to use `NgxSeo` interface to prevent problems.

```ts
...
import { NgxSeo } from '@avivharuzi/ngx-seo';

...

const SEO_HOME: NgxSeo = {
  title: 'home page',
  meta: {
    description: 'home page description',
  },
};

const SEO_ABOUT: NgxSeo = {
  title: 'about page',
  meta: {
    description: 'about page description',
  },
};

const routes: Routes = [
  { path: '', component: HomeComponent, data: { seo: SEO_HOME } },
  { path: 'about', component: AboutComponent, data: { seo: SEO_ABOUT } },
];
```

Now in order update the title and meta tags we need to **subscribe** in our `app.component`.

```ts
import { Component, OnInit } from '@angular/core';

import { NgxSeoService } from '@avivharuzi/ngx-seo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private ngxSeoService: NgxSeoService) {}

  ngOnInit() {
    this.ngxSeoService.subscribe();
  }
}
```

### Update Title and Meta Tags Dynamically

You can also to use the service `NgxSeoService` to dynamically update title or meta tags.

```ts
...
export class MoiveDetailComponent implements OnInit {
  movie: Movie;

  constructor(
    private movieService: MovieService,
    private ngxSeoService: NgxSeoService,
  ) {}

  ngOnInit(): void {
    this.movieService.getDetails(1).subscribe(movie => {
      this.movie = movie;
    
      this.ngxSeoService.setSeo({
        title: movie.title,
        meta: {
          description: movie.description,
        },
      });
    });
  }
}
```

## API

### NgxSeoModule

#### NgxSeoModule.forRoot(config: NgxSeoConfig)

```ts
...
NgxSeoModule.forRoot({
  titleSuffixBefore: '',
  titleSuffixAfter: '',
  preserve: false,
})
...
```

### NgxSeoService

#### NgxSeoService.subscribe(): void

Will listen to router changes and if seo key exist in router data try to add it to HTML document tags.

#### NgxSeoService.setSeo(seo: NgxSeo): void

Update SEO title and meta tags.

#### NgxSeoService.setTitle(title: string): void

Update SEO title.

#### NgxSeoService.setMeta(meta: NgxSeoMeta): void

Update SEO meta tags.

#### NgxSeoService.setMetaKeywords(metaKeywords: string | string[]): void

Update meta tag keywords.

#### NgxSeoService.setMetaDescription(metaDescription: string): void

Update meta tag description.

#### NgxSeoService.setMetaType(metaType: string): void

Update meta tag type.

#### NgxSeoService.setMetaCard(metaCard: string): void

Update meta tag card.

#### NgxSeoService.setMetaImage(metaImage: string): void

Update meta tag image.

#### NgxSeoService.setMetaUrl(metaUrl: string): void

Update meta tag url.

#### NgxSeoService.setMetaAuthor(metaAuthor: string): void

Update meta tag author.

#### NgxSeoService.setMetaSiteName(metaSiteName: string): void

Update meta tag site name.

#### NgxSeoService.setMetaCanonical(metaCanonical: string): void

Update meta tag canonical.

#### NgxSeoService.removeMeta(): void

Will remove all meta tags from HTML document.

# License

[MIT](LICENSE)
