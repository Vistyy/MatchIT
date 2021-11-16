import React from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import { useStore } from "../../../app/stores/store";

interface Props {
  expert: Profile;
}

export default function ExpertListItem({ expert }: Props) {
  const { expertStore } = useStore();
  const { setSkillPredicate, skillPredicate } = expertStore;

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
              <Item.Header as={Link} to={`/profiles/${expert.username}`}>
                {expert.username}
              </Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        {expert.skills.map((skill) => (
          <Button
            className="expertList--filterButton"
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
}
