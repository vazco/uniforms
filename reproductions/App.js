import React from 'react';
import { AutoForm } from 'uniforms-semantic';
// import { AutoForm } from 'uniforms-bootstrap3';
// import { AutoForm } from 'uniforms-bootstrap4';
// import { AutoForm } from 'uniforms-material';
// import { AutoForm } from 'uniforms-antd';

import { jsonSchema /*, graphqlSchema, simpleSchema2 */ } from './schema';

function App() {
  return (
    <AutoForm
      placeholder
      schema={jsonSchema}
      onSubmit={model => alert(JSON.stringify(model, null, 2))}
    />
  );
}

export default App;
