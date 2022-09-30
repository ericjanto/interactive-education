# Video Component Roadmap

- [x] Add interactive element component
- [x] Bundle javascript using webpack + set up in index.html
- [x] Make this a module
- [x] Webpack to compile JavaScript to be as compatible as possible
- [x] Set up webpack server
- [x] Improve webpack setup with linters and prettier etc. Tutorial: https://github.com/taniarascia/webpack-boilerplate
- [x] Make fields private
- [x] Time conversion from "time" attribute
- [x] At specified time, video is stopped
- [x] Show an element at specific time (attach shadow root)
- [x] The element shown is an iframe (with random url)
- [ ] Overlay iframe on top of video:
    * https://stackoverflow.com/questions/16234740/overlay-on-html5-fullscreen-video
    * https://stackoverflow.com/questions/45798213/firefox-fullscreen-video-append-dom-elements?noredirect=1&lq=1
- [ ] Extend functionality
- [ ] Documentation via JSDoc
- [ ] Testing with jest
- [ ] Error handling ->
    * time exactly video duration or time more than duration
    * two interactive elements at same time

## Setup

yarn install

* Node version: >= 14.17.5
* `yarn run dev`: formats code, styleguide hints, and serves dev server
* `yarn run build`: creates production bundle of web component in `/dist`, along with an example html page

## Functionality

* `/flashcard/[promptID]` displays flashcard for corresponding prompt ID
* `/prompts/[promptID]` is the REST API endpoint for retrieving the prompt data

## Dev Tools
I utilise a number of developer tools which are standards for web development these days. Their main functionality:

* WEBPACK: bundles and minimises the JavaScript files for the web component and and serves the same functionality in a single script which is as browser compatible and light-weight as possible
* BABEL: used by WEBPACK to compile potentially higher JavaScript versions to the most compatible version for most browsers ("transpiling")
* ESLINT: enforces coherent styleguide across the component
* PRETTIER: formats code