import React, { Fragment } from "react";
import { Image, Item } from "semantic-ui-react";
import { PortfolioItem } from "../../../app/models/profile";
import { Document, Page } from "react-pdf/dist/umd/entry.webpack";
import "react-pdf/dist/umd/Page/AnnotationLayer.css";
import { useStore } from "../../../app/stores/store";

interface Props {
  portfolioItem: PortfolioItem;
}

export default function PortfolioItemElement({ portfolioItem }: Props) {
  const {
    fileStore: { openFilePreviewModal },
  } = useStore();

  return (
    <Item>
      <Item.Content className="file-thumbnail-container">
        {portfolioItem.files.map((file) => (
          <Fragment key={file.id}>
            <div className="file-thumbnail-card">
              {file.fileType.startsWith("image") ? (
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
              <div
                className="overlay asAButton"
                onClick={() => openFilePreviewModal(file)}
              ></div>
            </div>
          </Fragment>
        ))}
      </Item.Content>
      {/* <Item.Image src={portfolioItem.url} /> */}
      <Item.Header>{portfolioItem.description}</Item.Header>
    </Item>
  );
}
// {file.type.startsWith("image") ? (
//   <Image
//     src={file.preview}
//     size={"small"}
//     style={{ display: "inline-block" }}
//   />
// ) : (
//   <Document file={file.preview}>
//     <Page pageNumber={1} width={150} />
//   </Document>
// )}
