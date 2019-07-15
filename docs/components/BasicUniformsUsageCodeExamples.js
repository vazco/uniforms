import React from 'react';

import FormContainer from './FormContainer.js';
import GuestFormAntd from './GuestFormAntd.js';
import GuestFormBootstrap3 from './GuestFormBootstrap3.js';
import GuestFormBootstrap4 from './GuestFormBootstrap4.js';
import GuestFormMaterial from './GuestFormMaterial.js';
import GuestFormSemantic from './GuestFormSemantic.js';
import GuestFormUnstyled from './GuestFormUnstyled.js';
import { Code as IconCode, Box, Database } from 'react-feather';
import { Code } from './Code';
import { TabsSelect } from './Tabs';
import { Toggler } from './Toggler';

const formListing = `import AutoForm from 'uniforms-semantic/AutoForm';
import React from 'react';

import GuestSchema from './GuestSchema';

export default function GuestForm() {
  return <AutoForm schema={GuestSchema} onSubmit={console.log} />;
}`;

const schemaListing = `import Ajv from 'ajv';
import {JSONSchemaBridge} from 'uniforms-bridge-json-schema';

const schema = {
  title: 'Guest',
  type: 'object',
  properties: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    workExperience: {
      description: 'Work experience in years',
      type: 'integer',
      minimum: 0,
      maximum: 100
    }
  },
  required: ['firstName', 'lastName']
};

const validator = new Ajv({allErrors: true, useDefaults: true}).compile(schema);

const schemaValidator = model => {
  validator(model);

  if (validator.errors && validator.errors.length) {
    throw {details: validator.errors};
  }
};

const bridge = new JSONSchemaBridge(schema, schemaValidator);

export default bridge;`;

const themesToComponents = {
  semantic() {
    return <GuestFormSemantic />;
  },
  material() {
    return <GuestFormMaterial />;
  },
  bootstrap3() {
    return <GuestFormBootstrap3 />;
  },
  bootstrap4() {
    return <GuestFormBootstrap4 />;
  },
  antd() {
    return <GuestFormAntd />;
  },
  unstyled() {
    return <GuestFormUnstyled />;
  }
};

const BasicUniformsUsageCodeExamples = () => (
  <Toggler
    items={[
      {
        key: 'example',
        tooltipText: 'Toggle example',
        icon: <Box />,
        component: (
          <TabsSelect
            tabs={[
              { name: 'Semantic', value: 'semantic' },
              { name: 'Material', value: 'material' },
              { name: 'Bootstrap3', value: 'bootstrap3' },
              { name: 'Bootstrap4', value: 'bootstrap4' },
              { name: 'AntD', value: 'antd' },
              { name: 'Unstyled', value: 'unstyled' }
            ]}
          >
            {({ value }) => (
              <FormContainer theme={value}>
                {themesToComponents[value]()}
              </FormContainer>
            )}
          </TabsSelect>
        ),
        active: true
      },
      {
        key: 'code',
        tooltipText: 'Toggle form code',
        icon: <IconCode />,
        component: <Code language="js">{formListing}</Code>
      },
      {
        key: 'schema',
        tooltipText: 'Toggle schema code',
        icon: <Database />,
        component: <Code language="js">{schemaListing}</Code>
      }
    ]}
  />
);

export default BasicUniformsUsageCodeExamples;
