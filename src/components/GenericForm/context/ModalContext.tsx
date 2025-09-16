import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';

type ModalActions = {
  open: () => void;
  close: () => void;
};

type ModalState = {
  isOpen: boolean;
  modalActions: ModalActions;
};

const ModalContext = createContext<ModalState | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const modalActions: ModalActions = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ModalContext.Provider value={{ isOpen, modalActions }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalState = (): ModalState => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalState must be used within a ModalProvider');
  }
  return context;
};
