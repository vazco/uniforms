# How to contribute

Third-party patches are essential for keeping every project great. We simply can't access the huge number of use cases. We want to keep it as easy as possible to contribute changes that get things working in your environment. There are a few guidelines that we need contributors to follow so that we can have a chance of keeping on top of things.

## Getting started

* Make sure you have a [GitHub account](https://github.com/signup/free)
* Submit a ticket for your issue, assuming one does not already exist.
    * Clearly describe the issue including steps to reproduce if it is a bug.
    * Make sure you fill in the earliest version that you know has the issue.

## Making changes

* Create a fork from where you want to base your work.
* Make commits of logical units.
* Make sure your commit messages are in the proper format:
    * Bugfix:
        * `Asynchronous validation (closes #17).`
        * `Skip onSubmit until rendered (closes #15).`
    * Other changes:
        * `Refactoring core package.`
        * `Updated README.`
* Make sure you have added the necessary tests for your changes.
* Make sure your code passes *all* tests:
    * `npm test`

## Styling

* If you submit a PR with any code, passing ESLint should be enough _(everything else will be reported in your PR review)_.
* If you submit a PR with any documentation, code blocks should pass ESLint and code comments should be wrapped at 80 characters.

<br>

# _Work in progress_ PRs are also welcome

If you can't/couldn't/won't finish your PR, submit it anyway - maybe someone else will continue your work. Also, if you don't know how to achieve your desired feature - file an issue for it - maybe someone else will implement it.
