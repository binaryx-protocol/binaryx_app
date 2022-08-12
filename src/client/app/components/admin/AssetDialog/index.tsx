import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import capitalize from 'lodash/capitalize';
import { gql, useMutation } from '@apollo/client';
import useAssets from '../../../hooks/useAssets';
import { useRouter } from 'next/router';

type Props = {
  isOpen: boolean;
  update?: boolean;
};

type Field = {
  name: string;
  type?: string;
  optional?: boolean;
  placeholder?: string;
};

const fields: Field[] = [
  { name: 'name' },
  { name: 'title' },
  { name: 'contractId', optional: true },
  { name: 'country' },
  { name: 'state' },
  { name: 'city' },
  { name: 'postalCode' },
  { name: 'line1' },
  { name: 'line2' },
  { name: 'tokenPrice' },
  { name: 'tokenTotalSupply', type: 'number' },
  { name: 'tokensLeft', type: 'number' },
  { name: 'coc' },
  { name: 'irr' },
  {
    name: 'infoItems',
    placeholder: 'Info Items (bed: 8 Bed, bath: 2 Bath...)',
  },
  { name: 'images', placeholder: 'Images (src1, src2...)' },
];

const CREATE_ASSET = gql`
  mutation CreateAsset(
    $contractId: String!
    $name: String!
    $title: String!
    $country: String!
    $state: String!
    $city: String!
    $postalCode: String!
    $line1: String!
    $line2: String!
    $tokenPrice: String!
    $tokenTotalSupply: Int!
    $tokensLeft: Int!
    $coc: String!
    $irr: String!
    $infoItems: JSONObject!
    $images: JSONObject!
  ) {
    createAsset(
      contractId: $contractId
      name: $name
      title: $title
      country: $country
      state: $state
      city: $city
      postalCode: $postalCode
      line1: $line1
      line2: $line2
      tokenPrice: $tokenPrice
      tokenTotalSupply: $tokenTotalSupply
      tokensLeft: $tokensLeft
      coc: $coc
      irr: $irr
      infoItems: $infoItems
      images: $images
    ) {
      contractId
      name
      title
      country
      state
      city
      postalCode
      line1
      line2
      tokenPrice
      tokenTotalSupply
      tokensLeft
      coc
      irr
      infoItems
      images
    }
  }
`;

const UPDATE_ASSET = gql`
  mutation UpdateAsset(
    $contractId: String!
    $name: String!
    $title: String!
    $country: String!
    $state: String!
    $city: String!
    $postalCode: String!
    $line1: String!
    $line2: String!
    $tokenPrice: String!
    $tokenTotalSupply: Int!
    $tokensLeft: Int!
    $coc: String!
    $irr: String!
    $infoItems: JSONObject!
    $images: JSONObject!
  ) {
    updateAsset(
      contractId: $contractId
      name: $name
      title: $title
      country: $country
      state: $state
      city: $city
      postalCode: $postalCode
      line1: $line1
      line2: $line2
      tokenPrice: $tokenPrice
      tokenTotalSupply: $tokenTotalSupply
      tokensLeft: $tokensLeft
      coc: $coc
      irr: $irr
      infoItems: $infoItems
      images: $images
    )
  }
`;

const AssetDialog: FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [createAsset] = useMutation(CREATE_ASSET);
  const [updateAsset] = useMutation(UPDATE_ASSET);
  const [formData, setFormData] = useState<any>({});
  const { id } = useRouter().query;
  const item = useAssets({
    name: formData.name || '',
    id: !formData.name && id ? (id as string) : '',
  }).assets[0];

  useEffect(() => {
    if (props.update && item) {
      const newFormData = {
        ...item,
        images: item.images?.images?.map((image) => image.src).join(', '),
        infoItems: item.infoItems?.infoItems
          .map((infoItem) => `${infoItem.type}: ${infoItem.value}`)
          .join(', '),
      };
      setFormData(newFormData);
    }
  }, [props.update, item]);

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  function handleSubmit() {
    const assetData = {
      ...formData,
      tokenTotalSupply: parseInt(formData.tokenTotalSupply),
      tokensLeft: parseInt(formData.tokensLeft),
      images: {
        images:
          formData.images
            .split(', ')
            ?.map((value: string) => ({ src: value })) || [],
      },
      infoItems: {
        infoItems: formData.infoItems.split(', ')?.map((infoItemStr: string) => {
          const [infoType, infoValue] = infoItemStr?.split(': ') || [];
          return {
            type: infoType || '',
            value: infoValue || '',
          };
        }),
      },
    };

    if (props.update) {
      updateAsset({ variables: assetData });
    } else {
      createAsset({ variables: assetData });
    }
    handleClose();
  }

  function handleFieldChange(
    name: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    let value: any = event.target.value;
    try {
      if (name === 'images') {
        value = {
          images:
            event.target.value.split(', ')?.map((value) => ({ src: value })) ||
            [],
        };
      } else if (name === 'infoItems') {
        value = {
          infoItems: event.target.value.split(', ')?.map((infoItemStr) => {
            const [infoType, infoValue] = infoItemStr?.split(': ') || [];
            return {
              type: infoType || '',
              value: infoValue || '',
            };
          }),
        };
      }
    } catch (error) {
      console.error(error);
    }

    setFormData((formData) => {
      return {
        ...formData,
        [name]: value,
      };
    });
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle>Create Asset</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter asset details</DialogContentText>
          {fields.map(({ name, optional, placeholder }, index) => (
            <TextField
              key={name}
              autoFocus={index === 0}
              margin="dense"
              id={name}
              label={
                placeholder ||
                capitalize(name) + (optional ? ' (optional)' : '')
              }
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => handleFieldChange(name, event)}
              value={formData[name]}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {props.update ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AssetDialog;
