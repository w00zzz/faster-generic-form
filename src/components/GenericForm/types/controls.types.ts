import { ICommonProps } from "./common.types";

export type IGenericControls = ITextField;

export type multiline = {
  minRows?: number;
  maxRows?: number;
} | boolean;

export type ITextField = {
  type: "text";
  pattern?: RegExp;
  validations?: ITextValidation;
  hidden?: any;
  multiline?: multiline;
} & IInputProps;

export type ITextValidation = {
  required?: IRequiredValidation;
  regex?: IRegexValidation;
  email?: IEmailValidation;
  url?: IUrlValidation;
  lowercase?: ILowerCaseValidation;
  uppercase?: IUppercaseValidation;
  trim?: ITrimValidation;
  length?: ILimitsProps;
} & ILimitsValidation &
  ICustomValidation;

export type IInputProps = ICommonProps & {
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  fullWidth?: boolean;
  focused?: boolean;
  defaultValue?: string;
};

type ICommonValidationsProps = {
  message: string;
} & IWhenValidation;

export type IWhenValidation = {
  when?: { name: string; expression: (value: any) => boolean };
};

type IRegexValidation = {
  reference?: string;
  value: RegExp;
} & ICommonValidationsProps;

type IRequiredValidation = ICommonValidationsProps;
type IEmailValidation = ICommonValidationsProps;
type IUrlValidation = ICommonValidationsProps;
type ILowerCaseValidation = ICommonValidationsProps;
type IUppercaseValidation = ICommonValidationsProps;
type ITrimValidation = ICommonValidationsProps;

type ILimitsProps = {
  reference?: string;
  value: number;
} & ICommonValidationsProps;

type ILimitsValidation = {
  min?: ILimitsProps;
  max?: ILimitsProps;
};

export type ICustomValidation = {
  tests?: ITest[];
};

export type ITest = {
  message: string;
  test: ITestFunction;
};

export interface ITestFunction {
  (values?: any): boolean | void;
}
