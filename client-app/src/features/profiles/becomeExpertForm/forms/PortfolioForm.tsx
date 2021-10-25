import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Image } from "semantic-ui-react";
import FileAddWidget from "../../../../app/common/fileUpload/FileAddWidget";
import PhotoUploadWidget from "../../../../app/common/imageUpload/PhotoUploadWidget";
import { useStore } from "../../../../app/stores/store";

export default observer(function PortfolioForm() {
  return (
    <>
      <FileAddWidget />
    </>
  );
});
