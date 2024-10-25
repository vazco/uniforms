---
id: tutorials-creating-custom-field
title: Creating a custom field
---

Great! We have a perfect form designed for collecting the data about our guests!
In the previous chapters, we've learned how to use the `AutoForm` and redesign its layout, by changing the order of the fields and error messages (if any).
We've also found out how to change the fields' types, by using predefined ones, such as `SelectField` or `LongTextField`.

Now we're going to learn how to define a custom field.

Let's assume that our conference has a limited number of attendees.
What we need is to prepare special passes, with the first name, last name and the photo of the person.
Therefore, we need to add one more field to our form - an image field, which should enable our guests to choose a photo.
As there isn't such field provided, we have to create it ourselves.

Let's add a new property to our schema - `pictureUrl`, which will store an URL string containing guest's picture,
and declare that it will be managed by our newly created custom `ImageField` component:

```tsx
import Ajv, { JSONSchemaType } from 'ajv';

type FormData = {
  firstName: string;
  lastName: string;
  workExperience: number;
  profession: string;
  additionalInfo: string;
  pictureUrl: string;
};

const schema: JSONSchemaType<FormData> = {
  title: 'Guest',
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    workExperience: {
      description: 'Work experience in years',
      type: 'integer',
      minimum: 0,
      maximum: 100,
    },
    profession: {
      type: 'string',
      options: [
        {
          label: 'Developer',
          value: 'developer',
        },
        {
          label: 'Tester',
          value: 'tester',
        },
        {
          label: 'Product owner',
          value: 'product-owner',
        },
        {
          label: 'Project manager',
          value: 'project-manager',
        },
        {
          label: 'Businessman',
          value: 'businessman',
        },
      ],
    },
    additionalInfo: {
      type: 'string',
      uniforms: { component: LongTextField },
    },
    pictureUrl: {
      type: 'string',
      uniforms: { component: ImageField },
    },
  },
  required: ['firstName', 'lastName'],
};
```

We can prepare the custom field by creating a React component and wrapping it in a `connectField` helper.
`connectField` will pass various props related to the form management, such as `onChange()` function, current field's value, errors an so on.
You can find the whole list of guaranteed props inside the [helpers](/docs/api-helpers#connectfieldcomponent-options) section.
It's worth noting, that it will also add the `Field` suffix to the name of our component.

Our newly created `ImageField` looks like this:

```tsx
import React from 'react';
import { HTMLFieldProps, connectField } from 'uniforms';

export type ImageFieldProps = HTMLFieldProps<string, HTMLDivElement>;

function Image({ onChange, value }: ImageFieldProps) {
  return (
    <div className="ImageField">
      <label htmlFor="file-input">
        <div>Choose your photo</div>
        <img
          alt=""
          style={{ cursor: 'pointer', width: '150px', height: '150px' }}
          src={value || 'https://picsum.photos/150?grayscale'}
        />
      </label>
      <input
        accept="image/*"
        id="file-input"
        onChange={({ target: { files } }) => {
          if (files && files[0]) {
            onChange(URL.createObjectURL(files[0]));
          }
        }}
        style={{ display: 'none' }}
        type="file"
      />
    </div>
  );
}

export default connectField<ImageFieldProps>(Image);
```

The component itself is a file input that accepts only images.
After the file is selected, it is converted to the DOMString that contains a URL representing the user's picture.
Please pay attention to what props the `Image` component uses: `onChange` and `value` are provided by a `connectField` helper.
By using these, we don't have to worry about managing the field's state.

Take a look at the form code:

```tsx
import React from 'react';
import {
  AutoField,
  AutoForm,
  ErrorField,
  SubmitField,
} from 'uniforms-semantic';

import { bridge as schema } from './GuestSchema';

export function GuestFormFinal() {
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
        errorMessage="Your work experience cannot be \
                      lesser than 0 or greater than 100 years!"
      />
      <AutoField name="profession" />
      <AutoField name="additionalInfo" />
      <AutoField name="pictureUrl" />
      <SubmitField />
    </AutoForm>
  );
}
```
