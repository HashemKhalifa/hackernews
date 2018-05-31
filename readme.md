## Hacker rank top 500 stories!

> Top 500 stories from hacker rank !

### Project structure

```
build/
|- template.html _________________________________ # application html
src/
|- index.jsx __________________________________ # Application entry point
|- App.jsx ____________________________________ # Application init
|  |- Components/
|    |- Common /
|       |- error
|           |- index.jsx _________________________ # Common component for error msgs
|           |- error.scss _________________________ #  error msgs style
|    |- Displayed result /
|       |- index.jsx _________________________ # Main component for displaying the result
|       |- displayed-result.scss _________________________ # Displaying result style
|    |- Story Item /
|       |- index.jsx _________________________ # Each story component
|       |- story-item.scss ____________________ # Each story component style
```

### Table of contents

[Install](#install)

[Run development](#run-development)

[Unit testing](#unit-testing)

[Bundling](#bundling)

[Technologies used](#technologies-used)

#### Install

* `npm install` or `yarn` to install all dependency.

#### Run development

* Run `yarn start`

#### Unit testing

> Will run watch all and coverage

* `yarn test`

#### Bundling

* Run `yarn build`

#### Technologies used

* [Webpack 4](https://github.com/webpack/webpack) [ Using the new development mood ]
* [Babel 7](https://github.com/babel/babel) [ transforming JSX and es6 ]
* [React](https://github.com/facebook/react)
* [Lodash](https://github.com/lodash/lodash)
* [Jest](https://github.com/facebook/jest) [ Unit test]
* [Enzyme](http://airbnb.io/enzyme/) for UI testing.
* [Eslint](https://github.com/eslint/eslint/) with airbnb config
* [Prettier](https://github.com/prettier/prettier) [ Code formatter ]
* [CSS Modules](https://github.com/css-modules/css-modules)
* [Style](https://github.com/webpack-contrib/style-loader) & [CSS Loader](https://github.com/webpack-contrib/css-loader)
