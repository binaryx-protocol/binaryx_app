import Property from 'types/Property';
import { gql, useQuery } from '@apollo/client';

type Options = {
  id?: string;
  name?: string;
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

function useDeals(options?: Options): {
  deals: Property[];
  loading: boolean;
  error: any;
} {
  const { id, name } = options || {};
  const { loading, error, data } = useQuery<{ assets: Property[] }>(GET_ASSETS);

  const dealsResult: Property[] = (
    id === undefined && name === undefined
      ? data?.assets
      : data?.assets?.filter(
          (deal) => deal.id?.toString() === id || deal.name === name,
        )
  ) || [];

  return { deals: dealsResult, loading, error };
}

export default useDeals;
