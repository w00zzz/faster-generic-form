import React, { useState } from "react";
import { Dialog } from "@mui/material";

export const FormContainer = ({
  modalType,
  name,
  setIdFunction,
  children,
}: any) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    setIdFunction?.(null);
  };
  return modalType ? (
    <Dialog
      fullWidth={modalType === "fullWidth"}
      maxWidth={modalType === "fullWidth" ? false : modalType}
      open={open}
      onClose={handleClose}
      scroll={"paper"}
    >
      {typeof children === 'function' ? children({ handleClose }) : children}
    </Dialog>
  ) : (
    typeof children === 'function' ? children({ handleClose }) : children
  );
};
