import { CodeEditor } from '@site/components/CodeEditor/CodeEditor';
import { Bridges } from '@site/components/CodeEditor/dependencies';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

type CodeEditorTabs = {
  tabs: {
    label: string;
    value: string;
    files: Record<string, string>;
  }[];
};

export function CodeEditorTabs(props: CodeEditorTabs) {
  const { tabs } = props;

  return (
    <Tabs>
      {tabs.map(({ label, value, files }, index) => (
        <TabItem key={value} value={value} label={label} default={index === 0}>
          <CodeEditor bridge={Bridges.Zod} files={files} />
        </TabItem>
      ))}
    </Tabs>
  );
}
