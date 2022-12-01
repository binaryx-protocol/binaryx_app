// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export const paths = {
  home() {
    return '/';
  },
  listAssets() {
    return '/assets-v2';
  },
  newAsset() {
    return '/assets-v2/new';
  },
  showAsset({ id }) {
    return `/assets-v2/${id}`;
  },
  investAsset({ id }) {
    return `/assets-v2/${id}/invest`;
  },
  account() {
    return '/account-v2';
  },
};
