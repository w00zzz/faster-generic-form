import { useState } from 'react'
import './App.css'
import GenericForm from './components/GenericForm/component.form/form.generic'
import { Box, Button, ThemeProvider } from '@mui/material'
import theme from './theme'
import type { ITextField } from './components/GenericForm/types/controls.types'

function App() {
  const [showForm, setShowForm] = useState(false)

  const formControls: ITextField[] = [
    {
      type: "text",
      name: "name",
      label: "Nombre",
      placeholder: "Ingrese su nombre",
      gridValues: { xs: 12 },
      validations: {
        required: { message: "El nombre es requerido" }
      }
    },
    {
      type: "text",
      name: "email",
      label: "Email",
      placeholder: "Ingrese su email",
      gridValues: { xs: 12 },
      validations: {
        required: { message: "El email es requerido" },
        email: { message: "Debe ingresar un email válido" }
      }
    }
  ]

  const handleSubmit = (values: any) => {
    console.log("Form values:", values)
    alert("Formulario enviado con éxito!")
  }

  return (
    <ThemeProvider theme={theme}>
      
      {/* Ejemplo de GenericForm */}
      <Box sx={{ mt: 4, p: 2 }}>
        <Button 
          variant="contained" 
          onClick={() => setShowForm(!showForm)}
          sx={{ mb: 2 }}
        >
          {showForm ? "Ocultar Formulario" : "Mostrar Formulario"}
        </Button>
        
        {showForm && (
          <GenericForm
            name="exampleForm"
            title="Formulario de Ejemplo"
            endpointPath="/api/example"
            controles={formControls}
            submitFunction={handleSubmit}
          />
        )}
      </Box>
      
    </ThemeProvider>
  )
}

export default App
