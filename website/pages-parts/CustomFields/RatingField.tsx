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
  function onAction(
    event:
      | React.KeyboardEvent<HTMLSpanElement>
      | React.MouseEvent<HTMLSpanElement, MouseEvent>,
    index: number,
  ) {
    if (!disabled && (!('key' in event) || event.key === 'Enter')) {
      onChange(!required && value === index ? undefined : index);
    }
  }

  return (
    <div className={classnames('ui', { disabled, required }, className)}>
      {Array.from({ length: max }, (_, index) => index + 1).map(index => (
        <span
          style={{ fontSize: 40, cursor: 'pointer' }}
          key={index}
          onClick={event => onAction(event, index)}
          onKeyDown={event => onAction(event, index)}
          role="button"
          tabIndex={0}
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
