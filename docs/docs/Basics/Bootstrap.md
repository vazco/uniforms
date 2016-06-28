# Uniforms & Bootstrap

We have a package for both Bootstrap 3 & form4, but installing Bootstrap is up to
you.

## Using `form-horizontal` or `grid`

Bootstrap3 has a `form-horizontal` configuration,
and Bootstrap4 has moved to just referring to it as a grid form.
Whatever you call it, putting the label and input on the same line
is often a great UI choice.

We support it with the `grid` property which you can pass into any Uniforms `Form` or `Field`.

You can pass in an integer, which is the left column value... For example:

```js
<AutoForm className="form-horizontal" grid={3}>
        <AutoField name="name" />
</AutoForm>
```

This ends up as:

```js
<section class="form-group row">
        <label for="uniforms-0000-0001" class="form-control-label col-sm-3">Name</label>
        <section class="col-sm-9">
                <input type="text" class="form-control" id="uniforms-0000-0001" name="name">
        </section>
</section>
```

You may also pass in an object, controlling various sizes and their grid
handling:

```js
<AutoForm className="form-horizontal" grid={{ xs: 6, sm: 4, md: 3 }}>
        <AutoField name="name" />
</AutoForm>
```

This ends up as:

```js
<section class="form-group row">
        <label for="uniforms-0000-0001" class="form-control-label col-xs-6 col-sm-4 col-md-3">Name</label>
        <section class="col-xs-6 col-sm-8 col-md-9">
                <input type="text" class="form-control" id="uniforms-0000-0001" name="name">
        </section>
</section>
```

## Using `labelBefore` for `FieldBool`

If you are using `FieldBool` you probably want your label after
(on the right of) your checkbox.

Uniforms Bootstrap supports a special `labelBefore` property, which can control
the label before (on the left of) your checkbox.

```js
<BoolField name="default" label="I Trust Defaults" />
<BoolField name="custom" label="I Want My Own Label On Left" labelLeft="Confirm" />
<BoolField name="reactNode" label="I Can Pass in React Nodes" labelLeft={<span>&nbsp;</span>} />
```

