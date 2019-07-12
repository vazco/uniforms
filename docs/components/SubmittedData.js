import React from 'react';

import './SubmittedData.css';

export default function SubmittedData({data}) {
  return (
    <div className="SubmittedData">
      <h4>Submitted data:</h4>
      <pre>{data && JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
