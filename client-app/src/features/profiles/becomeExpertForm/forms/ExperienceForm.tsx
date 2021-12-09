import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../../app/stores/store";
import * as Yup from "yup";
import ValidatedTextInput from "../../../../app/common/form/ValidatedTextInput";
import { Button } from "semantic-ui-react";
import ValidatedTextArea from "../../../../app/common/form/ValidatedTextArea";
import { BulletPoint } from "../../../../app/models/profile";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

export default observer(function ExperienceForm({ setEditMode }: Props) {
  const {
    profileStore: { addExperienceItem },
  } = useStore();

  return (
    <Formik
      initialValues={{
        title: "",
        summary: "",
        bulletPoints: [] as BulletPoint[],
        error: null,
      }}
      onSubmit={(values, { setErrors }) => {
        try {
          addExperienceItem(values);
        } catch (error: any) {
          setErrors({ error });
        }
        setEditMode(false);
      }}
      onReset={(values, { resetForm }) => resetForm()}
      validationSchema={Yup.object({
        title: Yup.string().required(),
        summary: Yup.string().required(),
        bulletPoints: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isValid }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <ValidatedTextInput
            name="title"
            placeholder="Experience Name"
            label="Experience Name"
            errorElementName="Experience Name"
          />
          <ValidatedTextInput
            name="summary"
            placeholder="Summary"
            label="Summary"
            errorElementName="Summary"
          />
          <ValidatedTextArea
            name="formattedText"
            label="Description"
            placeholder="Description"
            errorElementName="Description"
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
