import { CodeEditor } from '@site/components/CodeEditor/CodeEditor';
import { Bridges } from '@site/components/CodeEditor/dependencies';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

type CodeEditorTabsProps = {
  zod: Record<string, string>;
  json: Record<string, string>;
  simple: Record<string, string>;
};

export function CodeEditorTabs(props: CodeEditorTabsProps) {
  const { zod, json, simple } = props;

  return (
    <Tabs>
      <TabItem value="zod" label="Zod" default>
        <CodeEditor bridge={Bridges.Zod} files={zod} />
      </TabItem>
      <TabItem value="json-schema" label="JSON Schema">
        <CodeEditor bridge={Bridges.JSONSchema} files={json} />
      </TabItem>
      <TabItem value="simpl-schema" label="Simple Schema">
        <CodeEditor bridge={Bridges.SimpleSchema} files={simple} />
      </TabItem>
    </Tabs>
  );
}
