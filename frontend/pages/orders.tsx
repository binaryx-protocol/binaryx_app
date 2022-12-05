// @ts-nocheck
import React from 'react';
import { NextPage } from 'next';
import { Request } from 'express';

import { typedQuery } from '../app/apollo-client';
import {ExtractPromiseType} from "../app/types/utils";

export async function getServerSideProps({ req }: { req: Request }) {
  const { data } = await typedQuery(
    { orders: { alias: true, asset: { name: true } } },
    req,
  );

  return {
    props: { user: req.user, orders: data.orders },
  };
}

type Props = ExtractPromiseType<ReturnType<typeof getServerSideProps>>;

const Orders: NextPage<Props['props']> = (props) => {
  return (
    <div>
      <h1>Orders overview</h1>
      {JSON.stringify(props)}
    </div>
  );
};

export default Orders;
