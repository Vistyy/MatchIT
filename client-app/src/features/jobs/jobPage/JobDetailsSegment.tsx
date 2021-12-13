import { format } from "date-fns";
import React from "react";
import { Item, Label, Segment } from "semantic-ui-react";
import ProfilePopup from "../../../app/common/profile/ProfilePopup";
import { Job } from "../../../app/models/job";

interface Props {
    job: Job;
}

export default function JobDetailsSegment({job}: Props) {
    return (
        <Segment>
              <Item>
                <Item.Content>
                  <Item.Header
                    as="h2"
                    style={{ marginBottom: "0", display: "inline" }}
                    content={job.title}
                  />
                  <h4 style={{ display: "inline", marginLeft: "5px" }}> by </h4>
                  <ProfilePopup profile={job.employer} />
                  <Item.Meta></Item.Meta>
                  <Item.Meta>{`Posted on: ${format(
                    new Date(job.creationTime),
                    "dd-MM-yyyy"
                  )}`}</Item.Meta>
                  <Item.Description>{job.description}</Item.Description>
                  <Item.Extra>
                    {job.requiredSkills.map((skill) => (
                      <Label key={skill.id} content={skill.name} />
                    ))}
                  </Item.Extra>
                </Item.Content>
              </Item>
            </Segment>
    )
}