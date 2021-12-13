import { FieldArray, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { MouseEvent, useState } from "react";
import { useStore } from "../../../../app/stores/store";
import * as Yup from "yup";
import ValidatedTextInput from "../../../../app/common/form/ValidatedTextInput";
import { Button, Label, List, Segment } from "semantic-ui-react";
import { BulletPoint } from "../../../../app/models/profile";
import { v4 as uuid } from "uuid";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

export default observer(function ExperienceForm({ setEditMode }: Props) {
  const {
    profileStore: { addExperienceItem },
  } = useStore();
  const [hoverListItem, setHoverListItem] = useState(false);
  const [target, setTarget] = useState("");

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
      {({
        handleSubmit,
        isValid,
        values,
        errors: { bulletList: bulletListError },
        setFieldValue,
      }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <ValidatedTextInput
            name="title"
            placeholder="Experience Name"
            label="What work/professional experience have you gained?"
            errorElementName="Experience Name"
          />
          <ValidatedTextInput
            name="summary"
            placeholder="Summary"
            label="Short summary of the experience"
            errorElementName="Summary"
          />
          <FieldArray
            name="bulletList"
            render={(arrayHelpers) => (
              <>
                <label style={{ fontWeight: 700, fontSize: ".92857143em" }}>
                  Description of the experience
                </label>
                <Segment style={{ minHeight: "3em" }}>
                  <List>
                    {values.bulletList.length > 0 &&
                      values.bulletList.map((bulletPoint, index) => (
                        <List.Item
                          id={"bulletPoint" + bulletPoint.id}
                          key={bulletPoint.id}
                          onMouseEnter={(
                            e: MouseEvent<HTMLDivElement, MouseEvent>
                          ) => {
                            setTarget(e.currentTarget.id);
                            setHoverListItem(true);
                          }}
                          onMouseLeave={() => setHoverListItem(false)}
                          onClick={() => arrayHelpers.remove(index)}
                          style={{ cursor: "pointer" }}
                        >
                          <List.Icon
                            verticalAlign="middle"
                            name={
                              hoverListItem &&
                              target === `bulletPoint${bulletPoint.id}`
                                ? "close"
                                : "circle"
                            }
                            size={
                              hoverListItem &&
                              target === `bulletPoint${bulletPoint.id}`
                                ? "small"
                                : "mini"
                            }
                          />
                          <List.Content>{bulletPoint.text}</List.Content>
                        </List.Item>
                      ))}
                  </List>
                </Segment>
                {bulletListError?.toString() ? (
                  <Label basic color="red">
                    {bulletListError.toString()}
                  </Label>
                ) : null}
                <ValidatedTextInput
                  name="bulletPoint"
                  placeholder="Add a bullet point to the description"
                  errorElementName="Description of the position"
                />
                <Button
                  className="positive--custom--inverted"
                  disabled={values.bulletPoint.length === 0}
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
                  style={{ display: "block", marginBottom: "1em" }}
                />
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
