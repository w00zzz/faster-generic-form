import { ControlDictionary, EControls } from "../types/common.types";

import { BasicTextFields } from "../controls.basics/input.generic";

export function getControl(type: EControls) {
  return DICTIONARY[type];
}

const DICTIONARY: ControlDictionary = {
  // number: BasicNumberFields,
  // select: BasicSelectFields,
  // multiselect: BasicSelectFields,
  // autocomplete: BasicAutocompleteFields,
  // date: BasicDateFields,
  // time: BasicTimeFields,
  // check: BasicCheckFields,
  // switch: BasicSwitchFields,
  // slider: BasicSliderFields,
  text: BasicTextFields,
  // radio: BasicRadioFields,
  // rating: BasicRatingFields,
  // component: BasicCustomComponent,
  // scanner: ScannerGeneric,
};
