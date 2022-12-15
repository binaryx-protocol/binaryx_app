import s from './styles.module.scss'
import {BaseInput} from "../../../../../shared/ui/views/BaseInput";
import {LandType, ListAssetsFormsNames, Occupation, PropertyType} from "../../../types";
import {BaseSelect} from "../../../../../shared/ui/views/BaseSelect";
import {BaseSwitcher} from "../../../../../shared/ui/views/BaseSwitcher";
import {TextArea} from "../../../../../shared/ui/views/TextArea";
import {DragAndDrop} from "../../../../../shared/ui/views/DragAndDrop";
import {UiForm} from "../../../../../../pkg/formType";
import countryList from 'react-select-country-list'
import clsx from "clsx";

type Props = {
  onChangeLocal: (formName: ListAssetsFormsNames, form: UiForm<any>, e: HTMLInputElement) => void;
  generalInfoForm: UiForm<any>;
  onFileUpload: (formName: ListAssetsFormsNames, form: UiForm<any>, name: string, files: string[]) => void;
  inputProps: (form: UiForm<any>, name: string) => { name: string, value: any, "aria-invalid": string[] | undefined };
  onClickLocal: (formName: ListAssetsFormsNames, form: UiForm<any>, name: string, value: string) => void;
}
export const GeneralInformationForm = (props: Props) => {
  const {onChangeLocal, generalInfoForm, inputProps, onClickLocal, onFileUpload} = props
  const landTypesArray = Object.values(LandType)
  const propertyTypesArray = Object.values(PropertyType)

  return (
    <div className={s.root}>
      <div className={s.headerWrapper}>
        <p className={s.header}>General Information</p>
        <p className={s.headerDescription}>First, we need to know a little more about your property.</p>
      </div>
      <BaseInput title={'Property Name +'} placeholder={'Property name'}
                 inputProps={inputProps(generalInfoForm, 'title')}
                 onChange={onChangeLocal}
                 form={generalInfoForm}
                 formType={ListAssetsFormsNames.generalInfoForm}
      />
      <div className={s.twoInputs}>
        <BaseSelect placeholder={'Select Item'} title={'Land Type +'} optionArray={landTypesArray}
                    onChange={onChangeLocal}
                    form={generalInfoForm}
                    formType={ListAssetsFormsNames.generalInfoForm}
                    inputProps={inputProps(generalInfoForm, 'landType')} classname={s.baseSelect}/>

        <BaseInput title={'Land Area +'} placeholder={'Enter area'}
                   inputProps={inputProps(generalInfoForm, 'landArea')}
                   onChange={onChangeLocal}
                   form={generalInfoForm}
                   formType={ListAssetsFormsNames.generalInfoForm}
                   classname={s.baseInput}/>

      </div>
      <div className={s.twoInputs}>
        <BaseSelect placeholder={'Select Item'} title={'Property Type +'} optionArray={propertyTypesArray}
                    onChange={onChangeLocal}
                    form={generalInfoForm}
                    formType={ListAssetsFormsNames.generalInfoForm}
                    inputProps={inputProps(generalInfoForm, 'propertyType')} classname={s.baseSelect}/>

        <BaseInput title={'Property Area +'} placeholder={'Enter area'}
                   inputProps={inputProps(generalInfoForm, 'propertyArea')}
                   onChange={onChangeLocal}
                   form={generalInfoForm}
                   formType={ListAssetsFormsNames.generalInfoForm}
                   classname={s.baseInput}/>

      </div>
      <div className={s.textArea}>
        <TextArea placeholder={'Description'} title={'Description'} name={'description'}
                  onChange={(e: any) => onChangeLocal(ListAssetsFormsNames.generalInfoForm, generalInfoForm, e.target)}/>
      </div>
      <div className={s.fourInputs}>
        <BaseInput title={'Beds'} placeholder={'Beds'}
                   inputProps={inputProps(generalInfoForm, 'beds')}
                   onChange={onChangeLocal}
                   form={generalInfoForm}
                   formType={ListAssetsFormsNames.generalInfoForm}
                   classname={s.baseInput} inputType={'number'}/>
        <BaseInput title={'Bedrooms'} placeholder={'Bedrooms'}
                   inputProps={inputProps(generalInfoForm, 'bedrooms')}
                   onChange={onChangeLocal}
                   form={generalInfoForm}
                   formType={ListAssetsFormsNames.generalInfoForm}
                   classname={s.baseInput} inputType={'number'}/>
        <BaseInput title={'Rooms Total'} placeholder={'Rooms Total'}
                   inputProps={inputProps(generalInfoForm, 'roomsTotal')}
                   onChange={onChangeLocal}
                   form={generalInfoForm}
                   formType={ListAssetsFormsNames.generalInfoForm}
                   classname={s.baseInput} inputType={'number'}/>
        <BaseInput title={'Kitchens'} placeholder={'Kitchens'}
                   inputProps={inputProps(generalInfoForm, 'kitchens')}
                   onChange={onChangeLocal}
                   form={generalInfoForm}
                   formType={ListAssetsFormsNames.generalInfoForm}
                   classname={s.baseInput} inputType={'number'}/>
      </div>
      <div className={s.fourInputs}>
        <BaseInput title={'Living Rooms'} placeholder={'Living Rooms'}
                   inputProps={inputProps(generalInfoForm, 'livingRooms')}
                   onChange={onChangeLocal}
                   form={generalInfoForm}
                   formType={ListAssetsFormsNames.generalInfoForm}
                   classname={s.baseInput} inputType={'number'}/>
        <BaseInput title={'Terraces'} placeholder={'Terraces'}
                   inputProps={inputProps(generalInfoForm, 'terraces')}
                   onChange={onChangeLocal}
                   form={generalInfoForm}
                   formType={ListAssetsFormsNames.generalInfoForm}
                   classname={s.baseInput} inputType={'number'}/>
        <BaseInput title={'Balconies'} placeholder={'Balconies'}
                   inputProps={inputProps(generalInfoForm, 'balconies')}
                   onChange={onChangeLocal}
                   form={generalInfoForm}
                   formType={ListAssetsFormsNames.generalInfoForm}
                   classname={s.baseInput} inputType={'number'}/>
        <BaseInput title={'Garages'} placeholder={'Garages'}
                   inputProps={inputProps(generalInfoForm, 'garages')}
                   onChange={onChangeLocal}
                   form={generalInfoForm}
                   formType={ListAssetsFormsNames.generalInfoForm}
                   classname={s.baseInput} inputType={'number'}/>
      </div>
      <div className={s.twoInputs}>
        <BaseInput title={'Bathrooms'} placeholder={'Bathrooms'}
                   inputProps={inputProps(generalInfoForm, 'bathrooms')}
                   onChange={onChangeLocal}
                   form={generalInfoForm}
                   formType={ListAssetsFormsNames.generalInfoForm}
                   classname={s.baseInput} inputType={'number'}/>

        <BaseSwitcher leftTitle={Occupation.occupied} rightTitle={Occupation.notOccupied} form={generalInfoForm}
                      formType={ListAssetsFormsNames.generalInfoForm} name={'occupation'} onSwitch={onClickLocal}
                      title={'Occupation'} classname={s.switcher}/>
      </div>
      <div className={s.dragAndDrop}>
        <DragAndDrop title={'Property images'} name={'images'}
                     onFileUpload={onFileUpload}
                     form={generalInfoForm}
                     formType={ListAssetsFormsNames.generalInfoForm}/>
      </div>
      <div className={clsx(s.headerWrapper, s.headerSecond)}>
        <p className={s.header}>Address</p>
        <p className={s.headerDescription}>Secondly, we need to find out where your property is located.</p>
      </div>
      <BaseSelect placeholder={'Choose Country'} title={'Choose Country'} optionArray={countryList().getLabels()}
                  onChange={onChangeLocal}
                  form={generalInfoForm}
                  formType={ListAssetsFormsNames.generalInfoForm}
                  inputProps={inputProps(generalInfoForm, 'country')} classname={s.baseSelect}/>

      <div className={s.twoInputs}>
        <BaseInput title={'State'} placeholder={'State'}
                   inputProps={inputProps(generalInfoForm, 'state')}
                   onChange={onChangeLocal}
                   form={generalInfoForm}
                   formType={ListAssetsFormsNames.generalInfoForm}
                   classname={s.baseInput}/>
        <BaseInput title={'City'} placeholder={'City'}
                   inputProps={inputProps(generalInfoForm, 'city')}
                   onChange={onChangeLocal}
                   form={generalInfoForm}
                   formType={ListAssetsFormsNames.generalInfoForm}
                   classname={s.baseInput}/>

      </div>
      <div className={s.twoInputs}>
        <BaseInput title={'Postal Code'} placeholder={'Postal Code'}
                   inputProps={inputProps(generalInfoForm, 'postalCode')}
                   onChange={onChangeLocal}
                   form={generalInfoForm}
                   formType={ListAssetsFormsNames.generalInfoForm}
                   classname={s.baseInput}/>
        <BaseInput title={'Address'} placeholder={'Address'}
                   inputProps={inputProps(generalInfoForm, 'address')}
                   onChange={onChangeLocal}
                   form={generalInfoForm}
                   formType={ListAssetsFormsNames.generalInfoForm}
                   classname={s.baseInput}/>

      </div>
      <div className={s.twoInputs}>
        <BaseInput title={'Coordinates (Longitude)'} placeholder={'Coordinates (Longitude)'}
                   inputProps={inputProps(generalInfoForm, 'longitude')}
                   onChange={onChangeLocal}
                   form={generalInfoForm}
                   formType={ListAssetsFormsNames.generalInfoForm}
                   classname={s.baseInput}/>
        <BaseInput title={'Coordinates (Latitude)'} placeholder={'Coordinates (Latitude)'}
                   inputProps={inputProps(generalInfoForm, 'latitude')}
                   onChange={onChangeLocal}
                   form={generalInfoForm}
                   formType={ListAssetsFormsNames.generalInfoForm}
                   classname={s.baseInput}/>

      </div>
    </div>
  )
}
