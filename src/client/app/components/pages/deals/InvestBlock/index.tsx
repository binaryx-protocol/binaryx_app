import React, { FC, useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import mainContractService from "services/mainContractService";
import useDeals from "hooks/useDeals";
import s from "./styles.module.scss";
import { useRouter } from "next/router";

const InvestBlock: FC = () => {
  const { deals } = useDeals();
  const { id } = useRouter().query;
  const item = deals?.find((deal) => deal.id === id);
  const [totalSupply, setTotalSupply] = useState("0");
  const [tokensLeft, setTokensLeft] = useState("0");

  useEffect(() => {
    fetchTotalSupply();
    fetchTokensLeft();
  }, []);

  async function fetchTotalSupply() {
    const totalSupply = await mainContractService.ft_total_supply();
    totalSupply && setTotalSupply(totalSupply);
  }

  async function fetchTokensLeft() {
    const tokensLeft = await mainContractService.ft_balance_of({
      account_id: mainContractService.getContractAccountId(),
    });
    tokensLeft && setTokensLeft(tokensLeft);
  }

  if (!item) {
    return null;
  }

  function handleInvestClick() {
    mainContractService.handleInvest();
  }

  const tokensLeftInt = parseInt(tokensLeft);
  const totalSupplyInt = parseInt(totalSupply);
  const tokensLeftPercentage = (tokensLeftInt * 100) / totalSupplyInt;
  const progress = 100 - tokensLeftPercentage;

  return (
    <div className={s.investBlock}>
      <div className={s.progress}>
        <LinearProgress
          variant="buffer"
          valueBuffer={100}
          value={progress}
          className={s.progressBar}
        />
        <div className={s.progressValues}>
          <span className={s.progressValue}>{progress}%</span>
          <span className={s.tokensLeft}>{tokensLeft} tokens left</span>
        </div>
      </div>
      <div className={s.info}>
        <div className={s.infoItem}>
          <span className={s.infoItemTitle}>Projected IRR</span>
          <span className={s.infoItemValue}>{item.irr}</span>
        </div>
        <div className={s.infoItem}>
          <span className={s.infoItemTitle}>Projected IRR</span>
          <span className={s.infoItemValue}>{item.coc}</span>
        </div>
      </div>
      <div className={s.invest}>
        <button className={s.investButton} onClick={handleInvestClick}>
          INVEST
        </button>
      </div>
    </div>
  );
};

export default InvestBlock;
