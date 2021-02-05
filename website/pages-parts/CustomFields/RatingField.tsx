import React from 'react';
import classnames from 'classnames';
import { AutoForm, SubmitField } from '../../lib/universal';
import { HTMLFieldProps, connectField } from 'uniforms';

import { bridge as schema } from './RatingFieldSchema';

type RatingProps = HTMLFieldProps<number, HTMLDivElement, { max?: number }>;

function Rating({
  className,
  disabled,
  max = 5,
  onChange,
  required,
  value = 0,
}: RatingProps) {
  return (
    <div className={classnames('ui', { disabled, required }, className)}>
      {Array.from({ length: max }, (_, index) => index + 1).map(index => (
        // TODO[jsx-a11y]
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
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
    </div>
  );
}

const RatingField = connectField(Rating);

export function RatingFieldForm() {
  return (
    <AutoForm
      schema={schema}
      model={{ rating: 3 }}
      onSubmit={(model: any) => alert(JSON.stringify(model, null, 2))}
    >
      <RatingField name="rating" />
      <br />
      <SubmitField />
    </AutoForm>
  );
}
