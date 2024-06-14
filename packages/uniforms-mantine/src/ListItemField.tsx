import { List, Group, Box } from '@mantine/core';
import React, { ReactNode } from 'react';
import { connectField } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = { children?: ReactNode; value?: unknown };

function ListItem({
  children = <AutoField label={null} name="" style={{ width: '100%' }} />,
}: ListItemFieldProps) {
  return (
    <List.Item
      mb={12}
      styles={{ itemLabel: { width: '100%' }, itemWrapper: { width: '100%' } }}
      pos="relative"
    >
      <Group mt="xs" align="flex-start" w="100%">
        {children}
        <Box pos="absolute" right={0} top={10}>
          <ListDelField name="" />
        </Box>
      </Group>
    </List.Item>
  );
}

export default connectField<ListItemFieldProps>(ListItem, {
  initialValue: false,
});
