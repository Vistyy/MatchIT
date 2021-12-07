import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import ValidatedTextInput from "../../../../app/common/form/ValidatedTextInput";
import { Profile } from "../../../../app/models/profile";
import { useStore } from "../../../../app/stores/store";

interface Props {
  setEditMode: (editMode: boolean) => void;
  profile: Profile;
}

export default observer(function AccountLinksForm({
  setEditMode,
  profile,
}: Props) {
  const {
    profileStore: { addAccountLinks},
  } = useStore();
  return (
    <Formik
      initialValues={{
        githubProfileUrl: profile.githubProfileUrl || "",
        linkedInProfileUrl: profile.linkedInProfileUrl || "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) => {
        try {
          addAccountLinks(values);
          setEditMode(false);
        } catch (error: any) {
          setErrors({ error });
        }
      }}
      onReset={(values, { resetForm }) => resetForm()}
      validationSchema={Yup.object({
        githubProfileUrl: Yup.string().url().matches(new RegExp("github.com")),
        linkedInProfileUrl: Yup.string()
          .url()
          .matches(new RegExp("linkedin.com")),
      })}
    >
      {({ handleSubmit, isValid }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <ValidatedTextInput
            name="githubProfileUrl"
            placeholder="Link to your GitHub Profile"
            label="Link to your GitHub Profile"
            errorElementName="GitHub link"
          />
          <ValidatedTextInput
            name="linkedInProfileUrl"
            placeholder="Link to your LinkedIn Profile"
            label="Link to your LinkedIn Profile"
            errorElementName="LinkedIn link"
          />
          <Button
            content="Save"
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
            onClick={() => {
              setEditMode(false);
            }}
          />
        </Form>
      )}
    </Formik>
  );
});
