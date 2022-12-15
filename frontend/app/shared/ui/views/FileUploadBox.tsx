import s from './FileUploadBox.module.scss'
import {Button} from "./Button";
import React, {useRef, useState} from "react";
import Image from "next/image";
import {UiForm} from "../../../../pkg/formType";
import {ListAssetsFormsNames} from "../../../features/assets/types";
import {toBase64FilesArray} from "../../../utils/toBase64";
import clsx from "clsx";

type Props = {
  title: string;
  placeholder: string;
  name: string;
  onFileUpload: (formName: ListAssetsFormsNames, form: UiForm<any>, name: string, files: any[]) => void;
  form: UiForm<any>;
  formType: ListAssetsFormsNames;
  classname?: string;
}
export const FileUploadBox = (props: Props) => {
  const {placeholder, onFileUpload, title,name,form,formType, classname = ''} = props
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<File[]>()
  const onFileUploadBrowse = () => {
    // @ts-ignore
    inputFileRef.current.click();
  }
  const onChangeFile = async (e: any) => {
    const fileListArray: File[] = Array.from(e.target.files);
    setFileList(fileListArray)
    const fileArrayString = await toBase64FilesArray(fileListArray);
    onFileUpload(formType, form, name, fileArrayString)
  }

  return (
    <div className={clsx(s.root, classname)}>
      <p className={s.title}>{title}</p>
      <div className={s.uploadWrapper}>
        <div className={s.placeholderWrapper}>
          {fileList && fileList.length ?
            <div className={s.filesWrapper}>
              {fileList.map((file, index) => (
                <div key={index} className={s.chosenFiles}>
                  {file.name}
                </div>
              ))}
            </div>
            : <p className={s.placeholder}>{placeholder}</p>}
        </div>
        <div className={s.browseFilesButton} onClick={onFileUploadBrowse}>
          <Image src={'/feature/assets/upload.svg'} alt={'upload'} width={20} height={20}/>
          <input
            ref={inputFileRef}
            type="file"
            multiple
            className={s.fileInput}
            onChange={(e) => onChangeFile(e)}
          />
        </div>
      </div>
    </div>
  )
}
