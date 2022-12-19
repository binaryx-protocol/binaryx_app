import s from "./styles.module.scss";
import {UiForm} from "../../../../../../pkg/formType";
import {BaseInput} from "../../../../../shared/ui/views/BaseInput";
import {ListAssetsFormsNames, UiInvestmentReturnForm} from "../../../types";

type Props = {
  investmentReturnForm: UiInvestmentReturnForm;
  inputProps: (form: UiInvestmentReturnForm, name: keyof UiInvestmentReturnForm['values']) => { name: string, value: any, "aria-invalid": any };
  onChangeLocal: (element: HTMLInputElement) => void;

}

export const InvestmentReturnForm = (props: Props) => {
  const {investmentReturnForm, inputProps, onChangeLocal} = props
  return (
    <div className={s.root}>
      <div className={s.headerWrapper}>
        <p className={s.header}>Investments & Return</p>
        <p className={s.headerDescription}>List of documents you need to select:</p>
      </div>
      <div className={s.twoInputs}>
        <BaseInput title={'Token Name'} placeholder={'Token Name'}
                   inputProps={inputProps(investmentReturnForm, 'tokenName')}
                   onChange={onChangeLocal}
                   classname={s.baseInput}/>
        <BaseInput title={'Token Symbol'} placeholder={'Token Symbol'}
                   inputProps={inputProps(investmentReturnForm, 'tokenSymbol')}
                   onChange={onChangeLocal}
                   classname={s.baseInput}/>
      </div>
      <div className={s.twoInputs}>
        <BaseInput title={'Token Price'} placeholder={'Token Price'}
                   inputProps={inputProps(investmentReturnForm, 'tokenPrice')}
                   onChange={onChangeLocal}
                   classname={s.baseInput} inputType={'number'}/>
        <BaseInput title={'Token Amount'} placeholder={'Token Amount'}
                   inputProps={inputProps(investmentReturnForm, 'tokenAmount')}
                   onChange={onChangeLocal}
                   classname={s.baseInput} inputType={'number'}/>
      </div>
      <div className={s.twoInputs}>
        <BaseInput title={'Total Investments'} placeholder={'Total Investments'}
                   inputProps={inputProps(investmentReturnForm, 'totalInvestments')}
                   onChange={onChangeLocal}
                   classname={s.baseInput} inputType={'number'}/>
        <BaseInput title={'Average CoC (Cash on Cash)'} placeholder={'Average CoC (Cash on Cash)'}
                   inputProps={inputProps(investmentReturnForm, 'coc')}
                   onChange={onChangeLocal}
                   classname={s.baseInput} inputType={'number'}/>
      </div>
      <div className={s.twoInputs}>
        <BaseInput title={'Projected Asset Value Appreciation'} placeholder={'Projected Asset Value Appreciation'}
                   inputProps={inputProps(investmentReturnForm, 'projectedAssetValueAppreciation')}
                   onChange={onChangeLocal}
                   classname={s.baseInput} inputType={'number'}/>
        <BaseInput title={'Closing Cost'} placeholder={'Closing Cost'}
                   inputProps={inputProps(investmentReturnForm, 'closingCost')}
                   onChange={onChangeLocal}
                   classname={s.baseInput} inputType={'number'}/>
      </div>
      <BaseInput title={'Underlying Asset Price'} placeholder={'Underlying Asset Price'}
                 inputProps={inputProps(investmentReturnForm, 'underlyingAssetPrice')}
                 onChange={onChangeLocal}
                 inputType={'number'}/>
    </div>
  )
}
