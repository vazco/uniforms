---
id: 'tutorials-customizing-your-form-layout'
title: 'Customizing your form layout'
---

Great! Now that we have our form up and running, it's time to think about how we can customize it and adjust to our needs.

Let's say we would like to add a heading "IT meeting guest questionnaire" and change the order of the fields - the field asking for a guest's last name should come first.
We also want to ask for their work experience more politely.

How can we do it? That's where `Autofield` and `AutoFields` components come into action.

**Note:** Both `AutoFields` and `AutoField` components generate, no more and no less, only form fields.
That means we have to manually add the submit button (`SubmitField`) and the error messages (`ErrorsField`).

### Adding a heading to the form

If you need to add heading to your form, using `AutoFields` seems to be a perfect solution.
`AutoFields` will automatically render form fields based on the schema within the `AutoForm`.

```tsx
import React from 'react';
import {
  AutoForm,
  AutoFields,
  ErrorsField,
  SubmitField,
} from 'uniforms-semantic';

import { bridge as schema } from './GuestSchema';

export function GuestFormWithHeading() {
  return (
    <AutoForm schema={schema} onSubmit={console.log}>
      <h4>IT meeting guest questionnaire</h4>
      <AutoFields />
      <ErrorsField />
      <SubmitField />
    </AutoForm>
  );
}
```

### Changing the order of the fields

If you need to reorder your fields, `AutoField` is your best friend.
`AutoField` will automatically render any field based on the field name provided in the schema.
Using AutoFields allows you to freely manipulate your form's layout.

Here we've changed the order of the `lastName` and `firstName` field and added a polite question,
asking whether the people filling the form would like to share with us their work experience.

```tsx
import React from 'react';
import {
  AutoField,
  AutoForm,
  ErrorsField,
  SubmitField,
} from 'uniforms-semantic';

import { bridge as schema } from './GuestSchema';

export function GuestFormWithAutoFields() {
  return (
    <AutoForm schema={schema} onSubmit={console.log}>
      <h4>IT meeting guest questionnaire</h4>
      <AutoField name="lastName" />
      <AutoField name="firstName" />
      <span>Do you want to share your work experience with us?</span>
      <AutoField name="workExperience" />
      <ErrorsField />
      <SubmitField />
    </AutoForm>
  );
}
```

### Changing the order of the error messages

Similarly to the fields, we can also change the order of the displayed errors.
Instead of using the `ErrorsField` component, which renders one stack block of errors,
we can use the `ErrorField` and just place it directly where want in our form.

```tsx
import React from 'react';
import {
  AutoForm,
  AutoField,
  ErrorField,
  SubmitField,
} from 'uniforms-semantic';

import { bridge as schema } from './GuestSchema';

export function GuestFormWithErrorFields() {
  return (
    <AutoForm schema={schema} onSubmit={console.log}>
      <h4>IT meeting guest questionnaire</h4>
      <AutoField name="lastName" />
      <ErrorField name="lastName" />
      <AutoField name="firstName" />
      <ErrorField name="firstName" />
      <span>Do you want to share your work experience with us?</span>
      <AutoField name="workExperience" />
      <ErrorField name="workExperience" />
      <SubmitField />
    </AutoForm>
  );
}
```

### Changing the error message

The default error messages are rather unfriendly. Hopefully, we can easily modify them,
either by passing the `children` to the `ErrorField` or by using the `errorMessage` prop:

```tsx
import React from 'react';
import {
  AutoField,
  AutoForm,
  ErrorField,
  SubmitField,
} from 'uniforms-semantic';

import { bridge as schema } from './GuestSchema';

export function GuestFormWithChangedErrors() {
  return (
    <AutoForm schema={schema} onSubmit={console.log}>
      <h4>IT meeting guest questionnaire</h4>
      <AutoField name="lastName" />
      <ErrorField name="lastName">
        <span>You have to provide your last name!</span>
      </ErrorField>
      <AutoField name="firstName" />
      <ErrorField
        name="firstName"
        errorMessage="You have to provide your first name!"
      />
      <span>Do you want to share your work experience with us?</span>
      <AutoField name="workExperience" />
      <ErrorField
        name="workExperience"
        errorMessage="Your work experience cannot be lesser than 0 or greater than 100 years!"
      />
      <SubmitField />
    </AutoForm>
  );
}
```
