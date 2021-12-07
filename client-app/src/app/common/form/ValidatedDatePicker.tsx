import { useField, useFormikContext } from "formik";
import React, { useState } from "react";
import { Checkbox, Form, Label } from "semantic-ui-react";
import DatePicker from "react-date-picker";
import _ from "lodash";

interface Props {
  name: string;
  dayPlaceholder?: string;
  monthPlaceholder?: string;
  yearPlaceholder?: string;
  errorElementName: string;
  label?: string;
  optional?: boolean;
}

export default function ValidatedDatePicker(props: Props) {
  const [field, meta] = useField(props.name);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [disableCheckbox, setDisableCheckbox] = useState(false);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <DatePicker
        {..._.omit(field, "onBlur")}
        {..._.omit(props, "errorElementName")}
        format="dd/MM/yyyy"
        value={(field.value && new Date(field.value)) || null}
        onChange={(val: Date) => {
          // val
          //   ? setFieldTouched(props.name, false)
          //   : setFieldTouched(props.name, true);
          setFieldTouched(props.name, !!!val);
          setFieldValue(field.name, val);
        }}
        calendarIcon={null}
        clearIcon={null}
        disabled={props.optional && disableCheckbox}
        required={!props.optional}
      />
      {props.optional && (
        <Checkbox
          label={`Currently ${props.label?.split(" ")[0].toLocaleLowerCase()}`}
          onChange={(e, { checked }) => {
            setDisableCheckbox(!!checked);
            !!checked
              ? setFieldValue(field.name, null)
              : setFieldValue(field.name, new Date());
          }}
        />
      )}
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error.includes("Invalid Date")
            ? `${props.errorElementName} is required`
            : `${meta.error.replace(props.name, props.errorElementName)}`}
        </Label>
      ) : null}
    </Form.Field>
  );
}
