import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Grid, Header } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import FileWidgetDropzone from "./FileWidgetDropzone";

interface Props {
  uploadFile: (file: Blob) => void;
}

export default observer(function FileUploadWidget({ uploadFile }: Props) {
  const {
    profileStore: { loading, uploading },
  } = useStore();
  const [files, setFiles] = useState<any>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  useEffect(() => {
    setLoader(loading || uploading);
  }, [loading, uploading]);

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 1 - Add Photo" />
        <FileWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
    </Grid>
  );
});
