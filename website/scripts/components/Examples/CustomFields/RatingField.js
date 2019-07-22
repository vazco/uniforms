import React from 'react';
import classnames from 'classnames';
import connectField from 'uniforms/connectField';

import { AutoForm, SubmitField } from '../../universal';
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
    {[...Array(max)]
      .map((_, index) => index + 1)
      .map(index => (
        <span
          style={{ fontSize: 40 }}
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

export default function ExamplesRangeField() {
  return (
    <AutoForm
      schema={schema}
      model={{ rating: 3 }}
      onSubmit={model => alert(JSON.stringify(model, null, 2))}
    >
      <RatingField name="rating" />
      <SubmitField />
    </AutoForm>
  );
}
