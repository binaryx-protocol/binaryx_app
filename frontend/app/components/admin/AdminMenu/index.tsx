import { FC, useState } from 'react';
import s from "./styles.module.scss";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import * as React from 'react';
import AdminMenuDialog from '../AdminMenuDialog';
import AssetDialog from '../AssetDialog';

const AdminMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState("");

  const handleClickOpen = () => {
    setCurrentModal("mainAdminMenu");
  };

  const handleClose = (value: string) => {
    // if (value === "createAsset") {
    //   setCurrentModal("createAsset");
    // } else {
    //   setCurrentModal("");
    // }

    setCurrentModal(value)
  };

  function renderCurrentModal() {
    switch (currentModal) {
      case "mainAdminMenu":
        return (
          <AdminMenuDialog
            open={true}
            onClose={handleClose}
          />
        );
      case "createAsset":
        return <AssetDialog isOpen={true} key="create" />
      case "updateAsset":
        return <AssetDialog isOpen={true} update={true} key="update" />
    }
  }

  return (
    <div className={s.adminMenu}>
      <AdminPanelSettingsIcon onClick={handleClickOpen} />
      {renderCurrentModal()}
    </div>
  )
};

export default AdminMenu;
