import React from "react";
import { observer } from "mobx-react-lite";
import { Form, Formik } from "formik";
import ValidatedTextInput from "../../../../app/common/form/ValidatedTextInput";
import ValidatedDatePicker from "../../../../app/common/form/ValidatedDatePicker";
import * as Yup from "yup";
import { Button } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import ValidatedTextArea from "../../../../app/common/form/ValidatedTextArea";
import { BulletPoint } from "../../../../app/models/profile";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

export default observer(function EmploymentForm({ setEditMode }: Props) {
  const {
    profileStore: { addEmploymentItem },
  } = useStore();

  return (
    <Formik
      initialValues={{
        companyName: "",
        companyPosition: "",
        employedFrom: new Date(),
        employedTo: new Date(),
        jobBulletPoints: [] as BulletPoint[],
        error: null,
      }}
      onSubmit={(values, { setErrors }) => {
        try {
          addEmploymentItem(values);
        } catch (error: any) {
          setErrors({ error });
        }
        setEditMode(false);
      }}
      onReset={(values, { resetForm }) => resetForm()}
      validationSchema={Yup.object({
        companyName: Yup.string().required(),
        companyPosition: Yup.string().required(),
        employedFrom: Yup.date().required(),
        jobBulletPoints: Yup.array().required(),
      })}
    >
      {({ handleSubmit, isValid }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <ValidatedTextInput
            name="companyName"
            placeholder="Company Name"
            label="Company Name"
            errorElementName="Company Name"
          />
          <ValidatedTextInput
            name="companyPosition"
            placeholder="Role in the company"
            label="Role in the company"
            errorElementName="Role in the company"
          />
          <ValidatedDatePicker
            name="employedFrom"
            label="Employed From"
            errorElementName="Employed From"
          />
          <ValidatedDatePicker
            name="employedTo"
            label="Employed To"
            optional
            errorElementName="Employed To"
          />
          <ValidatedTextArea
            name="jobBulletPoints"
            label="Job Description"
            placeholder="Job Description"
            errorElementName="Job Description"
            rows={5}
          />
          <Button
            content="Add"
            size="big"
            style={{ fontSize: "1.35em" }}
            type="submit"
            className="positive--custom"
            disabled={!isValid}
          />
          <Button
            type="reset"
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
