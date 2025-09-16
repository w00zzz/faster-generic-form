import React from 'react';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import {
  Box,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText
} from '@mui/material';

interface ITextField {
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'radio';
  name: string;
  label: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  gridValues?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  validations?: {
    required?: { message: string };
    email?: { message: string };
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
  };
}

interface IGForm {
  name: string;
  title?: string;
  endpointPath?: string;
  controles: ITextField[];
  description?: string;
  submitFunction?: (values: any) => void;
}

const GenericForm: React.FC<IGForm> = ({
  name,
  title,
  endpointPath,
  controles: controls,
  description,
  submitFunction
}) => {
  // Initial values for form
  const initialValues: Record<string, any> = {};
  controls.forEach(control => {
    initialValues[control.name] = control.type === 'checkbox' ? false : '';
  });

  // Validation function
  const validate = (values: Record<string, any>) => {
    const errors: Record<string, string> = {};
    
    controls.forEach(control => {
      const value = values[control.name];
      const validation = control.validations;
      
      if (validation) {
        if (validation.required && (!value || value === '')) {
          errors[control.name] = validation.required.message;
        }
        
        if (validation.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors[control.name] = validation.email.message;
        }
        
        if (validation.minLength && value && value.length < validation.minLength.value) {
          errors[control.name] = validation.minLength.message;
        }
        
        if (validation.maxLength && value && value.length > validation.maxLength.value) {
          errors[control.name] = validation.maxLength.message;
        }
      }
    });
    
    return errors;
  };

  // Handle form submission
  const handleSubmit = (values: Record<string, any>, formikHelpers: FormikHelpers<any>) => {
    if (submitFunction) {
      submitFunction(values);
    } else {
      // Default submission to endpoint
      console.log('Submitting to:', endpointPath, 'with values:', values);
      // Add your API call here
    }
    formikHelpers.setSubmitting(false);
  };

  // Render form controls based on type
  const renderControl = (control: ITextField, formik: FormikProps<any>) => {
    const { values, errors, touched, handleChange, handleBlur } = formik;
    const hasError = !!errors[control.name] && !!touched[control.name];
    
    switch (control.type) {
      case 'select':
        return (
          <FormControl fullWidth error={hasError}>
            <InputLabel>{control.label}</InputLabel>
            <Select
              name={control.name}
              value={values[control.name]}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {control.options?.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {hasError && <FormHelperText>{errors[control.name] as string}</FormHelperText>}
          </FormControl>
        );
        
      case 'checkbox':
        return (
          <FormControlLabel
            control={
              <Checkbox
                name={control.name}
                checked={values[control.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                color="primary"
              />
            }
            label={control.label}
          />
        );
        
      case 'radio':
        return (
          <FormControl component="fieldset" error={hasError}>
            <RadioGroup
              name={control.name}
              value={values[control.name]}
              onChange={handleChange}
            >
              {control.options?.map(option => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {hasError && <FormHelperText>{errors[control.name] as string}</FormHelperText>}
          </FormControl>
        );
        
      default:
        return (
          <TextField
            fullWidth
            type={control.type}
            name={control.name}
            label={control.label}
            placeholder={control.placeholder}
            value={values[control.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={hasError}
            helperText={hasError ? errors[control.name] as string : ''}
          />
        );
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {description && <DialogContentText>{description}</DialogContentText>}
      
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <DialogContent dividers>
              <Grid container spacing={2}>
                {controls.map((control, index) => (
                  <Grid
                    key={`${name}-${control.name}-${index}`}
                    {...(control.gridValues || { xs: 12 })}
                  >
                    {renderControl(control, formik)}
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default GenericForm;