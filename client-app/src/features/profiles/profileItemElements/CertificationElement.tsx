import { format } from "date-fns";
import React from "react";
import { Item } from "semantic-ui-react";
import { Certification } from "../../../app/models/profile";

interface Props {
  certificate: Certification;
}

export default function CertificationElement({ certificate }: Props) {
  return (
    <Item>
      <Item.Content>
        <Item.Header as="h2">{certificate.name}</Item.Header>
        <Item.Meta>{`${format(
          new Date(certificate.dateAcquired),
          "yyyy-MM-dd"
        )}`}</Item.Meta>
        {certificate.certificate && (
          <Item.Image>{certificate.certificate}</Item.Image>
        )}
      </Item.Content>
    </Item>
  );
}
