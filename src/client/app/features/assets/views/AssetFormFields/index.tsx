import s from './styles.module.scss';
import React, { FC } from 'react';
import TextField from "@mui/material/TextField";
import {UiNewAssetForm} from "../../types";

type AssetFormFieldsProps = {
  form: UiNewAssetForm,
  onChange: ({ values, touches }: { values: UiNewAssetForm['values'], touches: UiNewAssetForm['touches'] }) => void
}

export const AssetFormFields = ({ form, onChange }: AssetFormFieldsProps) => {
  const onChangeLocal = (e) => {
    const values = {
      ...form.values,
      [e.target.name]: e.target.value,
    };
    onChange({ values, touches: form.touches })
  }

  const onBlurLocal = (e) => {
    const touches = {
      ...form.touches,
      [e.target.name]: true,
    };
    onChange({ touches, values: form.values })
  }

  return (
    <div>
      <div>
        {JSON.stringify(form, null, 2)}
      </div>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={onChangeLocal} onBlur={onBlurLocal} {...inputProps(form, 'name')} />
    </div>
  );
};

const inputProps = (form, name) => {
  const props = {
    name,
    value: form.values[name],
    error: !!form.errors[name],
    helperText: form.touches[name] || form.isSubmitTouched ? form.errors?.[name]?.[0] : undefined,
  };

  return props
}
