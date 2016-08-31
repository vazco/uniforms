# How to contribute

Third-party patches are essential for keeping every project great. We simply can't access the huge number of use cases. We want to keep it as easy as possible to contribute changes that get things working in your environment. There are a few guidelines that we need contributors to follow so that we can have a chance of keeping on top of things.

## Getting started

* Make sure you have a [GitHub account](https://github.com/signup/free)
* Submit a ticket for your issue, assuming one does not already exist.
    * Clearly describe the issue including steps to reproduce when it is a bug.
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

# Running locally

See [docs](https://github.com/vazco/uniforms/blob/master/docs).
