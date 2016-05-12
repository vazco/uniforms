import React       from 'react';

const buildErrors = (error, schema) => {
  console.log('buildErrors (WIP need error & schema)', { error, schema });
  return (
    error && schema ?
      <span className="errors">
        {(!!error.reason && !(error.details || !error.details.map)) && (
          <span>{error.reason}</span>
        )}
        {(!!error.details && error.details.map) && error.details.map(error =>
          <span key={error.name}>
            {schema.messageForError(error.type, error.name, null, error.details && error.details.value)}
          </span>
        )}
      </span>
    : ''
  );
};

export default buildErrors;

