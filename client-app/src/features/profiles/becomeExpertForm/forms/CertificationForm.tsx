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

export default observer(function CertificationForm({ setEditMode }: Props) {
  const {
    profileStore: { addCertification },
  } = useStore();

  return (
    <Formik
      initialValues={{
        certificateName: "",
        dateAcquired: new Date(),
        error: null,
      }}
      onSubmit={(values, { setErrors }) => {
        try {
          addCertification(values);
        } catch (error: any) {
          setErrors({ error });
        }
        setEditMode(false);
      }}
      onReset={(values, { resetForm }) => resetForm()}
      validationSchema={Yup.object({
        certificateName: Yup.string().required(),
        dateAcquired: Yup.date().required(),
      })}
    >
      {({ handleSubmit, isValid }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <ValidatedTextInput
            name="certificateName"
            placeholder="Certificate Name"
            label="Certificate Name"
            errorElementName="Certificate Name"
          />
          <ValidatedDatePicker
            name="dateAcquired"
            label="Date Acquired"
            errorElementName="Date Acquired"
            maxDate={new Date()}
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
