# SEG-FE
**Subscriber Experience Group - Front-End**

> See also API counterpart, [SEG-API](https://github.com/nytm/seg-api)

A completely new, fully JS-based ~~isomorphic~~ universal modern stack, with the following technologies:

- [React](https://facebook.github.io/react/) for the UI
- [Redux](http://redux.js.org/) for a [Flux architecture](https://facebook.github.io/flux/docs/overview.html) with unidirectional data flow
- [Express](http://koajs.com/) as the backend server for file serving and React pre-rendering
- [webpack](http://webpack.github.io/) to compile and bundle everything together, hot reload included
- [SASS](http://sass-lang.com/) with [autoprefixer](https://github.com/postcss/autoprefixer) and [Bootstrap 4](http://v4-alpha.getbootstrap.com/) for a latest-and-greatest CSS solution
- [Babel](https://babeljs.io/) for classy ES6/7+ code throughout
- [Mocha](http://mochajs.org/) with [jsdom](https://www.npmjs.com/package/node-jsdom) for DOM-rendered Unit/Component tests
- [ESLint](http://eslint.org/) and [CSSLint](https://github.com/CSSLint/csslint) for linting


## Project Goals

- Employ a modern, cutting-edge JS-based tech stack
- Rearchitecture starting point for the legacy MYACC pages
- Adopt a component-based mentality for all UI elements via React, and a Flux-based approach to data flows (uni-directional)
- Favor leveraging existing/proven open source solutions over reinventing the wheel


## TODO

- Provide a `vanilla` branch with no SEG-specific things for other teams to pick up and use.
- i18n solution, see: [MYACC-2128](https://jira.nyt.net/browse/MYACC-2128)
- JS/JSX ESLinter is in place, need to also add CSSLint
- Code coverage (e.g. [BlanketJS](http://blanketjs.org/))
- Proxy to [API endpoints](http://github.com/nytm/seg-api)
- Create a Style Guide that enumerates all the different React components on one page to act as a library for developers to pull elements from and act as a living Style Guide for designers. Ideally, this Style Guide will be automatically created via some node script that can generate it on the fly (e.g. `npm run styleguide`).
- Git commit hooks to run tests and linters.

### Long-term TODOs

- Automated E2E tests with [Nightwatch.js](http://nightwatchjs.org/)
- Integrate [Passportjs](http://passportjs.org/) for authentication (also handles SSO)


---

# Development

## Getting started

0. Install dependencies: `npm install`
1. Build and start dev server: `npm run dev`
2. Navigate to [http://localhost:8080](http://localhost:8080) to view the app.

## Testing

Once: `npm run test`

Or, for TDD: `npm run watch-test`

> NOTE: Node v4 or higher is required to run tests (jsdom requirement). To install/use different versions of node, you can use [nvm](https://github.com/creationix/nvm) (or just update your system version).


## Linting

`npm run lint`

Can also watch: `npm run watch-lint`


## Git hooks
We're using `ghooks` (https://github.com/gtramontina/ghooks/)
to manage our git hooks.

**Are you a Git GUI user (SourceTree etc)?** See more details on
[enabling git hooks for your git client](scripts/ghooks-fix/README.md)




## Dev Guide

#### React Components
  - Favor composition over inheritance
  - Use decorators and [higher order components](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)
  - Each component should have its own stylesheet, named after the component, e.g. `TodosView.scss`
  - By convention, all stylesheets should be nested under a root classname that is the same as the JSX element it is styling.
  - All the class names in a component must come from the local stylesheet
  - To reuse styles, use mixins and define new classes in the local stylesheet

#### Component Types
There are 4 React component types:

0. Pages
1. Views
2. Elements
3. Pure (elements)

> A **page** is composed of one or more **views**, and a view is composed of one or more **elements**.

For example, the `<MemberCenterPage/>` may be composed of a `<NavigationView/>` and `<ProfileView/>`. The `<NavigationView/>` will be composed of a number of `<Link/>` elements.

Depending on the needs of the app, as it grows in complexity, we may need to introduce other types (such as _layout_ components), but for now, we will strive to keep it simple.

##### What's the difference between an _Element_ and a _Pure_ element?

A _pure_ element can be used without it being aware of the context that it is rendered in and is useful wholly on its own. For example, a TextBox is a pure element. It can be used inside of the `<Login/>` view for both the username and password (just pass in the appropriate PropType to have the TextBox render as standard cleartext or password).

The idea behind pure elements is that they can theoretically be extracted and put directly into any other React-based project and still be useful.

### General Conventions

- In general, name React components with JSX code with a `.jsx` extension. If there's no JSX markup (such as a Flux Action or Store), use a normal `.js` extension.
- Favor ES6 syntax over traditional ES5 syntax.
- Keep a clear separation of concerns with separate ["smart" and "dumb" components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).
- Keep a generally flat folder structure. For example:
  - Pages: /components/pages/MemberCenterPage.jsx
  - Views: /components/views/ProfileView.jsx
  - Elements: /components/elements/Link.jsx
  - Pure Elements: /components/pure/TextBox.jsx
  - Element Stylesheet: /styles/pure/TextBox.scss



## Further learning/useful links

- [Dumb vs Smart Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [Example GIST](https://gist.github.com/chantastic/fc9e3853464dffdb1e3c)
- [Why Compositions over Mixins](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)
- [Flux Implementations Compared](http://pixelhunter.me/post/110248593059/flux-solutions-compared-by-example)
- [React Style Guide Patterns](https://reactjsnews.com/react-style-guide-patterns-i-like/)
- [ES6 React/JSX Coding Standards](https://github.com/jrskerritt/react-coding-standards)


The end.
# set-game
