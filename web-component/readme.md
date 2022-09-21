# Video Component

- [x] Add interactive element component
- [x] Bundle javascript using webpack + set up in index.html
- [x] Make this a module
- [x] Webpack to compile JavaScript to be as compatible as possible
- [x] Set up webpack server
- [x] Improve webpack setup with linters and prettier etc. Tutorial: https://github.com/taniarascia/webpack-boilerplate
- [ ] Find better way to define getters / object attributes for interactive element

    ```js
    const expr = 'foo';

    const obj = {
    get [expr]() { return 'bar'; }
    };

    console.log(obj.foo); // "bar"
    ```
- [ ] Documentation via JSDoc

## Scripts

* Node version: >= 14.17.5
* `yarn run dev`: formats code, styleguide hints, and serves dev server
* `yarn run build`: creates production bundle of web component in `/dist`, along with an example html page


## Dev Tools
I utilise a number of developer tools which are standards for web development these days. Their main functionality:

* WEBPACK: bundles and minimises the JavaScript files for the web component and and serves the same functionality in a single script which is as browser compatible and light-weight as possible
* BABEL: used by WEBPACK to compile potentially higher JavaScript versions to the most compatible version for most browsers ("transpiling")
* ESLINT: enforces coherent styleguide across the component
* PRETTIER: formats code