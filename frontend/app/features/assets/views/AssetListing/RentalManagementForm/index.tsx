import s from "./styles.module.scss";
import {UiForm} from "../../../../../../pkg/formType";
import {BaseInput} from "../../../../../shared/ui/views/BaseInput";
import {ListAssetsFormsNames, UiRentalManagementForm} from "../../../types";

type Props = {
  rentalManagementForm: UiRentalManagementForm;
  inputProps: (form: UiRentalManagementForm, name: keyof UiRentalManagementForm['values']) => { name: string, value: any, "aria-invalid": any };
  onChangeLocal: (e: HTMLInputElement) => void;
}

export const RentalManagementForm = (props: Props) => {
  const {rentalManagementForm, inputProps, onChangeLocal} = props
  return (
    <div className={s.root}>
      <div className={s.headerWrapper}>
        <p className={s.header}>Rental & Management</p>
        <p className={s.headerDescription}>List of documents you need to select:</p>
      </div>
      <div className={s.twoInputs}>
        <BaseInput title={'Annual Gross Rent'} placeholder={'Annual Gross Rent'}
                   inputProps={inputProps(rentalManagementForm, 'annualGrossRent')}
                   onChange={onChangeLocal}
                   classname={s.baseInput} inputType={'number'}/>
        <BaseInput title={'Taxes(%)'} placeholder={'Taxes(%)'}
                   inputProps={inputProps(rentalManagementForm, 'taxes')}
                   onChange={onChangeLocal}
                   classname={s.baseInput} inputType={'number'}/>
      </div>
      <div className={s.twoInputs}>
        <BaseInput title={'Insurance(%)'} placeholder={'Insurance(%)'}
                   inputProps={inputProps(rentalManagementForm, 'insurance')}
                   onChange={onChangeLocal}
                   classname={s.baseInput} inputType={'number'}/>
        <BaseInput title={'Property Management(%)'} placeholder={'Property Management(%)'}
                   inputProps={inputProps(rentalManagementForm, 'propertyManagement')}
                   onChange={onChangeLocal}
                   classname={s.baseInput} inputType={'number'}/>
      </div>
      <div className={s.twoInputs}>
        <BaseInput title={'Utilities(%)'} placeholder={'Utilities(%)'}
                   inputProps={inputProps(rentalManagementForm, 'utilities')}
                   onChange={onChangeLocal}
                   classname={s.baseInput} inputType={'number'}/>
        <BaseInput title={'Initial Maintenance Reserve(%)'} placeholder={'Initial Maintenance Reserve(%)'}
                   inputProps={inputProps(rentalManagementForm, 'initialMaintenanceReserve')}
                   onChange={onChangeLocal}
                   classname={s.baseInput} inputType={'number'}/>
      </div>
      <div className={s.twoInputs}>
        <BaseInput title={'Vacancy Reserve(%)'} placeholder={'Vacancy Reserve(%)'}
                   inputProps={inputProps(rentalManagementForm, 'vacancyReserve')}
                   onChange={onChangeLocal}
                   classname={s.baseInput} inputType={'number'}/>
        <BaseInput title={'Listing Fee(%)'} placeholder={'Listing Fee(%)'}
                   inputProps={inputProps(rentalManagementForm, 'listingFee')}
                   onChange={onChangeLocal}
                   classname={s.baseInput} inputType={'number'}/>
      </div>
      <div className={s.twoInputs}>
        <BaseInput title={'LLC Administration Fee(%)'} placeholder={'LLC Administration Fee(%)'}
                   inputProps={inputProps(rentalManagementForm, 'llcAdministrationFee')}
                   onChange={onChangeLocal}
                   classname={s.baseInput} inputType={'number'}/>
        <BaseInput title={'Upfront LLC Fees(%)'} placeholder={'Upfront LLC Fees(%)'}
                   inputProps={inputProps(rentalManagementForm, 'upfrontLlcFees')}
                   onChange={onChangeLocal}
                   classname={s.baseInput} inputType={'number'}/>
      </div>
    </div>
  )
}
