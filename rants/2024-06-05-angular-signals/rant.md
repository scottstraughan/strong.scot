---
date: '2024-06-05T01:00:00'
title: 'Angular 16+ Signals'
description: 'Dumping some of my thoughts on Angular Signals.'
thumbnail: /static/images/rants/2024-06-05-angular-signals/thumbnail.webp
icon: /static/images/rants/2024-06-05-angular-signals/icon.webp
tags: [angular, signals, frontend, thoughts]
---


Angular has long relied on RxJS and its `Observable`-based model for handling reactivity. But with
the introduction of **Signals** in Angular 16+, the framework is embracing a new paradigm that
simplifies reactive state management.

## What Are Signals?

At their core, **Signals** are reactive primitives that allow components to respond to changes in
state **without manual subscriptions**. Think of them like `BehaviorSubject`, but without the
boilerplate.

```ts
import { signal } from '@angular/core';

const counter = signal(0);

// Updating
counter.set(counter() + 1);

// Reading
console.log(counter()); // Logs the current value
```

## Why Use Signals?

- Fine-grained reactivity — Updates are triggered at the level of the specific signal, reducing
  unnecessary renders.
- Simplified change detection — Signals are tightly integrated into Angular’s zone-less future.
- Lightweight and intuitive — Much easier to reason about than complex RxJS chains for most state
  scenarios.

## Signals vs Observables

| Feature               | Signals     | Observables |
|-----------------------|-------------|-------------|
| Lazy by default       | Yes         | No          |
| Requires subscription | No          | Yes         |
| Emits multiple values | Yes         | Yes         |
| Angular integration   | First-class | First-class |

## Should You Switch?

If you're building **new Angular apps** or maintaining internal component state, **Signals** are a
great option. However, RxJS still shines in handling **streams of events**, **HTTP**, and **complex
orchestration**.


## A Few Usage Examples

Converting a regular subscription to use signals:

**Regular RxJS Code:**

```ts
news: News[] = [];
newsSubcription = any;

constructor(
  newsServices: NewsService
) {
   this.newsSubscription = this.newsServices.getNews()
    .pipe(
      tap(news => this.news = news)
    )
    .subscribe()
}

ngOnDestroy() {
  this.newsSubscription?.unsubscribe();
}
```

**Using Signals:**

```ts
news: Signal<News[]> = signal([]);

constructor(
  newsServices: NewsService
) {
   this.news = toSignal(newsServices.getNews(), { initialValue: [] });
}
```

Please note that you do not need to unsubscribe from the getNews() observable. Angular handles
this all for you.

You can also perform all your normal tinkering with the observable response such as:

```ts
news: Signal<News[]> = signal([]);

constructor(
  newsServices: NewsService
) {
   this.news = toSignal(
    newsServices.getNews()
      .pipe(
        map(news => news.filter((newsItem) => {
          return newsItem.date > currentDateTime ? newsItem : null;
        })),
      ),
    { initialValue: [] });
}
```

## Final Thoughts

Signals mark a huge shift in how Angular handles state and reactivity. They’re not meant to replace
RxJS entirely—but they offer a simpler and more ergonomic tool for common use cases. It’s worth
giving them a try in your next project!
