---
title: "How to build and deploy a NextJS site in 15 minutes"
author: "Glenn Stovall"
published_at: "2020-11-30"
tags: ['NextJS', 'deployment']
---

NextJS is quickly becoming my favorite way to build websites. It can be static or full-stack. It's easy to deploy. You are reading this article on a static engine built on NextJS and hosted on Netlify. Here's how you can create a site with NextJS and have it online in a matter of minutes. 

## Prerequisites

You'll need NodeJS and npx installed on your local machine, as well as accounts on [Github](https://github.com) and [Netlify](https://netlify.com). 

## 1. Create a new NextJS app

NextJS provides a utility for creating new sites, run the following script to create your new site: 

```js
npx create-next-app my-app-name
```

## 2. Add build scripts

Next, Netlify needs to know how to build your site. Add the following commands to your package.json file: 

```js
"scripts" : { 
 "build": "next build"
  "export" : "next export"
 } 
```

Then commit your changes. 

## 3. Switch from master to main

As a general rule, I use main instead of master as my default branch. You can read more about [why here](https://twitter.com/tobie/status/1270290278029631489). You can read more about updating your branch on Github here: [Renaming master to main](https://github.com/github/renaming)

```
git branch -m master main
```

## 4. Push the repository to Github

Create a new repository on Github, and push your code to that branch. Once the code is online, we will be able to integrate with Netlify's automatic deployment. The repo can be public or private. 

```
git remote add origin https://github.com/YourName/your-spiffy-repo.git
git branch -u origin main
```

## 5. Create a new site on Netlify

Log into to your Netlify account, and click the 'new site from git' button. You will be prompted to select a repository and give Netlify permission to access it. 

## 6. Setup Automatic Deployment

Set the build command to the following: 
```
npm run build && npm run export
```

Then, set the publishing directory to 'out'.

## 7. Deploy your site
click 'deploy site'. In a few second your site will be live! 

## Updating your site. 
That was the last time you'll need to click the deploy button. From now on, every time you push a commit to the main branch, a new version of your site will automatically be deployed! 

**Update December 7, 2020:** Netlify just added [Netlify one-click installs](https://www.netlify.com/blog/2020/12/07/announcing-one-click-install-next.js-build-plugin-on-netlify/)
