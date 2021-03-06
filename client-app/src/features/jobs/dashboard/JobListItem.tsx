import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import ProfilePopup from "../../../app/common/profile/ProfilePopup";
import { Job } from "../../../app/models/job";
import { useStore } from "../../../app/stores/store";

interface Props {
  job: Job;
}

export default observer(function JobListItem({ job }: Props) {
  const {
    jobStore: { setSkillPredicate, skillPredicate },
  } = useStore();

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header as={Link} to={`/jobs/${job.id}`}>
                {job.title}
              </Item.Header>
              <Item.Meta>
                <ProfilePopup profile={job.employer} />
              </Item.Meta>
              <Item.Meta>
                {`Posted on: ${format(
                  new Date(job.creationTime),
                  "dd-MM-yyyy"
                )}`}
              </Item.Meta>
              <Item.Description>{job.description}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment className="skillList-container">
        {job.requiredSkills.map((skill) => (
          <Button
            className="skillList-skillButton"
            as={Link}
            to={`/jobs`}
            key={skill.id}
            content={skill.name}
            disabled={Array.from(skillPredicate.values())[0]
              .split(",")
              .includes(skill.name)}
            onClick={() => {
              setSkillPredicate(skill.name);
            }}
          />
        ))}
      </Segment>
    </Segment.Group>
  );
});
