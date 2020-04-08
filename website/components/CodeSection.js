import React from 'react';
import components from '@theme/MDXComponents';

export default function CodeSection({ language, replace, section, source }) {
  // Unwrap ES module.
  if (typeof source === 'object' && 'default' in source) {
    source = source.default;
  }

  // Cut out only desired section.
  if (section) {
    const pattern = new RegExp(
      `// <${section}>\\s(.*?)\\s// </${section}>\\s`,
      'gs'
    );

    source = source
      .split(pattern)
      .reduce(
        (source, part, index) =>
          index % 2 === 0 ? source : `${source}\n\n${part}`,
        ''
      );
  }

  // Remove remaining section tags.
  source = source.replace(/\/\/ <.*?\n/g, '');

  // Replace all mapped things.
  if (replace)
    for (const [pattern, value] of Object.entries(replace))
      source = source.replace(new RegExp(pattern, 'gs'), value);

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
