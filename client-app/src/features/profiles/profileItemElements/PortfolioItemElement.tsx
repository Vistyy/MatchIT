import React from "react";
import { Card, Image } from "semantic-ui-react";
import { PortfolioItem } from "../../../app/models/profile";
import { Document, Page } from "react-pdf/dist/umd/entry.webpack";
import "react-pdf/dist/umd/Page/AnnotationLayer.css";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

interface Props {
  portfolioItem: PortfolioItem;
}

export default observer(function PortfolioItemElement({
  portfolioItem,
}: Props) {
  const {
    fileStore: { openFilePreviewModal },
  } = useStore();

  return (
    <Card style={{ width: "100%" }} raised>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          padding: "10px",
        }}
      >
        {portfolioItem.attachments.map((file) => (
          <div key={file.id} className="file-thumbnail-container">
            <Card className="file-thumbnail-card">
              {file.url.startsWith("blob") ? (
                <>
                  {file.resourceType.includes("image") ? (
                    <Image
                      src={file.url}
                      size={"small"}
                      style={{ display: "inline-block" }}
                    />
                  ) : (
                    <Document file={file.url}>
                      <Page pageNumber={1} width={150} />
                    </Document>
                  )}
                </>
              ) : (
                <Image
                  src={
                    file.url.endsWith(".pdf")
                      ? file.url.replace(new RegExp(".pdf$"), ".png")
                      : file.url
                  }
                  size={"small"}
                  style={{ display: "inline-block" }}
                />
              )}
              <div
                className="overlay asAButton"
                onClick={() => openFilePreviewModal(file)}
              ></div>
            </Card>
          </div>
        ))}
      </div>
      <Card.Header className="portfolioItem-nameHeader" style={{}}>
        {portfolioItem.description}
      </Card.Header>
    </Card>
  );
});
