import {InvestAmountSection} from "../views/InvestAmountSection";
import {useAtomValue} from "jotai";
import * as metaMaskModel from "../../../core/models/metaMaskModel";

export const InvestController = () => {
  const isAccountConnected = useAtomValue(metaMaskModel.$isAccountConnected)

  return isAccountConnected ? <InvestAmountSection /> : <div style={{ padding: '10px', textAlign: 'center' }}>Loading</div>
}

const T = {
}
