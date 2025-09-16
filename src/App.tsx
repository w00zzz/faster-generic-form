import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GenericForm from './components/GenericForm/component.form/form.generic'
import { Box, Button, ThemeProvider } from '@mui/material'
import theme from './theme'

function App() {
  const [count, setCount] = useState(0)
  const [showForm, setShowForm] = useState(false)

  const formControls = [
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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
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
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </ThemeProvider>
  )
}

export default App
