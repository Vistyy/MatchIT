import { FieldArray, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../../app/stores/store";
import * as Yup from "yup";
import ValidatedTextInput from "../../../../app/common/form/ValidatedTextInput";
import { Button, Icon, Label, List } from "semantic-ui-react";
import { BulletPoint } from "../../../../app/models/profile";
import { v4 as uuid } from "uuid";

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
        bulletPoint: "",
        bulletList: [] as BulletPoint[],
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
        bulletList: Yup.array()
          .min(1, "The description must have at least 1 bullet point")
          .required(),
      })}
    >
      {({ handleSubmit, isValid, values, errors: {bulletList: bulletListError}, setFieldValue }) => (
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
          <FieldArray
            name="bulletList"
            render={(arrayHelpers) => (
              <>
                <ValidatedTextInput
                  name="bulletPoint"
                  placeholder="Description of the position"
                  label="Description of the position"
                  errorElementName="Description of the position"
                />
                {bulletListError?.toString() ? (
                  <Label basic color="red">
                    {bulletListError.toString()}
                  </Label>
                ) : null}
                <List bulleted>
                  {values.bulletList.length > 0 &&
                    values.bulletList.map((bulletPoint, index) => (
                      <List.Item key={bulletPoint.id}>
                        {bulletPoint.text}
                        <Icon
                          name="close"
                          link
                          onClick={() => arrayHelpers.remove(index)}
                        />
                      </List.Item>
                    ))}
                </List>
                {values.bulletPoint.length > 0 && (
                  <Button
                    type="submit"
                    content="Add Bullet Point"
                    onKeyPress={(e: KeyboardEvent) => {
                      e.preventDefault();
                      if (e.key === "Enter") {
                        arrayHelpers.push({
                          id: uuid(),
                          text: values.bulletPoint,
                        } as BulletPoint);
                        setFieldValue("bulletPoint", "");
                      }
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      arrayHelpers.push({
                        id: uuid(),
                        text: values.bulletPoint,
                      } as BulletPoint);
                      setFieldValue("bulletPoint", "");
                    }}
                  />
                )}
              </>
            )}
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
