import React from "react";
import { Link } from "react-router-dom";
import { Header, Image, Item, Popup } from "semantic-ui-react";
import { Profile } from "../../models/profile";

interface Props {
    profile: Profile;
}

export default function ProfilePopup({profile}: Props) {
    return (
        <Popup
                  header={
                    <Header>
                      <Image
                        avatar
                        src={profile.image?.url || "/assets/user.png"}
                      />
                      <Header
                        style={{ marginLeft: "4px", display: "inline" }}
                      >
                        {profile.displayName}
                      </Header>
                    </Header>
                  }
                  // content={
                  //   <UserRating
                  //     rating={profile.rating}
                  //     disabled
                  //   />
                  // }
                  hoverable
                  trigger={
                    <Item.Header as="h4" style={{ display: "inline" }}>
                      <Link to={`/profiles/${profile.userName}`}>
                        {profile.displayName}
                      </Link>
                    </Item.Header>
                  }
                ></Popup>
    )
}