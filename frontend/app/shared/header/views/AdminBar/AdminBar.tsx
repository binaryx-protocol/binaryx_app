import React from 'react';
import Popover from '@mui/material/Popover';
import s from './AdminBar.module.scss';
import { Container } from '../../../ui/views/Container';
import { AdminPayRent } from '../../../../features/admin';
import { useRouter } from 'next/router';
import { Button } from "../../../ui/views/Button";

enum AdminBarItems {
  PayRent,
}

export const AdminBar = () => {
  const id = parseInt(useRouter().query.id as string);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [selectedItem, setSelectedItem] = React.useState<AdminBarItems | null>(
    null,
  );

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: AdminBarItems,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div className={ s.root }>
      <Container className={ s.container }>
        <Button
          onClick={ (e) => handleClick(e, AdminBarItems.PayRent) }
          className={ s.item }
        >
          Pay Rent
        </Button>
        <Popover
          open={ open }
          anchorEl={ anchorEl }
          onClose={ handleClose }
          anchorOrigin={ {
            vertical: 'bottom',
            horizontal: 'center',
          } }
        >
          { selectedItem === AdminBarItems.PayRent && (
            <AdminPayRent assetId={ id }/>
          ) }
        </Popover>
      </Container>
    </div>
  );
};
