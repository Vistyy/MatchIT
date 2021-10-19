import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Image } from "semantic-ui-react";
import FileAddWidget from "../../../../app/common/fileUpload/FileAddWidget";
import PhotoUploadWidget from "../../../../app/common/imageUpload/PhotoUploadWidget";
import { useStore } from "../../../../app/stores/store";

export default observer(function PortfolioForm() {
  const {
    profileStore: {
      profile,
      addFile,
      addPortfolioItem,
      currentPortfolioItemId,
      temporaryFiles,
    },
  } = useStore();

  return (
    <>
      <FileAddWidget addFile={addFile} />
      {currentPortfolioItemId &&
        Array.from(temporaryFiles).map(([id, file]) => (
          // <>
          //   <Formik
          //     initialValues={{ title: "", summary: "", formattedText: "" }}
          //     onSubmit={(values) => {}}
          //   ></Formik>
          // </>
          <Image key={id} src={URL.createObjectURL(file)} size="medium" />
        ))}
    </>
  );
});
