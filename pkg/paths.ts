export const paths = {
  listAssets() {
    return '/assets-v2';
  },
  newAsset() {
    return '/assets-v2/new';
  },
  showAsset({ id }: { id: string }) {
    return `/assets-v2/${id}`;
  },
  investAsset({ id }: { id: string }) {
    return `/assets-v2/${id}/invest`;
  },
  account() {
    return '/account-v2';
  },
};
