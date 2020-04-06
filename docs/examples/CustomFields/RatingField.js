import React from 'react';
import classnames from 'classnames';
import { AutoForm, SubmitField } from '../../../website/components/universal';
import { connectField } from 'uniforms';

import schema from './RatingFieldSchema';

const Rating = ({
  className,
  disabled,
  max = 5,
  required,
  value,
  onChange
}) => (
  <section className={classnames('ui', { disabled, required }, className)}>
    {Array.from({ length: max }, (_, index) => index + 1).map(index => (
      <span
        style={{ fontSize: 40, cursor: 'pointer' }}
        key={index}
        onClick={() =>
          disabled || onChange(!required && value === index ? null : index)
        }
      >
        {index <= value ? '★' : '☆'}
      </span>
    ))}
  </section>
);

const RatingField = connectField(Rating);

export default function ExampleOfRangeField() {
  return (
    <AutoForm
      schema={schema}
      model={{ rating: 3 }}
      onSubmit={model => alert(JSON.stringify(model, null, 2))}
    >
      <RatingField name="rating" />
      <br />
      <SubmitField />
    </AutoForm>
  );
}
