import { createContext, useContext, ReactNode } from 'react';
import { ModalProvider } from './ModalContext';

// Definición del tipo para el contexto del formulario genérico
type GenericFormContextType = {
  // Aquí puedes agregar propiedades globales que necesites compartir
  // Por ejemplo, estado global, funciones compartidas, etc.
};

// Creación del contexto con un valor inicial vacío pero tipado
export const GenericFormContext = createContext<GenericFormContextType | undefined>(undefined);

/**
 * Hook para acceder al contexto del formulario genérico
 * @returns El contexto del formulario genérico
 */
export const useGenericForm = (): GenericFormContextType => {
  const context = useContext(GenericFormContext);
  if (!context) {
    throw new Error('useGenericForm debe ser usado dentro de un GenericFormProvider');
  }
  return context;
};

/**
 * Proveedor del contexto para el formulario genérico
 * Envuelve la aplicación y proporciona acceso al contexto
 */
export const GenericFormProvider = ({ children }: { children: ReactNode }) => {
  // Aquí puedes definir estados y funciones que quieras compartir
  const contextValue: GenericFormContextType = {
    // Propiedades y métodos compartidos
  };

  return (
    <GenericFormContext.Provider value={contextValue}>
      <ModalProvider>
        {children}
      </ModalProvider>
    </GenericFormContext.Provider>
  );
};
