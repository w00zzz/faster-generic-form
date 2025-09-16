import { SxProps } from "@mui/system";

export type IGridValues = {
  xs?: IBreakPointsValues;
  sm?: IBreakPointsValues;
  md?: IBreakPointsValues;
  lg?: IBreakPointsValues;
  xl?: IBreakPointsValues;
};

type IBreakPointsValues = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type IDisableFunction = (args?: any) => boolean;

export type ICommonProps = {
  name: string;
  label: string;
  id?: string;
  placeholder?: string;
  sx?: SxProps;
  gridValues?: IGridValues;
  gridSx?: SxProps;
  disabled?: IDisableFunction;
  hidden?: IDisableFunction;
  onChange?: IOnChangeFunction;
  options?: Object;
  disabledOnEdit?: boolean;
};

export type EControls = "text";

export type ControlDictionary = Record<EControls, (props: any) => any>;

export type IOnChangeFunction = (event?: any, refs?: any) => void;
