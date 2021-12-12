import React, { KeyboardEvent, MouseEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { FieldArray, Form, Formik } from "formik";
import ValidatedTextInput from "../../../../app/common/form/ValidatedTextInput";
import ValidatedDatePicker from "../../../../app/common/form/ValidatedDatePicker";
import * as Yup from "yup";
import { Button, Icon, Label, List, Segment } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import { BulletPoint } from "../../../../app/models/profile";
import { v4 as uuid } from "uuid";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

export default observer(function EmploymentForm({ setEditMode }: Props) {
  const {
    profileStore: { addEmploymentItem },
  } = useStore();
  const [hoverListItem, setHoverListItem] = useState(false);
  const [target, setTarget] = useState("");

  return (
    <Formik
      initialValues={{
        companyName: "",
        companyPosition: "",
        employedFrom: new Date(),
        employedTo: new Date(),
        bulletPoint: "",
        jobBulletList: [] as BulletPoint[],
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
        bulletPoint: Yup.string(),
        jobBulletList: Yup.array()
          .min(1, "The description must have at least 1 bullet point")
          .required(),
      })}
    >
      {({
        handleSubmit,
        isValid,
        values,
        errors: { jobBulletList: bulletListError },
        setFieldValue,
      }) => (
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
          <FieldArray
            name="jobBulletList"
            render={(arrayHelpers) => (
              <>
                <label style={{ fontWeight: 700, fontSize: ".92857143em" }}>
                  Description of the position
                </label>

                <Segment>
                  <List>
                    {values.jobBulletList.length > 0 &&
                      values.jobBulletList.map((bulletPoint, index) => (
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
