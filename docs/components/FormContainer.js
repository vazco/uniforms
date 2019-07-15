import React, { useState } from 'react';

import FrameWrapper from './FrameWrapper';
import SubmittedData from './SubmittedData';

export default function FormContainer({ children, theme }) {
  const [data, setData] = useState(null);

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { onSubmit: setData })
  );

  return (
    <div>
      <FrameWrapper theme={theme}>
        {childrenWithProps}
        <SubmittedData data={data} />
      </FrameWrapper>
    </div>
  );
}
