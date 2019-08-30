import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  country: {
    type: String,
    allowedValues: ['Poland', 'England', 'Germany', 'Russia'],
    defaultValue: 'Poland'
  },
  state: {
    type: String,
    optional: true
  },
  useThisAddressForPaymentDetails: {
    type: Boolean
  },
  addressLine1: {
    type: String
  },
  addressLine2: {
    type: String,
    optional: true
  },
  city: {
    type: String
  },
  zip: {
    type: String
  }
});
