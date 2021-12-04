import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import ValidatedTextInput from "../../../app/common/form/ValidatedTextInput";
import ValidatedTextArea from "../../../app/common/form/ValidatedTextArea";
import FileAddWidget from "../../../app/common/fileUpload/FileAddWidget";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";
import RequiredJobSkills from "./RequiredJobSkills";

export default observer(function AddJob() {
  const {
    jobStore: { addJob, job, resetJob, requiredSkills, resetRequiredSkills },
    fileStore: { temporaryFiles, resetState },
  } = useStore();

  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (job !== null) resetJob();
  });

  useEffect(() => {
    resetRequiredSkills();
  }, [resetRequiredSkills]);

  useEffect(() => {
      if(requiredSkills.length === 0) setDisableButton(true);
      else setDisableButton(false);
  }, [requiredSkills.length])
  return (
    <>
      <Formik
        initialValues={{
          jobTitle: "",
          jobDescription: "",
          error: null,
        }}
        onSubmit={(jobFormValues, { setErrors }) => {
          try {
            addJob(jobFormValues, temporaryFiles);
            resetState();
          } catch (error: any) {
            setErrors({ error });
          }
        }}
        validationSchema={Yup.object({
          jobTitle: Yup.string().required(),
          jobDescription: Yup.string().required(),
        })}
      >
        {({ handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <Segment style={{ padding: "20px 40px" }}>
              <Grid>
                <Grid.Column width="16">
                  <ValidatedTextInput
                    name="jobTitle"
                    placeholder="Job Title"
                    label="Job Title"
                  />
                  <ValidatedTextArea
                    name="jobDescription"
                    placeholder="Job Description"
                    label="Job Description"
                    rows={3}
                  />
                  <RequiredJobSkills />
                </Grid.Column>
              </Grid>
              <Grid>
                <FileAddWidget />
              </Grid>
              <Button
                content="Add"
                size="big"
                style={{ fontSize: "1.35em", marginTop: "50px" }}
                type="submit"
                className="positive--custom"
                disabled={disableButton}
              />
            </Segment>
          </Form>
        )}
      </Formik>
    </>
  );
});
