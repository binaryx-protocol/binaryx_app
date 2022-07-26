import React from 'react';
import { NextPage } from 'next';

const Account: NextPage<{ data: string }> = (props) => {
  const { data } = props;

  return (
    <div>
      <h1>Account Page</h1>
      {data}
    </div>
  );
};

export default Account;
