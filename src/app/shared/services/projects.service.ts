import { Injectable } from '@angular/core';
import { Graphic, ProjectGraphicType } from '../ui-components/image-collection/image-collection.component';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projects: Project[] = [
    {
      tag: 'saorsail',
      name: 'Saorsail',
      description: 'Saorsail is a modern app that lets you browse, download, and install apps from the F-Droid repository with ease. Available as both a web app and an Android app, it offers a consistent and intuitive experience across platforms. Built with Angular and written in TypeScript, Saorsail features a sleek, responsive UI designed for smooth navigation and performance. Users can explore the full F-Droid database, view app details, and install or download APKs directly to their devices—all without leaving the app. With its focus on simplicity, privacy, and open-source access, Saorsail is a streamlined gateway to the F-Droid ecosystem.',
      graphics: [
        {
          url: './images/projects/saorsail/categories.webp',
          title: 'Categories View',
          type: ProjectGraphicType.IMAGE
        },
        {
          url: './images/projects/saorsail/settings.webp',
          title: 'Settings Popup',
          type: ProjectGraphicType.IMAGE
        },
        {
          url: './images/projects/saorsail/pair.webp',
          title: 'Pair with Android Assistant',
          type: ProjectGraphicType.IMAGE
        }
      ],
      tags: ['TypeScript', 'Angular', 'Signals', 'Android', 'Java', 'Zuplo', 'API'],
      urls: [
        { name: 'GitHub', href: 'https://github.com/scottstraughan/saorsail-web'},
        { name: 'saorsail.com', href: 'https://www.saorsail.com'}
      ]
    },
    {
      tag: 'scoredash.xyz',
      name: 'Scoredash.xyz',
      description: 'Scoredash.xyz is a modern web app that lets you assess how well a GitHub or GitLab user or organization follows open-source best practices. Built as a full Progressive Web App (PWA), it features local caching, a fast and responsive interface, and support for both dark and light modes. With Scoredash, you can explore multiple repositories, view detailed adherence scores, and get actionable recommendations on how to improve each project’s open-source quality. Its clean, modern UI makes it easy to navigate and compare projects, making Scoredash an essential tool for developers, contributors, and maintainers aiming to elevate their open-source standards.',
      graphics: [
        {
          url: './images/projects/scoredash.xyz/dark-mode.webp',
          title: 'Dark Mode',
          type: ProjectGraphicType.IMAGE
        },
        {
          url: './images/projects/scoredash.xyz/explore.webp',
          title: 'Explore',
          type: ProjectGraphicType.IMAGE
        },
        {
          url: './images/projects/scoredash.xyz/add.webp',
          title: 'Add a new org',
          type: ProjectGraphicType.IMAGE
        }
      ],
      tags: ['asdasd'],
      urls: [
        { name: 'GitHub', href: 'https://github.com/scottstraughan/openssf-scorecard-dashboard'},
        { name: 'saorsail.com', href: 'https://www.scoredash.xyz'}
      ]
    },
    {
      tag: 'sycl.tech',
      name: 'SYCL.tech',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris posuere consectetur ex, ac ' +
        'convallis orci. Nulla molestie lectus eu ante finibus finibus vitae eget elit. Duis et tellus felis. ' +
        'Donec fermentum consectetur erat sed semper. Aliquam suscipit condimentum odio vel pellentesque. Fusce ' +
        'rhoncus tellus eget nibh laoreet scelerisque. Donec ac quam magna. Donec consectetur auctor augue, ' +
        'quis dignissim justo aliquam eu. Fusce interdum, sapien ut dignissim congue, lacus lorem pharetra ante, ' +
        'et condimentum orci leo vitae orci. Aenean et ligula et ante faucibus venenatis et quis nisi. Proin vel ' +
        'sollicitudin nunc. Quisque bibendum velit quis quam euismod tristique.',
      graphics: [
        {
          url: './images/projects/sycl.tech/home.webp',
          title: 'Home',
          type: ProjectGraphicType.IMAGE
        },
        {
          url: './images/projects/sycl.tech/calendar.webp',
          title: 'Calendar',
          type: ProjectGraphicType.IMAGE
        },
        {
          url: './images/projects/sycl.tech/dark-mode.webp',
          title: 'Dark Mode',
          type: ProjectGraphicType.IMAGE
        },
        {
          url: './images/projects/sycl.tech/playground.webp',
          title: 'Playground',
          type: ProjectGraphicType.IMAGE
        },
        {
          url: './images/projects/sycl.tech/projects.webp',
          title: 'Projects',
          type: ProjectGraphicType.IMAGE
        }
      ],
      tags: ['sycl', 'angular', 'python', 'feed-generation', 'learn', 'playground'],
      urls: [
        { name: 'GitHub', href: 'https://github.com/scottstraughan/sycl.tech-website'},
        { name: 'sycl.tech', href: 'https://www.sycl.tech'}
      ]
    },
    {
      tag: 'uradio',
      name: 'uRadio',
      description: 'uRadio is a lightweight and unobtrusive desktop app for macOS that makes it easy to listen to public radio stations from around the world. Designed with simplicity in mind, uRadio runs quietly in the background, offering quick access to your favorite stations without cluttering your workspace. Written in Swift for optimal performance and native integration, the app is fast, responsive, and feels right at home on macOS. Whether you’re working, relaxing, or just want background audio, uRadio provides a seamless listening experience with minimal system impact. Best of all, it’s completely free to download, making quality public radio just a click away.',
      graphics: [
        {
          url: './images/projects/uradio/preview.mp4',
          title: 'Swift App',
          type: ProjectGraphicType.VIDEO
        },
        {
          url: './images/projects/uradio/screenshot.webp',
          title: 'Swift App',
          type: ProjectGraphicType.IMAGE
        }
      ],
      tags: ['Swift', 'MacOS', 'Apple', 'Radio', 'API']
    },
    {
      tag: 'hive-tizen',
      name: 'Hive Wearable',
      description: 'Hive Wearable was a smart and intuitive app designed specifically for Tizen-based smartwatches, such as the Samsung Gear S3 Frontier, bringing quick and convenient control of your Hive home thermostat right to your wrist. With a clean, watch-optimized interface, the app allowed users to set target temperatures, activate boost mode, and view the current room temperature in real time. Designed to complement the Hive ecosystem, Hive Wearable made it easy to adjust your home’s heating without reaching for your phone or speaking to a voice assistant. It offered a smooth, reliable experience tailored to the capabilities of Tizen wearables, giving users precise control of their home climate directly from their smartwatch.',
      graphics: [
        {
          url: './images/projects/hive/hive.mp4',
          title: 'Usage',
          type: ProjectGraphicType.VIDEO
        },
        {
          url: './images/projects/hive/screenshot.webp',
          title: 'Companion',
          type: ProjectGraphicType.IMAGE
        }
      ],
      tags: ['Tizen', 'Wearable', 'Vector', 'API']
    },
    {
      tag: 'sms2pc',
      name: 'SMS2PC',
      description: 'SMS2PC was one of the first Android apps to let users send text messages directly from their computer, bridging the gap between mobile and desktop communication. Paired with a Java-based desktop companion app built using Swing, SMS2PC supported Windows, macOS, and Linux, offering a customizable and consistent experience across platforms. The Android app synced your address book, displayed message history, and enabled sending SMS via Wi-Fi, Bluetooth, or even mobile data. At a time when few alternatives existed, SMS2PC stood out for its versatility, multi-platform support, and seamless integration between devices, making it a pioneer in desktop-mobile messaging solutions.',
      graphics: [
        {
          url: './images/projects/sms2pc/companion.webp',
          title: 'Companion',
          type: ProjectGraphicType.IMAGE
        },
        {
          url: './images/projects/sms2pc/usage.webp',
          title: 'Usage',
          type: ProjectGraphicType.IMAGE
        },
        {
          url: './images/projects/sms2pc/blah.webp',
          title: 'Screenshot',
          type: ProjectGraphicType.IMAGE
        },
      ],
      tags: ['Java/Swing', 'Android', 'Sockets', 'Synchronization']
    },
    {
      tag: 'androsync',
      name: 'AndroSync',
      description: 'AndroSync was one of the first Android apps of its kind, designed to seamlessly synchronize photos, music, videos, and documents between your phone and computer. With support for Wi-Fi transfers, it offered a fast and cable-free way to keep your media in sync. A standout feature at the time was its integration with Apple Music, allowing users to sync playlists and music libraries effortlessly—something rarely seen on Android back then. The app featured a clean, user-friendly interface complete with progress bars and system notifications, making the syncing process transparent and easy to manage. As an early Android release, AndroSync helped set the standard for cross-device media management in the mobile era.',
      graphics: [
        {
          url: './images/projects/androsync/desktop.webp',
          title: 'Companion',
          type: ProjectGraphicType.IMAGE
        },
      ],
      tags: ['Java', 'Android', 'Sockets', 'Synchronization', 'Music', 'Videos', 'Documents']
    },
  ];

  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  getBestInitialGraphicForProject(
    project: Project
  ): Graphic | undefined {
    for (const graphic of project.graphics) {
      if (graphic.type == ProjectGraphicType.VIDEO)
        continue;

      return graphic;
    }

    return undefined;
  }
}

export interface Project {
  tag: string
  name: string
  description: string
  graphics: Graphic[]
  tags: string[]
  urls?: ProjectUrl[]
}

export interface ProjectUrl {
  name: string
  href: string
}