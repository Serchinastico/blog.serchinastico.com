+++
title = 'The 20-hour app'
description = "How I rewrote my first React Native app in 20 hours"
summary = "In this writeup I skim over the process to rewrite an existing app using React Native and modern tooling."
resources = ["assets/four days.png"]
keywords = ["App development", "Prototyping"]
date = 2024-10-21T14:09:00+02:00
draft = true
+++

# The context

I recently [wrote about building and publishing an app in 40 hours](https://blog.serchinastico.com/posts/40-hour-app/). In that post, I introduced the concept of [playful programming](https://news.ycombinator.com/item?id=38828766), a new mindset I've recently embraced to rediscover the joy in coding. My latest app, Trufario [!include links], represents the culmination of countless hours of study and work on React Native. This has brought a lot of memories from when I peeked into this technology that promised to develop for both platforms with a single codebase. 

Back in 2018, I was working at Karumi, a small studio specializing in mobile app development. As part of the team, I juggled between platforms, writing Java/Kotlin for Android and Obj-C/Swift for iOS. You can imagine the mental gymnastics and the many hours I spent switching gears, fighting to understand the differences between interfaces and protocols, the most idiomatic way to implement dependency injection in each platform and the irks of different rendering systems. React Native promised an escape from this complexity: one ecosystem for both platforms (and hopefully, a farewell to XCode, which still gives me nightmares).

During this time, my then-girlfriend (now wife) was dealing with food intolerances. Her doctor recommended a rotation diet - a simple concept of avoiding repeated ingredients in consecutive meals. To help her manage this challenge, I decided to create an app that would track ingredients and suggest alternatives she hadn't eaten recently. This became my perfect opportunity to dive into React Native, and within a month, the app was live in both stores.

# The original app

I remember struggling with the tiniest things like properly creating reusable components, preventing re-renders, managing global state, etc. I learned so much from that single project: 
- To use [Sketch](https://www.sketch.com/) for the designs. Ironically, I later joined their team.
- Modern Javascript ecosystem. It wasn't the first time I used it, but it had been a long ago since I did and I had to update myself with the latest ECMAScript features, bundlers, etc. I missed static types so much I switched to Typescript soon after.
- [React](https://react.dev/) and [React Native](https://reactnative.dev/) to develop the apps, the many differences with the native components and its abstractions. To this day I don't understand how there is no official `Button` component.
- The stores, filling out all the details for a new release, the exam-like review processes.

For an outside viewer, the app was a flop: it had performance issues here and there, limited customization options and a $2.99 price tag on the App Store that didn't reflect its value. To me, though? It was a triumph! I was immensely proud of the achievement: I had single-handedly built a cross-platform app from the ground up (designs, implementation and publication), I did it for two platforms at the same time with little overhead and I found enough people paying for the app to justify the App Store subscription fee ($99/year).

# Homage

For years, I left it there, paying for the subscription. In that time, Despite my growing expertise in React Native, TypeScript, and modern development practices, I couldn't seem to update Four Days. My Git history is littered with abandoned branches `fourdays-ts`, `fourdays-ts2`, `fourdays-rn70`, none of them saw the light of production.

Late in 2023, both app stores **understandably** requested me updates to support newer OS versions and devices. Unfortunately, I missed the notifications and the app was eventually removed from both platforms. While this might sound strange to you, reader, deep inside me I felt I owned something to the project that brought me into this career path. So, after finishing Trufario, I decided to apply everything I learned to rewrite Four Days.

# The rewrite

Before coding the rewrite I decided to define a clear scope of the project, that included following these rules:

- **No new designs** - I decided not to re-visit any of the usability and design choices I made in the past. After all, and surprisingly, there is still a small group of people using it and I didn't want to ruin their experience.
- **Feature parity** - The rewrite will not add nor remove any feature of the original app. It will be an updated copy.
- **Backward compatibility** - I would make sure the data stored in previous versions of the app would work with the update.

In total, the rewrite took just 20 hours (discounting for store approval and testing times) from creating the repository to having the app published in the stores. The feat was only possible because:
- **No switching hats** - Even though I lost the original Sketch designs, I was able to compile the original app and have it in my hands to use it as a reference. That meant there was no context switching to design/product roles, I didn't have to rethink how any of the features worked or what color palette and iconography I wanted to use.
- **Trufario experience** - I was able to dodge many of the rabbit holes I had in Trufario. Why running another lengthy investigation on the most ergonomic global state library? (if you are curious, for me, for now, it's [jotai](https://jotai.org/)). Why spending time on fixing safe area disparities between platforms? Trufario gave me the confidence and the solution to many of the day-to-day problems of developing on React Native.
- **The tooling** - I started (and continue) building a set of tools that'd help me build quick prototypes. This one deserves its own section so keep reading.

# The tooling

After Trufario, I realized how much I enjoyed working on one very specific problem and wondered why it had to be a one-shot. I started envisioning a way to focus on the problem at stake and less on the surroundings (processes, languages, frameworks, libraries, etc). Don't get me wrong, I love solving technical problems but I personally feel like I often fall too often into the technical side of things and tend to forget the true purpose of my deep dives. Following the essence of playful programming (and by that I mean solving my own problems) I wrote up a list of tasks and processes I could tackle:

- **UI library** - React Native doesn't offer a complete set of components for your app. There are plenty of options out there but wanted something I could break and extend for my own apps. It uses [Tailwind CSS](https://tailwindcss.com/) under the hood and provides a set of reusable themed components that is growing each day. [!video of the components app]
- **Utilities** - I find myself rewriting the same snippets of code for the most trivial things. From object and array utility functions (`groupBy`, `repeat`, `zip`, `chunkify`, etc) to generating random ids, mathematical usual suspects (e.g. `clamp`, `inRange`) and more.
- **Project assistant** - Creating new React Native projects involve all the usual scaffolding: linting, git hooks, npm scripts, Expo integration, code architecture. This is all solvable with a project template but I needed something else, something that could be augmented. What if I later realize I need deep links in the app, or if I want to include in-app purchases, translations or camera permissions. The assistant fills these gaps, it's a CLI tool that helps me progressively add features to my React Native projects.
- **Meta-programming** - While working with Typescript, I found myself in some situations where macros or code-generation tools would have solved the issue at hand more effectively: grouping exports in index files, defining routes, or typing assets, to name a few. These problems involve some sort of repetition that I loathe. After some experimentation I discovered [ts-morph](https://ts-morph.com/) and felt so natural. I haven't started this project yet but I imagine having a set of scripts/plugins that work with ts-morph and generate Typescript code based on decorators/comments.
- **Testing** - Trufario is tested using two testing techniques I love: [property-based testing](https://en.wikipedia.org/wiki/Software_testing#Property_testing) and [screenshot testing](https://en.wikipedia.org/wiki/Software_testing#Output_comparison_testing). It took me some time to combine the different technologies involved and make them reliable enough but I got to a point where this solution can be applied to other apps.

# The future of prototypes

This journey has revealed my passion for rapid, focused development projects. The satisfaction of quickly bringing ideas to life, coupled with the experience and tools I've accumulated, has inspired my next venture: a studio dedicated to helping others build their prototypes.

If you have an idea that needs rapid validation, or a prototype that could benefit from my experience with React Native and cross-platform development, I'd love to help bring it to life. Stay tuned for more details about my upcoming studio, where we'll turn ideas into reality – faster than you might think possible.