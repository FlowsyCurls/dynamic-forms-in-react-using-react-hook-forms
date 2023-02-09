import React from "react";
import { useForm, Controller } from "react-hook-form";

import "../App.css";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const maxLength = 40,
  textFiledSize = "normal",
  textFieldVariant = "outlined";

const dynamicForm = {
  Nombre: {
    placeholder: "Nombre",
    type: "text",
    defaultValue: "",
    variant: textFieldVariant,
    size: textFiledSize,
    inputProps: { maxLength: maxLength },
    rules: {
      required: true,
    },
  },
  PrimerApellido: {
    placeholder: "Primer Apellido",
    type: "text",
    defaultValue: "",
    variant: textFieldVariant,
    size: textFiledSize,
    inputProps: { maxLength: maxLength },
    rules: {
      required: true,
    },
  },
  SegundoApellido: {
    placeholder: "Segundo Apellido",
    type: "text",
    defaultValue: "",
    variant: textFieldVariant,
    size: textFiledSize,
    inputProps: { maxLength: maxLength },
    rules: {
      required: true,
    },
  },
  Carnet: {
    placeholder: "Carné",
    type: "text",
    defaultValue: "",
    variant: textFieldVariant,
    size: textFiledSize,
    inputProps: {
      inputMode: "numeric",
      pattern: "[0-9]*",
      minleght: 10,
      maxLength: 10,
    },
    rules: {
      required: true,
      minLength: 10,
      maxLength: 10,
      pattern: "[0-9]*",
      // validate: {
      //   checkPattern: v => validateNumericInput(v) || "Solo nmeros"
      // }
    },
  },

  AsistenteEntrega: {
    placeholder: "Asistente que entrega",
    type: "text",
    defaultValue: "",
    variant: textFieldVariant,
    size: textFiledSize,
    inputProps: { maxLength: maxLength },
    rules: {
      required: true,
    },
  },

  Fecha: {
    placeholder: "Fecha",
    type: "date",
    inputProps: {},
  },

  Hora: {
    placeholder: "Hora",
    type: "time",
    inputProps: {},
  },
};

//Error Component
const Error = ({ children }) => <p style={{ color: "red" }}>{children}</p>;

const Input = ({ value, onChange, type, ...rest }) => {
  switch (type) {
    case "text":
      return (
        <TextField
          fullWidth
          type="text"
          onChange={(value) => onChange(value)}
          value={value}
          placeholder={rest?.placeholder}
          inputProps={rest?.inputProps}
          variant={rest?.variant}
          size={rest?.size}
          InputLabelProps={{
            shrink: true,
          }}
        />
      );
    case "number":
      return (
        <TextField
          type="number"
          onChange={(value) => onChange(value)}
          value={value}
          placeholder={rest?.placeholder}
          inputProps={rest?.inputProps}
          InputLabelProps={{
            shrink: true,
          }}
        />
      );

    case "date":
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* <MobileDatePicker */}
          <DesktopDatePicker
            label={rest?.placeholder}
            inputFormat="DD/MM/YYYY"
            onChange={(value) => onChange(value)}
            value={value}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      );

    case "time":
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label={rest?.placeholder}
            onChange={(value) => onChange(value)}
            value={value}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      );

    default:
      return null;
  }
};

const Dynamic = () => {
  const {
    handleSubmit,
    control,
    // watch,
    formState: { errors },
  } = useForm();

  const formInputs = Object.keys(dynamicForm).map((e) => {
    const { rules, defaultValue, label } = dynamicForm[e];

    return (
      <section key={e}>
        <label>{label}</label>
        <Controller
          name={e}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field }) => (
            <div>
              <Input
                value={field.value}
                onChange={field.onChange}
                {...dynamicForm[e]}
              />
            </div>
          )}
        />
        {errors[e] && <Error>Este campo es obligatorio</Error>}
        {/* {errors[e] && <Error>{errors[e].className}</Error>} */}
      </section>
    );
  });

  const onSubmit = (data) => console.log(data);

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="wrapper">
      <h1>Dynamic Form Example</h1>
      <Link to="/normal">
        <Button cssClass="e-success">Go to Normal</Button>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formInputs}
        <div style={{ textAlign: "center" }}>
          <Button type="submit" cssClass="e-success">
            Success
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Dynamic;
