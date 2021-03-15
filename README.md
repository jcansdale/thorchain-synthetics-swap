# block42 Frontend Boilerplate

This is a template repository. The following has been set up:
- The master branch is protected -> one PR approval is necessary to merge on master
- The branch of the PR needs to be up to date -> rebase your project before submitting PR
- The content of this repository is a [frontend boilerplate](#BoilerplateInfo)
- The PR template is integrated
- The following workflows are configured:
    - [Super Linter](https://github.com/github/super-linter)

## Before you start building:
If you are not familiar with VueJs, VueX (state management) or VueJs Router you can take our 
[LICX Web](https://github.com/block42-blockchain-company/liquid-icx-web) project as a reference.

- Make sure to replace the name of the project in package.json.

## Boilerplate Info
This is the boilerplate we use for front ends. It streamlines the setup of projects and makes sure that the same tools, 
frameworks and pipelines exist for all our projects. Also contained are basic assets like block42 logo and colors.


The setup consists of:
- VueJs
- VueX
- VueJs Router
- VueJs PWA
- TypeScript
- Babel
- ESLint Prettier

For deployment a docker image with nginx is created and spun up. Note that the certificates and other server settings 
should be handled by the web application server which includes the backend.
The purpose of this server is to ease integration with the backend via a reverse proxy. 

A pre-commit hook triggers linting locally on your machine.

The setup also includes block42 standard Github actions:
- Formatting

*Delete Me*
****
# >YOUR_PROJECT_NAME<

>SHORT DESCRIPTION GOES HERE<


## Getting Started
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Build and serve from docker container
```
npm run deploy
```
