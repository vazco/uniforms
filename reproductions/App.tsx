import React from 'react';
// import { AutoForm } from 'uniforms-unstyled';
// import { AutoForm } from 'uniforms-antd';
// import { AutoForm } from 'uniforms-bootstrap3';
// import { AutoForm } from 'uniforms-bootstrap4';
// import { AutoForm } from 'uniforms-bootstrap5';
// import { AutoForm } from 'uniforms-material';
import { AutoForm } from 'uniforms-mui';
// import { AutoForm } from 'uniforms-semantic';

// import { bridge as schema } from './schema/json-schema';
// import { bridge as schema } from './schema/graphql-schema';
// import { bridge as schema } from './schema/simple-schema-2';
import { bridge as schema } from './schema/mui-simple-schema-2';

export function App() {
  return (
    <AutoForm
      placeholder
      schema={schema}
      onSubmit={(model: any) => alert(JSON.stringify(model, null, 2))}
    />
  );
}
