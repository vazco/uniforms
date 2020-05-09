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
  children?: ReactNode;
  label?: any;
  labelCol?: string;
  name: string;
  wrapperCol?: any;
};

export default function ListItemField(props: ListItemFieldProps) {
  return (
    <div>
      <div
        style={{
          float: 'right',
          marginBottom: '10px',
          marginLeft: '10px',
          marginRight: '6px',
          width: '20px',
        }}
      >
        <ListDelField className="top aligned" name={props.name} />
      </div>

      <div style={{ marginBottom: '4px', overflow: 'hidden' }}>
        <div
          style={{
            borderBottom: '1px solid #DDD',
            height: '20px',
            marginTop: '-8px',
          }}
        />
      </div>

      <div style={{ width: '100%' }}>
        {props.children ? (
          Children.map(props.children, child =>
            isValidElement(child)
              ? cloneElement(child, {
                  name: joinName(props.name, child.props.name),
                  label: null,
                })
              : child,
          )
        ) : (
          <AutoField {...props} />
        )}
      </div>
    </div>
  );
}
