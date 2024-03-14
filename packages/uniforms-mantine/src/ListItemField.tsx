import { List, Group, Box } from '@mantine/core';
import React, { ReactNode } from 'react';
import { connectField } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = { children?: ReactNode; value?: unknown };

function ListItem({
  children = <AutoField label={null} name="" />,
}: ListItemFieldProps) {
  return (
    <List.Item mb={12}>
      <Group spacing="xs" position="apart" noWrap align="flex-start">
        {children}
        <Box mt={4}>
          <ListDelField name="" />
        </Box>
      </Group>
    </List.Item>
  );
}

export default connectField<ListItemFieldProps>(ListItem, {
  initialValue: false,
});
