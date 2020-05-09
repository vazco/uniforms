import React, {
  Children,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import { joinName } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = {
  name: string;
  children?: ReactNode;
};

export default function ListItemField(props: ListItemFieldProps) {
  const { children, name } = props;
  return (
    <div className="item">
      <ListDelField className="top aligned" name={name} />

      <div className="middle aligned content" style={{ width: '100%' }}>
        {children ? (
          Children.map(props.children, child =>
            isValidElement(child)
              ? cloneElement(child, {
                  name: joinName(props.name, child.props.name),
                  label: null,
                  style: {
                    margin: 0,
                    ...child.props.style,
                  },
                })
              : child,
          )
        ) : (
          <AutoField {...props} style={{ margin: 0 }} />
        )}
      </div>
    </div>
  );
}
