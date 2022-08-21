import Property from 'types/Property';
import { gql, useQuery } from '@apollo/client';
import AssetContract from '../contracts/AssetContract';
import { useEffect } from 'react';

type Options = {
  id?: string;
  name?: string;
  contractId?: string;
};

const GET_ASSETS = gql`
  query GetAssets {
    assets {
      id
      name
      title
      contractId
      country
      state
      city
      postalCode
      line1
      line2
      tokenPrice
      tokenTotalSupply
      tokensLeft
      coc
      irr
      infoItems
      images
    }
  }
`;

function useAssets(options?: Options): {
  assets: Property[];
  loading: boolean;
  error: any;
} {
  const { id, name, contractId } = options || {};
  const { loading, error, data } = useQuery<{ assets: Property[] }>(GET_ASSETS);

  const assetsResult: Property[] = (
    id === undefined && name === undefined && contractId === undefined
      ? data?.assets
      : data?.assets?.filter(
          (asset) => asset.id?.toString() === id || asset.name === name || asset.contractId === contractId,
        )
  ) || [];

  return { assets: assetsResult, loading, error };
}

export default useAssets;
