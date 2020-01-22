import React from 'react';
import { AutoForm } from 'uniforms-unstyled';
// import { AutoForm } from 'uniforms-antd';
// import { AutoForm } from 'uniforms-bootstrap3';
// import { AutoForm } from 'uniforms-bootstrap4';
// import { AutoForm } from 'uniforms-material';
// import { AutoForm } from 'uniforms-semantic';

import schema from './schema/json-schema';
// import schema from './schema/graphql-schema';
// import schema from './schema/simple-schema-2';

function App() {
  return (
    <AutoForm
      placeholder
      schema={schema}
      onSubmit={model => alert(JSON.stringify(model, null, 2))}
    />
  );
}

export default App;
