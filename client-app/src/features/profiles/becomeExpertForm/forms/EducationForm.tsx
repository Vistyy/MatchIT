import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../../app/stores/store";
import * as Yup from "yup";
import ValidatedTextInput from "../../../../app/common/form/ValidatedTextInput";
import ValidatedDatePicker from "../../../../app/common/form/ValidatedDatePicker";
import { Button } from "semantic-ui-react";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

export default observer(function EducationForm({ setEditMode }: Props) {
  const {
    profileStore: { addEducationItem },
  } = useStore();

  return (
    <Formik
      initialValues={{
        facilityName: "",
        facilityLocation: "",
        fieldOfStudy: "",
        studyingFrom: new Date(),
        studyingTo: new Date(),
        error: null,
      }}
      onSubmit={(values, { setErrors }) => {
        try {
          addEducationItem(values);
        } catch (error: any) {
          setErrors({ error });
        }
        setEditMode(false);
      }}
      validationSchema={Yup.object({
        facilityName: Yup.string().required(),
        facilityLocation: Yup.string().required(),
        fieldOfStudy: Yup.string().required(),
        studyingFrom: Yup.date().required(),
      })}
    >
      {({ handleSubmit }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <ValidatedTextInput
            name="facilityName"
            placeholder="Facility Name"
            label="Facility Name"
          />
          <ValidatedTextInput
            name="facilityLocation"
            placeholder="Facility Location"
            label="Facility Location"
          />
          <ValidatedTextInput
            name="fieldOfStudy"
            placeholder="Field Of Study"
            label="Field Of Study"
          />
          <ValidatedDatePicker
            name="studyingFrom"
            label="Attending From"
          />
          <ValidatedDatePicker
            name="studyingTo"
            label="Attending To"
            optional
          />
          <Button
            content="Add"
            size="big"
            style={{ fontSize: "1.35em" }}
            type="submit"
            className="positive--custom"
          />
          <Button
            content="Cancel"
            size="big"
            style={{ fontSize: "1.35em" }}
            onClick={() => setEditMode(false)}
          />
        </Form>
      )}
    </Formik>
  );
});
