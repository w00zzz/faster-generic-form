import { Grid, TextField } from "@mui/material";
import { useEffect, useMemo, memo, useCallback } from "react";
import { useFormikContext, FormikErrors, FormikTouched } from "formik";

interface BasicTextFieldsProps<T> {
  id?: string;
  gridSx?: object;
  initialValue?: string;
  gridValues?: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>>;
  name: string;
  label: string;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  disabled?: (values: T) => boolean;
  hidden?: (values: T) => boolean;
  focused?: boolean;
  placeholder?: string;
  pattern?: RegExp;
  sx?: object;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validations?: { required?: boolean };
  multiline?: { minRows?: number; maxRows?: number };
  disabledOnEdit?: boolean;
  editMode?: boolean;
}

function BasicTextFieldsComponent<T extends Record<string, any>>({
  id,
  gridSx,
  initialValue,
  gridValues,
  name,
  label,
  color = "primary",
  disabled,
  hidden,
  focused,
  placeholder,
  pattern,
  sx,
  onChange,
  validations,
  multiline,
  disabledOnEdit = false,
  editMode = false,
}: BasicTextFieldsProps<T>) {
  const {
    setFieldValue,
    setFieldTouched,
    values,
    touched,
    errors,
  } = useFormikContext<T>();

  const fieldError = useMemo(() => 
    touched[name] && errors[name], 
    [touched[name], errors[name]]
  );

  const fieldValue = useMemo(() => 
    values[name] ?? "", 
    [values[name]]
  );

  useEffect(() => {
    setFieldValue(String(name), initialValue ?? "", false);
  }, [initialValue, name, setFieldValue]);

  const isHidden = useMemo(() => 
    hidden?.(values), 
    [hidden, values]
  );

  const isDisabled = useMemo(() => 
    (editMode && disabledOnEdit) || disabled?.(values),
    [editMode, disabledOnEdit, disabled, values]
  );

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (pattern && !pattern.test(event.key) && event.key !== "Backspace") {
      event.preventDefault();
    }
  }, [pattern]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    setFieldValue(String(name), e.target.value, true);
    setFieldTouched(String(name));
  }, [onChange, setFieldValue, setFieldTouched, name]);

  const labelContent = useMemo(() => (
    <>
      {label}
      {validations?.required && <b style={{ color: "red" }}> * </b>}
    </>
  ), [label, validations?.required]);

  if (isHidden) return null;

  return (
    <Grid item {...gridValues} sx={gridSx}>
      <TextField
        fullWidth
        id={id ?? String(name)}
        name={String(name)}
        multiline={!!multiline}
        minRows={multiline?.minRows}
        maxRows={multiline?.maxRows}
        label={labelContent}
        color={color}
        focused={focused}
        placeholder={placeholder}
        disabled={isDisabled}
        sx={sx}
        value={fieldValue}
        error={!!fieldError}
        helperText={fieldError as string}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
    </Grid>
  );
}

export const BasicTextFields = memo(BasicTextFieldsComponent) as typeof BasicTextFieldsComponent;
