import React, { ReactNode } from 'react';
import { connectField } from 'uniforms';
import { List, Group, Box } from '@mantine/core';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = { children?: ReactNode; value?: unknown };

function ListItem({
  children = <AutoField label={null} name="" />,
}: ListItemFieldProps) {
  return (
    <List.Item mb={12}>
      <Group mt="xs" align="center">
        {children}
        <Box mt={16}>
          <ListDelField name="" />
        </Box>
      </Group>
    </List.Item>
  );
}

export default connectField<ListItemFieldProps>(ListItem, {
  initialValue: false,
});
