// @ts-nocheck

import React from 'react';
import { NextPage } from 'next';
import { Request } from 'express';
import {ExtractPromiseType} from "../app/types/utils";

export async function getServerSideProps({ req }: { req: Request }) {
  return {
    props: { user: req.user },
  };
}

type Props = ExtractPromiseType<ReturnType<typeof getServerSideProps>>;

const Profile: NextPage<Props['props']> = (props) => {
  const { user } = props;

  return <h1>Profile {JSON.stringify(user)}</h1>;
};

export default Profile;
