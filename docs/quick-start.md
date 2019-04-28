---
id: quick-start
title: Quick start
---

```js
// Choose your theme
import AutoForm from 'uniforms-unstyled/AutoForm';

// A compatible schema
import PostSchema from './schemas/Post';

// This will render an automatic, validated form, with labelled fields, inline
// validation and a submit button. If model will be present, form will be filled
// with appropriate values.
const PostForm = ({model}) => <AutoForm schema={PostSchema} onSubmit={doc => db.save(doc)} model={model} />;
```

That's all! `AutoForm` will generate a complete form with labelled fields, errors list (if any) and a submit button. Also, it will take care of validation and handle model changes.

If you want to have custom layout and/or structure inside your form you can include the form content.

```javascript
// Choose your theme
import AutoField from 'uniforms-THEME/AutoField';
import AutoForm from 'uniforms-THEME/AutoForm';
import SubmitField from 'uniforms-THEME/SubmitField';
import TextField from 'uniforms-THEME/TextField';

// A compatible schema
import PostSchema from './schemas/Post';

const PostForm = ({model}) => (
  <AutoForm schema={PostSchema} onSubmit={doc => db.save(doc)} model={model}>
    <h2>Title</h2>

    <AutoField name="fieldA" />
    <TextField name="fieldB" />

    <div className="super-special-class">
      <SubmitField className="super-special-class-with-suffix" />
    </div>
  </AutoForm>
);
```
