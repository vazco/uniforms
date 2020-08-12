import React from 'react';
import {
  AutoField,
  AutoForm,
  ErrorsField,
  SubmitField,
} from 'uniforms-semantic';

import { bridge as schema } from './ShippingSchema';

const model = {
  firstName: 'John',
  lastName: 'Doe',
  addressLine: '7 Podwale st.',
  city: 'Wroclaw',
};

export function ShippingForm() {
  return (
    <AutoForm
      schema={schema}
      onSubmit={(model: any) => alert(JSON.stringify(model, null, 2))}
      model={model}
      placeholder
    >
      <div className="ui grid">
        <div className="row">
          <div className="column">
            <h1>Shipping address</h1>
          </div>
        </div>

        <div className="two column row">
          <div className="column">
            <AutoField name="firstName" />
          </div>
          <div className="column">
            <AutoField name="lastName" />
          </div>
        </div>

        <div className="row">
          <div className="column">
            <AutoField name="addressLine" />
          </div>
        </div>

        <div className="two column row">
          <div className="column">
            <AutoField name="city" />
          </div>
          <div className="column">
            <AutoField name="state" placeholder="State/Province/Region" />
          </div>
        </div>

        <div className="two column row">
          <div className="column">
            <AutoField name="zip" placeholder="Zip / Postal code" />
          </div>
          <div className="column">
            <AutoField name="country" />
          </div>
        </div>

        <div className="row">
          <div className="column">
            <AutoField name="useThisAddressForPaymentDetails" />
          </div>
        </div>

        <div className="row">
          <div className="column">
            <SubmitField value="Ship it!" className="blue fluid" />
            <ErrorsField />
          </div>
        </div>
      </div>
    </AutoForm>
  );
}
