import { useField } from "formik";
import _ from "lodash";
import React from "react";
import { Form, Label } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  rows: number;
  errorElementName: string;
  label?: string;
}

export default function ValidatedTextArea(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <textarea
        {...field}
        {..._.omit(props, "errorElementName")}
        style={{ resize: "none" }}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error.includes("required field")
            ? `${props.errorElementName} is required`
            : `${meta.error.replace(props.name, props.errorElementName)}`}
        </Label>
      ) : null}
    </Form.Field>
  );
}
