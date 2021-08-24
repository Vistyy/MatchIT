import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="logo.svg"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          MatchIT
        </Header>
        <>
          <Header as="h2" inverted content="Welcome to MatchIT" />
          <Button as={Link} to="/dashboard" size="huge" inverted>
            Hire a freelancer
          </Button>
          <Button as={Link} to="/" size="huge" inverted>
            Become a freelancer
          </Button>
        </>
      </Container>
    </Segment>
  );
});
