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