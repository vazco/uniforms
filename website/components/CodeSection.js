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
      `^.*// <${section}>\\s(.*?)\\s// </${section}>\\s.*$`,
      's'
    );

    source = source.replace(pattern, '$1');
  }

  const pattern = new RegExp(`// <.*?\\n`, 'gm');
  source = source.replace(pattern, '');

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
