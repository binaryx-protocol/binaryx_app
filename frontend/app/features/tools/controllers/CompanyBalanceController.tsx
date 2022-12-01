import {Container} from "../../../shared/ui/views/Container";
import React from "react";
import {useAtomValue} from "jotai";
import {$usdtBnrxBalance} from "../../../shared/usdtToken/smartContractsFactory";

export const CompanyBalanceController = () => {
  const usdtBnrxBalance = useAtomValue($usdtBnrxBalance)
  console.log('usdtBnrxBalance', usdtBnrxBalance)

  return (
    <Container>
      <h1>Company balance: {usdtBnrxBalance.state === 'hasData' ? usdtBnrxBalance.data : '?'}</h1>
    </Container>
  )
}
