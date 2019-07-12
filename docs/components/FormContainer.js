import React, {useState} from 'react';

import SubmittedData from './SubmittedData';

export default function FormContainer({children}) {
  const [data, setData] = useState(null);

  const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, {onSubmit: setData}));

  return (
    <div>
      {childrenWithProps}
      <SubmittedData data={data} />
    </div>
  );
}
