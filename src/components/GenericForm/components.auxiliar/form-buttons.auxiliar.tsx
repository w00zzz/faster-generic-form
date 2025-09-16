import { Button, DialogActions } from "@mui/material";
import { memo, useCallback } from "react";
import { IFormAction } from "../types/form.types";

interface FormButtonsProps {
  values: any;
  prevButton?: IFormAction;
  nextButton?: IFormAction;
  modalType?: string;
  editMode: boolean;
  applyButton?: boolean;
  hideButtons?: boolean;
  dataAction?: Array<{ label: string; action: (values: any) => void }>;
  formButtonAction: (e: any) => Promise<void>;
  modalActions: { close: () => void };
  setIdFunction?: (id: string | null) => void;
  prevDisabledFunction?: (values: any) => boolean;
  nextDisabledFunction?: (values: any) => boolean;
  applyDisabledFunction?: (values: any) => boolean;
  submitDisabledFunction?: (values: any) => boolean;
  acceptDisabledFunction?: (values: any) => boolean;
  onClose?: () => void;
}

/**
 * Optimized FormButtons component using proper memoization for all handlers
 */
const FormButtons = memo(
  ({
    values,
    prevButton,
    nextButton,
    modalType,
    editMode,
    applyButton,
    hideButtons,
    dataAction,
    formButtonAction,
    modalActions,
    setIdFunction,
    prevDisabledFunction,
    nextDisabledFunction,
    applyDisabledFunction,
    submitDisabledFunction,
    acceptDisabledFunction,
    onClose,
  }: FormButtonsProps) => {
    // Memoized close handler
    const handleClose = useCallback(() => {
      modalActions.close();
      setIdFunction?.(null);
    }, [modalActions, setIdFunction]);

    // Memoized previous button handler
    const handlePrevClick = useCallback(() => {
      prevButton?.action(values);
    }, [prevButton, values]);

    // Memoized next button handler
    const handleNextClick = useCallback((e: any) => {
      if (nextButton?.submitOnAction) {
        formButtonAction(e).finally(() => nextButton?.action(values));
      } else {
        nextButton?.action(values);
      }
    }, [nextButton, formButtonAction, values]);

    // Memoized data action handler
    const handleDataAction = useCallback(
      (action: (values: any) => void) => {
        action(values);
      },
      [values]
    );

    // Memoized accept button handler
    const handleAcceptClick = useCallback((e: any) => {
      formButtonAction(e);
    }, [formButtonAction]);

    // Memoized apply button handler
    const handleApplyClick = useCallback((e: any) => {
      formButtonAction(e);
    }, [formButtonAction]);

    // Memoized cancel button handler
    const handleCancelClick = useCallback(() => {
      console.log("Botón Cancelar presionado");
      (onClose ?? handleClose)();
    }, [onClose, handleClose]);

    // If hideButtons is true, return null to not render anything
    if (hideButtons) return null;

    return (
      <DialogActions sx={{ justifyContent: "space-between" }}>
        {prevButton && (
          <Button
            onClick={handlePrevClick}
            color="primary"
            variant="contained"
            disabled={prevDisabledFunction?.(values)}
          >
            {prevButton.text || "Anterior"}
          </Button>
        )}

        {modalType && (
          <Button
            onClick={handleCancelClick}
            color="primary"
            variant="contained"
          >
            Cancelar
          </Button>
        )}

        {dataAction?.map((action, index) => (
          <Button
            key={index}
            onClick={() => handleDataAction(action.action)}
            color="primary"
            variant="contained"
          >
            {action.label}
          </Button>
        ))}

        {nextButton && (
          <Button
            onClick={handleNextClick}
            disabled={nextDisabledFunction?.(values)}
            color="primary"
            variant="contained"
          >
            {nextButton.text || "Siguiente"}
          </Button>
        )}

        {!editMode && (applyButton === undefined || applyButton) && (
          <Button
            id="applyButton"
            onClick={handleApplyClick}
            disabled={
              applyDisabledFunction?.(values) ||
              submitDisabledFunction?.(values)
            }
            color="primary"
            variant="contained"
            data-action="apply"
          >
            Aplicar
          </Button>
        )}

        <Button
          id="acceptButton"
          onClick={handleAcceptClick}
          disabled={acceptDisabledFunction?.(values)}
          color="primary"
          variant="contained"
          data-action="accept"
        >
          {editMode ? "Editar" : "Aceptar"}
        </Button>
      </DialogActions>
    );
  }
);

FormButtons.displayName = "FormButtons";

export default FormButtons;
