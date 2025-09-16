import { memo } from 'react';
import { IGenericControls } from "../types/controls.types";
import { getControl } from "../functions/render.controls";

/**
 * Componente para crear formulario genericos.
 * ```ts
 * Ejemplo: 
 *  <GForm
       controlArray={controls}
       dataSource={dataSource}
       editMode={editMode}
       initialValue={initialFormData}
     />
 * ```
 * @param controlArray Esta prop es un array con todos los controles del formulario.
 * @param dataSource Esta prop especifica la fuente de datos para los controles.
 * @param editMode Esta prop es un booleano que indica si el formulario esta en modo edicion.
 * @returns 
 */
export const GForm = memo((
  {
    controlArray,
    dataSource,
    editMode,
    initialValue,
  }: {
    controlArray: IGenericControls[];
    dataSource: any;
    editMode: boolean;
    initialValue: any;
  }) =>
    controlArray.map((control: IGenericControls, index: number) => {
      const Component = getControl(control.type);
      return (
        <Component
          {...control}
          key={`${control.name}-${index}`}
          options={control.options ?? dataSource[control.name]}
          editMode={editMode}
          initialValue={initialValue[control.name]}
        />
      );
    })
);

GForm.displayName = 'GForm';
