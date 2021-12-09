import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import { useStore } from "../../../app/stores/store";

interface Props {
  expert: Profile;
}

export default observer(function ExpertListItem({ expert }: Props) {
  const {
    expertStore: { setSkillPredicate, skillPredicate },
  } = useStore();

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              src={expert.photo?.url || "/assets/user.png"}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/profiles/${expert.userName}`}>
                {expert.displayName}
              </Item.Header>
              <Item.Description>{expert.bio}</Item.Description>
              {/* <UserRating rating={expert.rating} disabled /> */}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment className="skillList-container">
        {expert.skills.map((skill) => (
          <Button
          size="small"
            className="skillList-skillButton"
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
