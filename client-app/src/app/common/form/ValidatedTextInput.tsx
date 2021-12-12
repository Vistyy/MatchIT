import { useField } from "formik";
import _ from "lodash";
import React, { CSSProperties } from "react";
import { Form, Label } from "semantic-ui-react";
import { JsxAttribute } from "typescript";

interface Props {
  placeholder: string;
  name: string;
  errorElementName: string;
  type?: string;
  label?: string;
}

export default function ValidatedTextInput(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input
        {...field}
        {..._.omit(props, "errorElementName")}
        autoComplete="off"
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error.includes("required field")
            ? `${props.errorElementName} is required`
            : meta.error.includes("must match")
            ? `Link must be a ${props.errorElementName}`
            : `${meta.error.replace(props.name, props.errorElementName)}`}
        </Label>
      ) : null}
    </Form.Field>
  );
}
