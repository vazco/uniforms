// @ts-nocheck
import {
  createStyles,
  Input,
  List as ListMantine,
  ListProps,
} from '@mantine/core';
import React, { Children, cloneElement, isValidElement } from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import HelpTooltip from '/client/components/HelpTooltip';
import ListAddField from '/client/components/uniforms/base/ListAddField';
import ListItemField from '/client/components/uniforms/base/ListItemField';

const useStyles = createStyles({
  itemWrapper: {
    width: '100%',
  },
});

export type ListFieldProps = FieldProps<
  unknown[],
  ListProps,
  {
    itemProps?: object;
    required?: boolean;
    reversed?: boolean;
    tooltip?: string;
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
  const { classes } = useStyles();

  return (
    <Input.Wrapper
      label={
        tooltip ? (
          <>
            <Input.Label required={required}>{label}</Input.Label>
            <HelpTooltip label={tooltip} />
          </>
        ) : (
          label
        )
      }
      required={tooltip ? false : required}
      error={showInlineError && !!error && errorMessage}
    >
      <ListMantine
        listStyleType="none"
        classNames={{ itemWrapper: classes.itemWrapper }}
        {...filterDOMProps(props)}
      >
        {value?.map((item, itemIndex) =>
          Children.map(children, (child, childIndex) =>
            isValidElement(child)
              ? cloneElement(child, {
                  key: `${itemIndex}-${childIndex}`,
                  /* eslint-disable @typescript-eslint/no-unsafe-assignment -- Just passing through */
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-plus-operands -- Use code snippet from core uniforms
                  name: child.props.name?.replace('$', '' + itemIndex),
                  ...itemProps,
                  /* eslint-enable @typescript-eslint/no-unsafe-assignment -- Just passing through */
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
