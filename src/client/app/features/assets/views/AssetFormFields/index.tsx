import s from './styles.module.scss';
import React, {ChangeEvent, ChangeEventHandler, SyntheticEvent} from 'react';
import TextField from "@mui/material/TextField";
import {UiNewAssetForm} from "../../types";
import Box from "@mui/material/Box";
import {UiInputChangeEvent} from "../../../../types/globals";
import {UiForm} from "../../../../../../../pkg/formType";
import {BaseInput} from "../../../../shared/ui/views/BaseInput";

type AssetFormFieldsProps = {
  form: UiNewAssetForm,
  onChange: ({ values, touches }: { values: UiNewAssetForm['values'], touches: UiNewAssetForm['touches'] }) => void
}

export const AssetFormFields = ({ form, onChange }: AssetFormFieldsProps) => {
  const onChangeLocal = (e: UiInputChangeEvent) => {
    const values = {
      ...form.values,
      [e.target.name]: e.target.value,
    };
    onChange({ values, touches: form.touches })
  }

  const onBlurLocal = (e: UiInputChangeEvent) => {
    const touches = {
      ...form.touches,
      [e.target.name]: true,
    };
    onChange({ touches, values: form.values })
  }

  return (
    <div className={s.root}>
      <Box
        sx={{
          '& .MuiTextField-root': { m: '7px', width: 'calc(100% - 14px)' },
        }}
      >
        <TextField label="Name" variant="outlined" onChange={onChangeLocal} onBlur={onBlurLocal} {...inputProps(form, 'name')} />
        <TextField label="Symbol" variant="outlined" onChange={onChangeLocal} onBlur={onBlurLocal} {...inputProps(form, 'symbol')} />
        <TextField label="Title" variant="outlined" onChange={onChangeLocal} onBlur={onBlurLocal} {...inputProps(form, 'title')} />
        <TextField label="Description" variant="outlined" onChange={onChangeLocal} onBlur={onBlurLocal} {...inputProps(form, 'description')} />
        <TextField label="Images (separated by ',')" variant="outlined" onChange={onChangeLocal} onBlur={onBlurLocal} {...inputProps(form, 'propertyInfo_images')} />
        <div className={s.images}>
          {
            form.values.propertyInfo_images.split(',').map((url, i) => (
              <img key={i} src={url} alt="" />
            ))
          }
        </div>
        <TextField label="Total Supply" variant="outlined" onChange={onChangeLocal} onBlur={onBlurLocal} {...inputProps(form, 'tokenInfo_totalSupply')} />
        <TextField label="APR (%)" variant="outlined" onChange={onChangeLocal} onBlur={onBlurLocal} {...inputProps(form, 'tokenInfo_apr')} />
        <TextField label="Token Price ($)" variant="outlined" onChange={onChangeLocal} onBlur={onBlurLocal} {...inputProps(form, 'tokenInfo_tokenPriceDe6')} />
      </Box>
    </div>
  );
};

const inputProps = (form: UiForm<any>, name: keyof UiNewAssetForm['values']) => {
  const props = {
    name,
    value: form.values[name],
    error: form.touches[name] || form.isSubmitTouched ?  !!form.errors[name] : false,
    // I commented this out because of bad MUI design - CLS (layout shift) is huge...
    // helperText: form.touches[name] || form.isSubmitTouched ? form.errors?.[name]?.[0] : undefined,
  };

  return props
}
