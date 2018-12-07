import PropTypes from 'prop-types';
import {createElement} from 'react';

import AutoField from './AutoField';

const AutoFields = ({autoField, element, fields, omitFields, ...props}, {uniforms: {schema}}) =>
  createElement(
    element,
    props,
    (fields || schema.getSubfields())
      .filter(field => omitFields.indexOf(field) === -1)
      .map(field => createElement(autoField, {key: field, name: field}))
  );
AutoFields.contextTypes = AutoField.contextTypes;

AutoFields.propTypes = {
  autoField: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  element: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

  fields: PropTypes.arrayOf(PropTypes.string),
  omitFields: PropTypes.arrayOf(PropTypes.string)
};

AutoFields.defaultProps = {
  autoField: AutoField,
  element: 'div',
  omitFields: []
};

export default AutoFields;
