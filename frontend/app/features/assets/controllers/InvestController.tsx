import {InvestAmountSection} from "../views/InvestAmountSection";
import {useAtomValue} from "jotai";
import {useAccount} from "wagmi";

export const InvestController = () => {
  const {isConnected} = useAccount()

  return isConnected ? <InvestAmountSection /> : <div style={{ padding: '10px', textAlign: 'center' }}>Please connect your wallet first</div>
}

const T = {
}
