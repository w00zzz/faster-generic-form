import React from 'react';
import ReactDOM from 'react-dom/client';
import { GenericForm } from './dist/generic-form.es.js';

const App = () => {
  const formControls = [
    {
      type: "text",
      name: "name",
      label: "Name",
      placeholder: "Enter your name",
      gridValues: { xs: 12 },
      validations: {
        required: { message: "Name is required" }
      }
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      gridValues: { xs: 12 },
      validations: {
        required: { message: "Email is required" },
        email: { message: "Must be a valid email" }
      }
    }
  ];

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    alert("Form submitted successfully!");
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Generic Form Library Demo</h1>
      <GenericForm
        name="exampleForm"
        title="Example Form"
        controles={formControls}
        submitFunction={handleSubmit}
      />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);