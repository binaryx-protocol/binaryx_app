import s from './DragAndDrop.module.scss'
import {Button} from "./Button";
import {useEffect, useRef, useState} from "react";
import {DropTargetMonitor, useDrop} from "react-dnd";
import {NativeTypes} from "react-dnd-html5-backend";
import clsx from "clsx";
import {toBase64FilesArray} from "../../../utils/toBase64";
import {ListAssetsFormsNames} from "../../../features/assets/types";
import {UiForm} from "../../../../pkg/formType";

type Props = {
  title: string;
  name: string;
  onFileUpload: (formName: ListAssetsFormsNames, form: UiForm<any>, name: string, files: any[]) => void;
  form: UiForm<any>;
  formType: ListAssetsFormsNames;
}

export const DragAndDrop = (props: Props) => {
  const {formType, form, title, name, onFileUpload} = props;
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<File[]>()

  const onFileUploadBrowse = () => {
    // @ts-ignore
    inputFileRef.current.click();
  }
  const onChangeFile = async (e: any) => {
    const fileListArray: File[] = Array.from(e.target.files);
    setFileList(fileListArray)
  }
  const [{canDrop, isOver}, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      collect: (monitor: DropTargetMonitor) => {
        const item = monitor.getItem() as any
        if (item) {
          setFileList(item.files)
        }

        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }
      },
    }))
  useEffect(() => {
    if (fileList) {
      const res = async () => {
        const fileArray = await toBase64FilesArray(fileList);
        onFileUpload(formType, form, name, fileArray)
      }
      res()
    }
  }, [fileList])
  const isActive = canDrop && isOver
  return (
    <>
      <p className={s.title}>{title}</p>
      <div className={clsx(s.dragAndDropBox, isActive && s.dragAndDropActive)} ref={drop}>
        {canDrop && isOver ?
          <>
            <p className={s.dragText}>Drop your photo here</p>
          </>
          :
          <>
            <p className={s.dragText}>Drag you photos here to start uploading.</p>
            <p className={s.orText}>Or</p>
            <Button className={s.browseFilesButton} onClick={onFileUploadBrowse}>
              Browse Files
              <input
                ref={inputFileRef}
                type="file"
                multiple
                className={s.fileInput}
                onChange={(e) => onChangeFile(e)}
              />
            </Button>
          </>
        }
      </div>
      {fileList && <div className={s.fileBlock}>
        {fileList.map((file, index) => (
          <div key={index} className={s.fileElem}>
            {file.name}
          </div>
        ))}
      </div>}
    </>
  )
}
