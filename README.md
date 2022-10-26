# carlos-lamas.tv

Portfolio site for video editor Carlos Lamas.

## Setup

The site is compiled and deployed via Grunt. You will need [Homebrew](https://brew.sh/), [Node](https://nodejs.org/en/download/package-manager), and [Parcel](https://parceljs.org/) installed.

#### Install Homebrew

`$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

#### Install Node via Homebrew

`$ brew install node`

#### Install Remaining Development Dependencies

`$ npm install` (from project root)

## Developing

The `start` task will start the Parcel server in the default configuration.

`$ npm start`

## Deploying

The site is hosted under a custom domain on Github Pages. The `deploy` Gulp task will copy everything in the `dist` folder to the `gh-pages` branch and push it to Github. You can run the `deploy` task from the project root folder by typing:

`$ gulp deploy`
