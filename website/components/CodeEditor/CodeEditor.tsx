import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react';
import {
  dependencies,
  Bridges,
} from '@site/components/CodeEditor/dependencies';

type CodeEditorProps = {
  files: Record<string, string>;
  bridge: Bridges;
};

export function CodeEditor(props: CodeEditorProps) {
  const { files, bridge } = props;

  return (
    <SandpackProvider
      template="react-ts"
      customSetup={{ dependencies: dependencies[bridge] }}
      files={files}
      options={{
        recompileMode: 'delayed',
        recompileDelay: 800,
      }}
    >
      <SandpackLayout style={{ height: '460px' }}>
        <SandpackCodeEditor
          showTabs
          showInlineErrors
          style={{ height: '100%' }}
        />
        <SandpackPreview style={{ height: '100%' }} />
      </SandpackLayout>
    </SandpackProvider>
  );
}
