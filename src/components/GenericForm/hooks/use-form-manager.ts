import { atom, useRecoilState } from "recoil";
import { useCallback, useMemo } from "react";
import type { ModalActions } from "../types/types";
/**
 * Define el estado del modal abierto.
 */
const modalOpenState = atom<string | null>({
  key: "generic-form-modal-state",
  default: null,
});
/**
 * 
 * @returns modalState: Estado actual del modal, puede ser string o null.
 * @returns modalActions: Objeto que contiene acciones para abrir y cerrar el modal.
 */
function useModalState(): {
  modalState: string | null;
  modalActions: ModalActions;
} {
  const [modalState, setIsOpen] = useRecoilState(modalOpenState);
/**
 * Funcion para cerrar un modal.
 */
  const close = useCallback(() => {
    setIsOpen(null);
  }, []);
/**
 * Funcion para abrir un modal.
 */
  const open = useCallback((modalName: string) => {
    setIsOpen(modalName);
  }, []);

  const modalActions = useMemo(() => ({ close, open }), [setIsOpen]);

  return { modalState, modalActions };
}
export default useModalState;
