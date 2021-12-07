import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import * as Yup from "yup";
import FileAddWidget from "../../../../app/common/fileUpload/add/FileAddWidget";
import ValidatedTextArea from "../../../../app/common/form/ValidatedTextArea";
import ValidatedTextInput from "../../../../app/common/form/ValidatedTextInput";
import { useStore } from "../../../../app/stores/store";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

export default observer(function JobBidForm({ setEditMode }: Props) {
  const {
    jobStore: { job, addJobBid },
    fileStore: { temporaryFiles, resetState },
  } = useStore();
  // const [onlyOneFile, setOnlyOneFile] = useState(false);

  // useEffect(() => {
  //   if (temporaryFiles.size > 1) {
  //     setOnlyOneFile(true);
  //     resetState();
  //   } else {
  //     setOnlyOneFile(false);
  //   }
  // }, [resetState, temporaryFiles.size]);

  return (
    <>
      <Formik
        initialValues={{
          jobBidDescription: "",
          jobBidFee: 0,
          error: null,
        }}
        onSubmit={(jobBidFormValues, { setErrors }) => {
          if (job) {
            try {
              addJobBid(
                jobBidFormValues,
                Array.from(temporaryFiles.values())[0]
              ).then(() => {
                resetState();
                setEditMode(false);
              });
            } catch (error: any) {
              setErrors({ error });
            }
          }
        }}
        onReset={(values, { resetForm }) => resetForm()}
        validationSchema={Yup.object({
          jobBidDescription: Yup.string(),
          jobBidFee: Yup.number().min(1).required(),
        })}
      >
        {({ handleSubmit, isValid }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <ValidatedTextArea
              name="jobBidDescription"
              placeholder="Job Bid Description"
              label="Job Bid Description"
              errorElementName="Job Bid Description"
              rows={3}
            />
            <ValidatedTextInput
              type="number"
              name="jobBidFee"
              label="Job Bid Fee"
              placeholder="Job Bid Fee"
              errorElementName="Job Bid Fee"
            />
            <Grid>
              <Header content="Add CV" />
              <FileAddWidget maxFiles={1} />
            </Grid>
            <Button
              content="Add"
              size="big"
              style={{ fontSize: "1.35em", marginTop: "50px" }}
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
    </>
  );
});
