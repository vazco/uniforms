# How to contribute

Third-party patches are essential for keeping every project great. We simply can't access the huge number of use cases. We want to keep it as easy as possible to contribute changes that get things working in your environment. There are a few guidelines that we need contributors to follow to have a chance of keeping on top of things.

Our kanban board is public and available [here](https://github.com/orgs/vazco/projects/4/views/5).

## Getting started

- Make sure you have a [GitHub account](https://github.com/signup/free).
- Submit a ticket for your issue, assuming one does not already exist.
  - It is OK to comment an already closed issue or review already merged PR.
    - If needed, we'll reopen it or open a new one.
  - Clearly describe the issue, including steps to reproduce if it is a bug.
    - If possible, include a reproduction using our [playground](https://uniforms.tools/playground) or [CodeSandbox template](https://codesandbox.io/s/github/vazco/uniforms/tree/master/reproductions).
  - Add a list of affected versions of the core, bridge, and theme packages you are aware of.
    - Include other versions as well, if you think it may help (React, browser, etc.).

## Making changes

- Create a fork from where you want to base your work.
- Clone the repo and run `npm ci` **in the top-level only**.
  - Make sure you are using `npm` that understands the `package-lock.json` format. Check the current version in the `package.json` file.
- Make sure your commit messages are in the proper format:
  - Bugfix or feature:
    - `Implemented asynchronous validation (closes #17).`
    - `Disabled onSubmit until first render (closes #15).`
  - Other changes:
    - `Refactored joinName tests.`
    - `Updated README.md.`
- Make sure you have added the necessary tests for your changes. Do not worry though, the Codecov bot will report it in the pull request.
- Make sure your code passes _all_ tests: `npm test`.

### Development

For the best local developer experience (DX) it is recommended to run scripts in watch mode.

Run the commands below in the root directory.

#### Running the build in watch mode

```sh
npm run build:watch
```

#### Running the tests in watch mode

```sh
npm run test -- --watch
```

#### Fixing lint issues automatically

```sh
npm run lint:code -- --fix
```

#### Making changes to the documentation website (docusaurus)

The local version of docs will use the locally built version of uniforms, so make sure to run the build in watch mode for live changes.

Navigate to `/website` and run

```sh
npm start
```

It will start the docusaurus in development mode supporting hot reload so you should see the changes made to the website immediately.

## _Work in progress_ PRs are also welcome

If you can't or won't finish your PR, submit it anyway - maybe someone else will continue your work. If you don't know how to achieve your desired feature - file an issue for it - maybe someone else will implement it.
