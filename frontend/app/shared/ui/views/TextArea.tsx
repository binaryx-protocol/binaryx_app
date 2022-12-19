import s from './TextArea.module.scss'
import React, {useCallback} from "react";
import debounce from "lodash.debounce";
import clsx from "clsx";

type Props = {
  placeholder: string;
  name: string;
  title: string;
  onChange: any;
  inputProps: { name: string, value: any, "aria-invalid": any };
}
export const TextArea = (props: Props) => {
  const {placeholder, title, onChange, name, inputProps} = props;
  const debouncedChangeHandler = useCallback(
     debounce(onChange, 1000)
    , []);
  return (
    <div>
      <p className={s.title}>{title}</p>
      <textarea className={clsx(s.textArea, inputProps['aria-invalid'] && s.invalidInput)} placeholder={placeholder}
                onChange={debouncedChangeHandler}
                name={name} aria-invalid={inputProps['aria-invalid']}/>
    </div>
  )
}
