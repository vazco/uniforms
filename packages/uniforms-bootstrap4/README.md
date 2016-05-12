# uniforms-bootstrap4

> bootstrap4 UI components for `uniforms`.

## Install

```sh
$ npm install uniforms-bootstrap4
```

For more in depth documentation see: [https://github.com/vazco/uniforms/](https://github.com/vazco/uniforms/).

## Roadmap

- [x] build out basic, grid enabled, FormGroup wrapper for
      label, input, error/help
- [ ] fix bug `FormGroup` - after typing into a text input,
      it changes to [object Object]
      http://puu.sh/oOQSD/dac44d4cd6.png
- [ ] improve `FormGroup`
  - [ ] link FormGroup with the form `schema`
  - [ ] link FormGroup with the form `error` object (per field)
  - [ ] pass the Form `grid` prop down to all _child_ field inputs, into `FormGroup`
- [ ] more configuration options
- [ ] make a bootstrap3 version (similar to bootstrap4, just a few differences)
- [ ] core `uniforms` improvement: track `touched` for inputs
- [ ] core `uniforms` improvement: allow `autosave`
      configuration: `onBlur`, `onInput`, `onChange`
      (run: validate without throwing errors on other fields true=submit)

