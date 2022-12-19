import clsx from 'clsx'
import s from "./BaseInput.module.scss";
import React, {useRef} from "react";
import {ListAssetsFormsNames} from "../../../features/assets/types";
import {UiForm} from "../../../../pkg/formType";
//TODO: finish after MVP

// type DropDownProps = {
//   dropDownValuesArray: any[];
// }
//
// const DropDown = (props: DropDownProps) => {
//   const {dropDownValuesArray} = props
//   const [dropDownValue, setDropDownValue] = useState(dropDownValuesArray[0]);
//   const [closeDropdown, setCloseDropdown] = useState(true);
//   const showElem = (value: string) => {
//     // @ts-ignore
//     inputRef.current.value = `${value}`;
//     setCloseDropdown(true);
//   }
//   return (
//     <div>
//       <div>
//         <p>
//           {dropDownValue}
//         </p>
//         <ArrowIconWithoutLine width={15} height={15} classname={s.arrowIcon}/>
//       </div>
//       <div className={clsx(s.option, closeDropdown && s.optionClosed)}>
//         {dropDownValuesArray.map((elem) => (
//           <div key={elem} className={s.optionElem} onClick={() => showElem(elem)}>{elem}</div>
//         ))}
//       </div>
//     </div>
//   )
// }

type InputProps = {
  title: string;
  placeholder: string;
  onChange: (e: HTMLInputElement) => void;
  inputProps: { name: string, value: any, "aria-invalid": any };
  classname?: string
  inputType?: 'number' | 'string';
  //onBlur: any;
  // withDropdown?: boolean;
  // dropDownValuesArray?: any[];
}

export const BaseInput = ((props: InputProps) => {
  const {classname, title, placeholder, onChange, inputProps, inputType = 'string'} = props
  const inputRef = useRef<HTMLInputElement>(null);
  const onlyNumbers = (value: string) => {
    const regExp = /^[0-9\b]+$/;
    if (value === '' || regExp.test(value)) {
      return value;
    } else {
      return ''
    }
  }

  const changeNumberValue = (increment: boolean) => {
    let currentValue = inputRef.current!.value;
    let newValue = increment ? Number(currentValue) + 1 : Number(currentValue) - 1;
    inputRef.current!.value = onlyNumbers(newValue.toString())
    onChange(inputRef.current!)
  }
  return (
    <div className={classname}>
      <p className={s.title}>{title}</p>
      <div className={clsx(s.inputWrapper, inputProps['aria-invalid'] && s.invalidInput)}>
        <input placeholder={placeholder} onChange={(e) => onChange(e.target)} {...inputProps}
               ref={inputRef} className={s.input}/>
        {inputType === 'number' && <div className={s.signs}>
          <div className={s.sign} onClick={() => changeNumberValue(true)}>
            +
          </div>
          <div className={s.sign} onClick={() => changeNumberValue(false)}>
            -
          </div>
        </div>}
      </div>
      {/*{(withDropdown && dropDownValuesArray) && <DropDown dropDownValuesArray={dropDownValuesArray}/>}*/}
    </div>
  )
})
