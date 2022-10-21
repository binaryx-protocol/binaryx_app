import s from './NewAssetController.module.scss'
import {useAtomValue, useSetAtom} from "jotai";
import Button from "@mui/material/Button";
import {useEffect} from "react";
import Link from "next/link";
import {paths} from "../../../../../../pkg/paths";
import {useRouter} from "next/router";
import * as assetDetailsModel from "../models/assetDetailsModel";
import * as investAssetModel from "../models/investAssetModel";
import TextField from "@mui/material/TextField";
import {InvestAmountSection} from "../views/InvestAmountSection";

export const InvestController = () => {
  return <InvestAmountSection />
}

const T = {
}
