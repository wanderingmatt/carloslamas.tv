# Carlos Lamas' Reel

Portfolio site for video editor Carlos Lamas.

## Setup

The site is built and deployed via Parcel to GitHub Pages. You will need [Homebrew](https://brew.sh/), [Node](https://nodejs.org/en/download/package-manager), and [Parcel](https://parceljs.org/) installed.

#### Install Homebrew

`$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

#### Install Node via Homebrew

`$ brew install node`

#### Install Node Dependencies

This will install Parcel and all development Node modules. Make sure you run this command from the project root.

`$ npm install`

## Developing

The `start` task will automatically rebuild your app, and serve it at http://localhost:1234/ with live reload.

`$ npm run start`

## Deploying

The `deploy` task will automatically rebuild your app, copy everything in the local `dist` folder to the `gh-pages` branch, and push it to GitHub.

`$ npm deploy`
