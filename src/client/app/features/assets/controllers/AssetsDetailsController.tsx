import s from './AssetsDetailsController.module.scss'
import { Gallery } from "../views/Gallery";
import {InvestBlock} from "../views/InvestBlock";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {AssetInfo} from "../views/AssetInfo";
import * as assetDetailsModel from "../models/assetDetailsModel";
import {useAtomValue, useSetAtom} from "jotai";
import {useEffect} from "react";
import {useRouter} from "next/router";

export const AssetsDetailsController = () => {
  const id = parseInt(useRouter().query.id as string);
  const $asset = useAtomValue(assetDetailsModel.$asset)
  const $doLoadAsset = useSetAtom(assetDetailsModel.$doLoadAsset)

  useEffect(() => {
    if (id) {
      $doLoadAsset({ id })
    }
  }, [id])

  if (!$asset) {
    return null // TODO skeleton loader
  }

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
    id,
  }
  const assetInfo = {
    title: $asset.title,
    name: $asset.name,
    symbol: $asset.symbol,
    description: $asset.description,
    legalDocuments: $asset.legalDocuments,
    statusLabel: T.status[$asset.status],
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
  status: {
    1: 'Upcoming',
    2: 'Active',
    3: 'Sold Out',
    4: 'Disabled',
  }
}

