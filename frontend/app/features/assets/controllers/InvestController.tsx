import {InvestAmountSection} from "../views/InvestAmountSection";
import {useAtomValue} from "jotai";
import {useAccount} from "wagmi";

export const InvestController = () => {
  const {address} = useAccount()

  return address ? <InvestAmountSection /> : <div style={{ padding: '10px', textAlign: 'center' }}>Please connect your wallet first</div>
}
