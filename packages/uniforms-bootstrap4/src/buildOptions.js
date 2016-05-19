
function allowedValuesToOptions(allowedValues, transform) {
  return allowedValues.map(
    value => transform ? transform(value) : value
  );
}

export default function buildOptions (props) {
  const { field, transform } = props;
  const { allowedValues, autoform } = field || {};
  const { options } = autoform || {};

  // did we extract field.autoform.options ?
  if (options && Object.keys(options).length > 0) return options;

  if (!allowedValues) return [];
  if (!Array.isArray(allowedValues)) return [];
  return allowedValuesToOptions(allowedValues, transform);
}

