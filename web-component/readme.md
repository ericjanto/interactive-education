# Video Component Roadmap

- [x] Add interactive element component
- [x] Bundle javascript using webpack + set up in index.html
- [x] Make this a module
- [x] Webpack to compile JavaScript to be as compatible as possible
- [x] Set up webpack server
- [x] Improve webpack setup with linters and prettier etc. Tutorial: https://github.com/taniarascia/webpack-boilerplate
- [x] Make fields private
- [ ] Time conversion from "time" attribute
- [ ] At specified time, video is stopped and an element is shown
- [ ] The element shown is an iframe (with random url)
- [ ] Add error handling
- [ ] Refactor *heavily*
- [ ] Extend functionality
- [ ] Documentation via JSDoc
- [ ] Testing with jest

## Setup

* Node version: >= 14.17.5
* `yarn run dev`: formats code, styleguide hints, and serves dev server
* `yarn run build`: creates production bundle of web component in `/dist`, along with an example html page


## Dev Tools
I utilise a number of developer tools which are standards for web development these days. Their main functionality:

* WEBPACK: bundles and minimises the JavaScript files for the web component and and serves the same functionality in a single script which is as browser compatible and light-weight as possible
* BABEL: used by WEBPACK to compile potentially higher JavaScript versions to the most compatible version for most browsers ("transpiling")
* ESLINT: enforces coherent styleguide across the component
* PRETTIER: formats code