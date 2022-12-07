import {Container} from "../../../shared/ui/views/Container";
import React, {useEffect, useState} from "react";
import * as usdtToolModel from "../models/usdtToolModel";
import {useAtomValue, useSetAtom} from "jotai";
import TextField from "@mui/material/TextField";
import { Button } from "shared/ui/views/Button";
import {UiInputChangeEvent} from "../../../types/globals";
import {$usdtBalance} from "../../../shared/usdtToken/smartContractsFactory";
import {useAccount, useNetwork} from "wagmi";
import {CHAIN_INFO, getActiveConfig, SupportedChainId} from "../../../shared/walletsConnect";

export const MintUsdtController = () => {
  const doMint = useSetAtom(usdtToolModel.$doMint)
  const usdtBalance = useAtomValue($usdtBalance)
  const [amount, setAmount ] = useState(100)
  const {isConnected, address} = useAccount()
  const {chain} = useNetwork()
  const balance = usdtBalance.state === 'hasData' ? usdtBalance.data : 0;
  const chainInfo = getActiveConfig();
  const onChangeLocal = (e: UiInputChangeEvent) => {
    setAmount(parseInt(e.target.value))
  }

  const onSubmit = () => {
    doMint({ amount })
  }

  return (
    <Container>
      <h1>Your USDT balance: {balance}</h1>
      <h3>Mint USDT (non-production helper)</h3>
      {
        isConnected
          ? (
            <>
              <TextField label="USDT amount ($)" variant="outlined" onChange={onChangeLocal} type="number" value={amount} />
              <div style={{ padding: '10px 0 0 0' }}>
                <Button onClick={onSubmit}>
                  Mint {amount}.00$ for {address}
                </Button>
              </div>
              <div style={{ color: "#afafaf", padding: '15px 0 0 0' }}>
                <small>
                  Note: using USDT smart contract at: {chainInfo?.contractsAddresses.usdtL2Address}
                </small>
              </div>
            </>
          )
          : "Please connect your wallet first"
      }

    </Container>
  )
}
