/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import useAssets from 'hooks/useAssets';
import { useRouter } from 'next/router';

const Item = ({ item, onClick }: any) => {
  const progress = 100 - (item.tokensLeft * 100) / item.tokenTotalSupply;

  return (
    <div
      css={css`
        color: #262b38;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.8);
        padding: 16px;
        border-radius: 15px;
        backdrop-filter: blur(10px) saturate(2);
        box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
      `}
      onClick={onClick}
    >
      <img
        src={item.images?.images?.[0]?.src}
        width={350}
        height={300}
        css={css`
          max-width: 100%;
          border-radius: 5px;
          box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
        `}
      />
      <Typography
        css={css`
          font-size: 0.9rem;
          display: flex;
        `}
        variant="h5"
        component="h3"
      >
        <span>{item.title}</span>
        <span
          css={css`
            margin-left: auto;
            color: var(--secondary);
          `}
        >
          {item.irr}% IRR
        </span>
      </Typography>
      <Typography
        css={css`
          font-size: 0.7rem;
          display: flex;
        `}
        variant="body1"
      >
        {item.line1} {item.line2}
        <span
          css={css`
            margin-left: auto;
            color: #586280;
          `}
        >
          {item.coc}% CoC
        </span>
      </Typography>
      <Typography
        css={css`
          font-size: 0.6rem;
        `}
        variant="body2"
      >
        {item.city}, {item.state} {item.postalCode} {item.country}
      </Typography>
      <LinearProgress
        variant="buffer"
        value={progress}
        css={css`
          margin: 10px 0;
          padding: 3px 0;
          border-radius: 3px;
        `}
      />
      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <span
          css={css`
            color: var(--secondary);
            font-size: 0.65rem;
          `}
        >
          {progress}%
        </span>
        <span
          css={css`
            color: #586280;
            font-size: 0.65rem;
          `}
        >
          {item.tokensLeft} tokens left
        </span>
      </div>
    </div>
  );
};

const Marketplace = () => {
  const router = useRouter();
  const { assets = [] } = useAssets();

  function handleItemClick(item: any) {
    router.push(`/assets/${item.id}`);
  }

  return (
    <div
      css={css`
        padding: 32px;
        background: linear-gradient(
          253.14deg,
          rgba(37, 122, 215, 0.05) 65.26%,
          rgba(1, 248, 235, 0.05) 93.3%
        );
        font-size: 24px;
        height: calc(100vh - 95px);
      `}
    >
      <Container maxWidth="xl">
        <Typography
          css={css`
            color: #262b38;
            padding: 20px 0 40px;
            font-weight: 500;
            font-size: 2.5rem;
          `}
          variant="h2"
          component="h2"
        >
          Marketplace
        </Typography>
        <Grid container spacing={4}>
          {assets?.map((item) => (
            <Grid key={item.id} item xs={3}>
              <Item
                key={item.id}
                item={item}
                onClick={() => handleItemClick(item)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Marketplace;
