import s from "./styles.module.scss";
import {ListAssetsFormsNames} from "../../../types";
import {UiForm} from "../../../../../../pkg/formType";
import {FileUploadBox} from "../../../../../shared/ui/views/FileUploadBox";

type Props = {
  legalInfoForm: UiForm<any>;
  onFileUpload: (formName: ListAssetsFormsNames, form: UiForm<any>, name: string, files: string[]) => void;
}

export const LegalInfoForm = (props: Props) => {
  const {legalInfoForm, onFileUpload} = props
  return (
    <div className={s.root}>
      <div className={s.headerWrapper}>
        <p className={s.header}>Legal Info</p>
        <p className={s.headerDescription}>List of documents you need to select:</p>
      </div>
      <div className={s.twoInputs}>
        <FileUploadBox title={'Sale Documents'} onFileUpload={onFileUpload} placeholder={'Upload Sale Documents'}
                       form={legalInfoForm} formType={ListAssetsFormsNames.legalInfoForm} name={'saleDocuments'}/>
        <FileUploadBox title={'Agreement of Intent'} onFileUpload={onFileUpload}
                       placeholder={'Upload Agreement of Intent'}
                       form={legalInfoForm} formType={ListAssetsFormsNames.legalInfoForm} name={'agreementIntent'}
                       classname={s.fileUploadInput}/>
      </div>
      <div className={s.twoInputs}>
        <FileUploadBox title={'Selling Agreement'} onFileUpload={onFileUpload} placeholder={'Upload Selling Agreement'}
                       form={legalInfoForm} formType={ListAssetsFormsNames.legalInfoForm} name={'sellingAgreement'}/>
        <FileUploadBox title={'LLC & Property Documents'} onFileUpload={onFileUpload}
                       placeholder={'Upload LLC & Property Documents'}
                       form={legalInfoForm} formType={ListAssetsFormsNames.legalInfoForm} name={'llcPropertyDocuments'}
                       classname={s.fileUploadInput}/>
      </div>
      <div className={s.twoInputs}>
        <FileUploadBox title={'Ownership Agreement'} onFileUpload={onFileUpload} placeholder={'Upload Ownership Agreement'}
                       form={legalInfoForm} formType={ListAssetsFormsNames.legalInfoForm} name={'ownershipAgreement'}/>
        <FileUploadBox title={'Tokenization Agreement'} onFileUpload={onFileUpload}
                       placeholder={'Upload Tokenization Agreement'}
                       form={legalInfoForm} formType={ListAssetsFormsNames.legalInfoForm} name={'tokenizationAgreement'}
                       classname={s.fileUploadInput}/>
      </div>
      <div className={s.twoInputs}>
        <FileUploadBox title={'LLC Formation Document'} onFileUpload={onFileUpload} placeholder={'Upload LLC Formation Document'}
                       form={legalInfoForm} formType={ListAssetsFormsNames.legalInfoForm} name={'llcFormationDocument'}/>
        <FileUploadBox title={'Notary\'s conclusion'} onFileUpload={onFileUpload}
                       placeholder={'Upload Notary\'s conclusion'}
                       form={legalInfoForm} formType={ListAssetsFormsNames.legalInfoForm} name={'notaryConclusion'}
                       classname={s.fileUploadInput}/>
      </div>
      <div className={s.twoInputs}>
        <FileUploadBox title={'Management Documents'} onFileUpload={onFileUpload} placeholder={'Upload Management Documents'}
                       form={legalInfoForm} formType={ListAssetsFormsNames.legalInfoForm} name={'managementDocuments'}/>
        <FileUploadBox title={'Rental Agreement'} onFileUpload={onFileUpload}
                       placeholder={'Upload Rental Agreement'}
                       form={legalInfoForm} formType={ListAssetsFormsNames.legalInfoForm} name={'rentalAgreement'}
                       classname={s.fileUploadInput}/>
      </div>
    </div>
  )
}
