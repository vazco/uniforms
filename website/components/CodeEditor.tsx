import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react';

type CodeEditorProps = {
  files: Record<string, string>;
  dependencies?: Record<string, string>;
};

const example = {
  '/App.js': `import { AutoForm } from 'uniforms-mui';
import { ZodBridge } from 'uniforms-bridge-zod';
import { z } from 'zod';

const userSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});

const schema = new ZodBridge({ schema: userSchema });

export default function App() {
  return (
    <AutoForm
      schema={schema}
      onSubmit={model => window.alert(JSON.stringify(model, null, 2))}
    />
  );
}`,
};

const defaultDependencies = {
  '@mui/material': '^6',
  '@emotion/react': '^11',
  '@emotion/styled': '^11',
  antd: '^5',
  uniforms: '4.0.0-beta.2',
  'uniforms-mui': '4.0.0-beta.2',
  'uniforms-bridge-zod': '4.0.0-beta.2',
  zod: '^3',
};

export function CodeEditor(props: CodeEditorProps) {
  const { files = example, dependencies = defaultDependencies } = props;

  return (
    <SandpackProvider
      template="react"
      customSetup={{ dependencies }}
      files={files}
      options={{
        recompileMode: 'delayed',
        recompileDelay: 800,
      }}
    >
      <SandpackLayout style={{ height: '460px' }}>
        {/* <SandpackFileExplorer /> */}
        <SandpackCodeEditor
          // showTabs
          showInlineErrors
          style={{ height: '100%' }}
        />
        <SandpackPreview style={{ height: '100%' }} />
      </SandpackLayout>
    </SandpackProvider>
  );
}
