import { Input, List as ListMantine, ListProps, Tooltip } from '@mantine/core';
import React, { Children, cloneElement, isValidElement } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type ListFieldProps = FieldProps<
  unknown[],
  ListProps,
  {
    itemProps?: object;
    required?: boolean;
    reversed?: boolean;
    tooltip?: string;
    children?:
      | React.ReactElement<{ name?: string }>
      | React.ReactElement<{ name?: string }>[];
  }
>;

function List({
  children = <ListItemField name="$" />,
  error,
  errorMessage,
  itemProps,
  label,
  required,
  showInlineError,
  value,
  tooltip,
  ...props
}: ListFieldProps) {
  return (
    <Input.Wrapper
      mb="xs"
      label={
        tooltip ? (
          <>
            <Input.Label required={required}>{label}</Input.Label>
            {tooltip && <Tooltip label={tooltip}>{tooltip}</Tooltip>}
          </>
        ) : (
          label
        )
      }
      required={tooltip ? false : required}
      error={showInlineError && !!error && errorMessage}
    >
      <ListMantine listStyleType="none" w="100%" {...filterDOMProps(props)}>
        {value?.map((item, itemIndex) =>
          Children.map(children, (child, childIndex) =>
            isValidElement(child)
              ? cloneElement(child, {
                  key: `${itemIndex}-${childIndex}`,
                  name: child.props.name?.replace('$', '' + itemIndex),
                  ...itemProps,
                })
              : child,
          ),
        )}
        <ListAddField name="$" />
      </ListMantine>
    </Input.Wrapper>
  );
}

export default connectField<ListFieldProps>(List);
