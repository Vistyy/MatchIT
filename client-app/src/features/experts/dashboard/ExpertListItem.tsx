import React from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import ScrollToTop from "../../../app/layout/ScrollToTop";
import { Profile } from "../../../app/models/profile";
import { useStore } from "../../../app/stores/store";

interface Props {
  expert: Profile;
}

export default function ExpertListItem({ expert }: Props) {
  const { expertStore } = useStore();
  const { filterDelay, setSkillPredicate, skillPredicate } = expertStore;

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
        <Button.Group>
          {expert.skills.map((skill) => (
            <Button
              as={Link}
              to={"/experts"}
              onClick={() => {
                clearTimeout(filterDelay);
                if (
                  !Array.from(skillPredicate.values())[0].includes(skill.name)
                )
                  setSkillPredicate(skill.name);
                return <ScrollToTop />;
              }}
              key={skill.id}
              content={skill.name}
            />
          ))}
        </Button.Group>
      </Segment>
    </Segment.Group>
  );
}
