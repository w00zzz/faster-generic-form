import { FormContainer } from "../components.auxiliar/form-container.auxiliar";
import { IGForm } from "../types/form.types";
import {
  Box,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Formik, FormikProps } from "formik";
import Loading from "./loading";
import { submitValues } from "../functions/service.form";
import { normalize } from "../functions/utils";
import { useModalState } from "../context/ModalContext";
import { GridContainer } from "../components.auxiliar/grid-container.auxiliar";
import { GForm } from "../components.auxiliar/control-item.auxiliar";
import { useCallback, useRef, useState, memo, useEffect } from "react";
import FormButtons from "../components.auxiliar/form-buttons.auxiliar";

interface IGFormProps extends IGForm {
  submitFunction?: (values: any, name: string, idForEdit?: any, buttonAction?: string) => void;
  getByIdFunction?: (idForEdit: any) => any;
}

const GenericForm = memo((props: IGFormProps & { onClose?: () => void }) => {
  const formReference = useRef<FormikProps<any>>(null);
  const {
    controles: controlsProp,
    idForEdit,
    getByIdFunction,
    title,
    editTitle,
    createTitle,
    name,
    endpointPath,
    description,
    modalType,
    showSpecificDescription,
    descriptionOnCreate,
    descriptionOnEdit,
    hideButtons,
    setIdFunction,
    submitFunction: submitFunctionProp,
    nextButton,
    prevButton,
    applyButton,
    dataAction,
    notifyValidation,
    sx,
    gridContainerSx,
    acceptDisabledFunction,
    applyDisabledFunction,
    nextDisabledFunction,
    prevDisabledFunction,
  } = props;

  const submitFunction = useCallback(submitFunctionProp ?? (() => {}), [submitFunctionProp]);

  let modalActions = { open: () => { }, close: () => { } };
  try {
    const modalState = useModalState();
    modalActions = modalState.modalActions;
  } catch (error) {
    console.warn("Modal context not available, using mock implementation");
  }

  const [isLoading, setIsLoading] = useState(true);
  const [formState, setFormState] = useState<{
    editMode: boolean;
    initialFormData: Record<string, any> | null;
    dataSource: Record<string, any>;
  }>({
    editMode: false,
    initialFormData: null,
    dataSource: {}
  });

  const customTitle = formState.editMode ? editTitle ?? title : createTitle ?? title;
  const isEditing = formState.editMode || idForEdit;
  const customDescription = showSpecificDescription
    ? (isEditing ? descriptionOnEdit : descriptionOnCreate) ?? description
    : description;

  type ButtonAction = "none" | "accept" | "apply";
  const submit = useCallback(
    (values: any, _formikHelpers?: any, buttonAction: ButtonAction = "none") =>
      submitFunction
        ? submitFunction(
            { ...values, editMode: formState.editMode },
            name,
            idForEdit,
            buttonAction
          )
        : submitValues(
            { ...values, editMode: formState.editMode, buttonAction },
            name,
            idForEdit,
            endpointPath
          ),
    [idForEdit, submitFunction, formState.editMode, name, endpointPath]
  );

  const formButtonAction = useCallback(
    async (event?: any) => {
      const message = await notifyValidation?.({
        ...formReference?.current?.values,
        editMode: formState.editMode,
      });
      if (message) {
        console.log(message);
      } else {
        if (formReference?.current) {
          const buttonAction =
            event?.target?.id === "acceptButton"
              ? "accept"
              : event?.target?.id === "applyButton"
              ? "apply"
              : "none";

          const response = await submit(
            normalize(formReference?.current?.values),
            null,
            buttonAction
          );

          if (response !== false) {
            if (buttonAction === "accept") {
              modalActions.close();
              setIdFunction?.(null);
              !modalType && setFormState((prev: any) => ({ ...prev, editMode: true }));
            }
            if (buttonAction === "apply") {
              formReference.current?.resetForm();
            }
          }
        }
      }
    },
    [formReference, formState.editMode, modalActions, setIdFunction, modalType, submit]
  );

  const memoizedGetByIdFunction = useCallback(getByIdFunction || (() => {}), [getByIdFunction]);

  const initializeFormData = async () => {
    try {
      const initialData = {};
      let editMode = false;
      if (idForEdit && memoizedGetByIdFunction) {
        const data = await memoizedGetByIdFunction(idForEdit);
        Object.assign(initialData, data);
        editMode = true;
      }

      const sourceData: Record<string, any> = {};
      controlsProp.forEach((control) => {
        if (control.options) {
          sourceData[control.name] = control.options;
        }
      });

      setFormState({
        editMode,
        initialFormData: initialData,
        dataSource: sourceData,
      });
    } catch (err) {
      console.error("Error initializing form:", err);
      setFormState(prev => ({
        ...prev,
        initialFormData: null
      }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeFormData();
  }, []);

  if (isLoading || formState.initialFormData === null) {
    return <Loading />;
  }

  return (
    <FormContainer
      modalType={modalType}
      name={name}
      setIdFunction={setIdFunction}
    >
        {({ handleClose }: { handleClose: () => void }) => (
          <>
            {customTitle && <DialogTitle>{customTitle}</DialogTitle>}
            {customDescription && (
              <DialogContentText mx={3}>{customDescription}</DialogContentText>
            )}
            <Formik
              className={"formik-object"}
              validateOnChange={true}
              enableReinitialize={true}
              initialValues={formState.initialFormData}
              innerRef={formReference}
              onSubmit={(values, formikHelpers) => {
                submit(values, formikHelpers, "accept");
                formikHelpers.setSubmitting(false);
              }}
              validateOnMount={false}
              validateOnBlur={false}
            >
              {(props: FormikProps<any>) => (
                <>
                  <DialogContent dividers={!!modalType} sx={sx}>
                    <GridContainer
                      hideButtons={hideButtons}
                      sx={gridContainerSx}
                    >
                      <GForm
                        controlArray={controlsProp}
                        dataSource={formState.dataSource}
                        editMode={formState.editMode}
                        initialValue={formState.initialFormData}
                      />
                    </GridContainer>
                  </DialogContent>
                  <Box sx={{ flexGrow: 1 }} />
                  {!hideButtons && (
                    <FormButtons
                      values={props.values}
                      prevButton={prevButton}
                      nextButton={nextButton}
                      modalType={modalType}
                      editMode={formState.editMode}
                      applyButton={applyButton}
                      hideButtons={hideButtons}
                      dataAction={dataAction}
                      formButtonAction={formButtonAction}
                      modalActions={modalActions}
                      setIdFunction={setIdFunction}
                      prevDisabledFunction={prevDisabledFunction}
                      nextDisabledFunction={nextDisabledFunction}
                      applyDisabledFunction={applyDisabledFunction}
                      acceptDisabledFunction={acceptDisabledFunction}
                      onClose={handleClose}
                    />
                  )}
                </>
              )}
            </Formik>
          </>
        )}
    </FormContainer>
  );

});

export default GenericForm;
