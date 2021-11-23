import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../../app/stores/store";
import * as Yup from "yup";
import ValidatedTextInput from "../../../../app/common/form/ValidatedTextInput";
import { Button } from "semantic-ui-react";
import ValidatedTextArea from "../../../../app/common/form/ValidatedTextArea";

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
        formattedText: "",
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
      validationSchema={Yup.object({
        title: Yup.string().required(),
        summary: Yup.string().required(),
        formattedText: Yup.string().required(),
      })}
    >
      {({ handleSubmit }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <ValidatedTextInput
            name="title"
            placeholder="Experience Name"
            label="Experience Name"
          />
          <ValidatedTextInput
            name="summary"
            placeholder="Summary"
            label="Summary"
          />
          <ValidatedTextArea
            name="formattedText"
            label="Description"
            placeholder="Description"
            rows={5}
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