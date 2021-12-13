import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import FileUploadWidget from "../../../app/common/fileUpload/upload/FileUploadWidget";
import { useStore } from "../../../app/stores/store";

export default observer(function ProfileCV() {
  const {
    profileStore: { isCurrentUser, profile, addCV },
    fileStore: { openFilePreviewModal },
  } = useStore();

  const [addCVMode, setAddCVMode] = useState(false);

    useEffect(() => {
      if (profile && profile.cv) {
        setAddCVMode(false);
      }
    }, [profile, profile?.cv]);

  return (
    <>
      {!isCurrentUser && profile && profile.cv && (
        <div className="file-thumbnail-container" style={{ float: "right" }}>
          <Card className="file-thumbnail-card">
            <Image
              src={
                profile.cv.url.endsWith(".pdf")
                  ? profile.cv.url.slice().replace(new RegExp(".pdf$"), ".png")
                  : profile.cv.url
              }
              size={"small"}
              style={{ display: "inline-block" }}
            />
            <div
              className="overlay asAButton"
              onClick={() => openFilePreviewModal(profile.cv)}
            ></div>
          </Card>
        </div>
      )}
      {isCurrentUser &&
        profile &&
        (profile.cv ? (
          <>
            {!addCVMode ? (
              <>
                <Button
                  className="positive--custom--inverted"
                  content="Change CV"
                  onClick={() => setAddCVMode(true)}
                  floated="right"
                  style={{ marginBottom: "1.2em" }}
                />
                <div
                  className="file-thumbnail-container"
                  style={{ float: "right" }}
                >
                  <Card className="file-thumbnail-card">
                    <Image
                      src={
                        profile.cv.url.endsWith(".pdf")
                          ? profile.cv.url
                              .slice()
                              .replace(new RegExp(".pdf$"), ".png")
                          : profile.cv.url
                      }
                      size={"small"}
                      style={{ display: "inline-block" }}
                    />
                    <div
                      className="overlay asAButton"
                      onClick={() => openFilePreviewModal(profile.cv)}
                    ></div>
                  </Card>
                </div>
              </>
            ) : (
              <>
                <Button
                  content="Cancel"
                  onClick={() => setAddCVMode(false)}
                  floated="right"
                  className="positive--custom--inverted"
                  style={{ marginBottom: "1.2em" }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    maxWidth: "100%",
                  }}
                >
                  <FileUploadWidget uploadFile={addCV} />
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {!addCVMode ? (
              <Button
                className="positive--custom--inverted"
                content="Add CV"
                onClick={() => setAddCVMode(true)}
                floated="right"
                style={{ marginBottom: "1.2em" }}
              />
            ) : (
              <>
                <Button
                  className="positive--custom--inverted"
                  content="Cancel"
                  onClick={() => setAddCVMode(false)}
                  floated="right"
                  style={{ marginBottom: "1.2em" }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    maxWidth: "100%",
                  }}
                >
                  <FileUploadWidget uploadFile={addCV} />
                </div>
              </>
            )}
          </>
        ))}
    </>
  );
});
