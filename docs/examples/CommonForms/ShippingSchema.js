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
    allowedValues: ['Poland', 'England'],
    defaultValue: 'Poland'
  },
  state: {
    type: String,
    optional: true
  },
  useThisAddressForPaymentDetails: {
    type: Boolean,
    defaultValue: false
  },
  addressLine: {
    type: String
  },
  city: {
    type: String
  },
  zip: {
    type: String
  }
});
