import { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import s from './styles.module.scss';
import { TextField } from "@mui/material";
import { Button } from "../../../../shared/ui/views/Button";
import { useAtomValue, useSetAtom } from "jotai";
import * as adminModel from "../../../admin/models/adminModel";
import dayjs, { Dayjs } from "dayjs";
import * as accountModel from "../../../account/models/accountModel";
import { allowanceForRD, approveUSDTForRD } from "../../../admin/models/adminModel";
import { ethers } from "ethers";

type Props = {
  assetId: number;
};

export const AdminPayRent = ({ assetId }: Props) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(new Date()).add(1, 'month'));
  const [amount, setAmount] = useState<number>(0);
  const approveUSDTForRD = useSetAtom(adminModel.approveUSDTForRD);
  const payForRent = useSetAtom(adminModel.payForRent);
  const doLoadAllowanceForRD = useSetAtom(adminModel.doLoadAllowanceForRD);
  const allowanceForRD = useAtomValue(adminModel.allowanceForRD);

  useEffect(() => {
    if (assetId) {
      doLoadAllowanceForRD();
    }
  }, []);

  const onApproveUSDT = () => {
    approveUSDTForRD();
  }

  const onPayForRent = async () => {
    if (!startDate || !endDate || !amount) return;
    const result = await payForRent({ assetId, startDate, endDate, amount });
    console.log(result)
  }
  return (
    <div className={ s.mainView }>
      <div className={ s.dateContainer }>

        <LocalizationProvider dateAdapter={ AdapterDayjs }>
          <DatePicker
            className={ s.datePicker }
            value={ startDate }
            onChange={ (newValue) => {
              setStartDate(newValue);
            } }
            maxDate={ endDate }
            renderInput={ (params) => <TextField { ...params }/> }
          />
          <DatePicker
            className={ s.datePicker }
            value={ endDate }
            onChange={ (newValue) => {
              setEndDate(newValue);
            } }
            minDate={ startDate }
            renderInput={ (params) => <TextField { ...params } /> }
          />
        </LocalizationProvider>
      </div>
      <TextField className={ s.textField } label="USDT Amount" value={ amount }
                 onChange={ (event) => {
                   setAmount(Number(event.target.value))
                 } }/>
      { allowanceForRD?.lte(ethers.utils.parseUnits(String(amount || 0), 6)) ?
        <Button className={ s.button } onClick={ () => {
          onApproveUSDT();
        } }>Approve</Button> :
        <Button className={ s.button } onClick={ () => {
          onPayForRent();
        } }>Add Rent</Button> }
    </div>
  );
};
