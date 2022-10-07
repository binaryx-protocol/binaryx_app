import s from './AssetsDetailsController.module.scss'
import { Gallery } from "../views/Gallery";
import {InvestBlock} from "../views/InvestBlock";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {AssetInfo} from "../views/AssetInfo";

export const AssetsDetailsController = () => {
  // const $blockchainAssets = useAtomValue(assetsModel.$blockchainAssets)
  // const $doCreateAsset = useSetAtom(assetsModel.$doCreateAsset)
  // const $doActivate = useSetAtom(assetsModel.$doActivate)
  // const $doDisable = useSetAtom(assetsModel.$doDisable)
  // const $walletConnect = useSetAtom(metaMaskModel.$walletConnect)
  // const $walletReadiness = useAtomValue(metaMaskModel.$walletReadiness)
  // const $metaMaskState = useAtomValue(metaMaskModel.$metaMaskState)
  // const blockchainAssets = $blockchainAssets.state === 'hasData' ? $blockchainAssets.data : null

  const images = [
    { src: 'https://ns.clubmed.com/dream/RESORTS_3T___4T/Asie_et_Ocean_indien/Bali/169573-1lng9n8nnf-swhr.jpg' },
    { src: 'https://api.time.com/wp-content/uploads/2022/07/Worlds-Greatest-Places-2022-BaliIndonesia.jpeg' },
    { src: 'https://pix10.agoda.net/hotelImages/234/234432/234432_15121813170038609147.jpg?ca=6&ce=1&s=1024x768' },
    { src: 'https://assets.architecturaldigest.in/photos/60083c58d0435267a8df8fdc/master/w_1920,h_1080,c_limit/Bali-villa-Uluwatu-SAOTA.jpg' },
  ]
  const investInfo = {
    tokensLeft: 12500,
    progress: 23,
    irr: 4,
    coc: 15,
    id: 5,
  }
  const assetInfo = {
    title: 'title',
    country: 'string',
    city: 'string',
    state: 'string',
    postalCode: 'string',
    line1: 'string',
    line2: 'string',
    infoItems: [
      { type: 'string', value: 'string' },
      { type: 'string2', value: 'string2' }
    ],
  }

  return (
    <div className={s.asset}>
      <Gallery images={images} />
      <Container maxWidth="lg">
        <Grid container spacing={0} maxWidth={1600}>
          <Grid item xs={8}>
            <AssetInfo {...assetInfo} />
          </Grid>
          <Grid item xs={3}>
            <InvestBlock {...investInfo} />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

const T = {
}
