export const paths = {
  listAssets() {
    return '/assets-v2'
  },
  newAsset() {
    return '/assets-v2/new'
  },
  showAsset({ id }) {
    return `/assets-v2/${id}`
  },
}
