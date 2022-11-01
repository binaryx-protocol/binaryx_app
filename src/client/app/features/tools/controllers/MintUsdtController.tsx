import {Container} from "../../../shared/ui/views/Container";
import React, {useEffect, useState} from "react";
import * as usdtToolModel from "../models/usdtToolModel";
import {useAtomValue, useSetAtom} from "jotai";
import TextField from "@mui/material/TextField";
import { Button } from "shared/ui/views/Button";
import * as metaMaskModel from "../../../core/models/metaMaskModel";
import * as rpcConfigModel from "../../../core/models/rpcConfigModel";
import {UiInputChangeEvent} from "../../../types/globals";

export const MintUsdtController = () => {
  const doWatchUsdtTool = useSetAtom(usdtToolModel.$doWatchUsdtTool)
  const doMint = useSetAtom(usdtToolModel.$doMint)
  const metaMaskState = useAtomValue(metaMaskModel.$metaMaskState)
  const rpcConfig = useAtomValue(rpcConfigModel.$rpcConfig)
  const isAccountConnected = useAtomValue(metaMaskModel.$isAccountConnected)
  const [amount, setAmount ] = useState(100)

  useEffect(() => {
    doWatchUsdtTool()
  }, [])

  const onChangeLocal = (e: UiInputChangeEvent) => {
    setAmount(parseInt(e.target.value))
  }

  const onSubmit = () => {
    doMint({ amount })
  }

  return (
    <Container>
      <h1>Mint USDT (non-production helper)</h1>
      {
        isAccountConnected
          ? (
            <>
              <TextField label="USDT amount ($)" variant="outlined" onChange={onChangeLocal} type="number" value={amount} />
              <div style={{ padding: '10px 0 0 0' }}>
                <Button onClick={onSubmit}>
                  Mint {amount}.00$ for {metaMaskState.values.accounts?.[0]}
                </Button>
              </div>
              <div style={{ color: "#afafaf", padding: '15px 0 0 0' }}>
                <small>
                  Note: using USDT smart contract at: {rpcConfig?.usdtL2Address}
                </small>
              </div>
            </>
          )
          : "Please connect your wallet first"
      }

    </Container>
  )
}
