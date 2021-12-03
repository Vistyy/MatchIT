import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import UserRating from "../../../app/common/profile/UserRating";
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
              src={expert.image?.url || "/assets/user.png"}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/profiles/${expert.userName}`}>
                {expert.userName}
              </Item.Header>
              <Item.Description>{expert.bio}</Item.Description>
              <UserRating rating={expert.rating} disabled />
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment style={{ boxSizing: "border-box" }}>
        {expert.skills.map((skill) => (
          <Button
            className="skillList-skillButton"
            as={Link}
            to={`/`}
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
