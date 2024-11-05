import components from '@theme/MDXComponents';
import React from 'react';

export type CodeSectionProps = {
  language: string;
  replace?: Record<string, string>;
  section?: string;
  source: string | { default: string };
};

export function CodeSection({
  language,
  replace,
  section,
  source,
}: CodeSectionProps) {
  // Unwrap ES module.
  if (typeof source === 'object' && 'default' in source) {
    source = source.default;
  }

  // Cut out only desired section.
  if (section) {
    const pattern = new RegExp(
      `// <${section}>\\s([\\s\\S]*?)\\s// </${section}>\\s`,
      'g',
    );

    source = source
      .split(pattern)
      .reduce(
        (source, part, index) =>
          index % 2 === 0 ? source : `${source}\n\n${part}`,
        '',
      );
  }

  // Remove remaining section tags.
  source = source.replace(/\/\/ <.*?\n/g, '');

  // Replace all mapped things.
  if (replace) {
    for (const [pattern, value] of Object.entries(replace)) {
      source = source.replace(new RegExp(pattern, 'gs'), value);
    }
  }

  // At least one newline is required for non-inline view.
  source = source.trim();
  if (!source.includes('\n')) {
    source += '\n';
  }

  return (
    <components.pre>
      <components.code
        children={source}
        className={`language-${language}`}
        mdxType="code"
        originalType="code"
        parentName="pre"
      />
    </components.pre>
  );
}
