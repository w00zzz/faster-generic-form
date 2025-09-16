# Generic Form Library

A flexible and reusable form component library built with React, Formik, and Material UI.

## Features

- Easy to use generic form component
- Built-in validation
- Material UI styling
- Customizable form controls
- TypeScript support

## Installation

```bash
npm install generic-form-library
```

## Usage

```jsx
import { GenericForm } from 'generic-form-library';

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
};

function App() {
  return (
    <GenericForm
      name="exampleForm"
      title="Example Form"
      controles={formControls}
      submitFunction={handleSubmit}
    />
  );
}

export default App;
```

## API

### GenericForm Props

| Prop | Type | Description |
|------|------|-------------|
| name | string | Unique identifier for the form |
| title | string | Form title |
| endpointPath | string | API endpoint for form submission |
| controles | ITextField[] | Array of form controls |
| submitFunction | function | Custom submit handler |

### ITextField

| Property | Type | Description |
|----------|------|-------------|
| type | 'text' \| 'email' \| 'password' \| 'number' \| 'select' \| 'checkbox' \| 'radio' | Type of input |
| name | string | Field name |
| label | string | Label for the field |
| placeholder | string | Placeholder text |
| options | { value: string; label: string }[] | Options for select and radio inputs |
| gridValues | { xs, sm, md, lg, xl } | Grid sizing for responsive layout |
| validations | Object | Validation rules |

## License

MIT