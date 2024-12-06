import SimpleSchema from 'simpl-schema';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';

// <schema>
const schema = new SimpleSchema({
  firstName: { type: String },
  lastName: { type: String },
  country: {
    type: String,
    allowedValues: ['Poland', 'England'],
    defaultValue: 'Poland',
  },
  state: {
    type: String,
    optional: true,
  },
  useThisAddressForPaymentDetails: {
    type: Boolean,
    defaultValue: false,
  },
  addressLine: { type: String },
  city: { type: String },
  zip: { type: String },
});

export const bridge = new SimpleSchema2Bridge({ schema });
// </schema>
