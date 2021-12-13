import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";

export default observer(function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.svg"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          MatchIT
        </Header>
        <>
          <Header as="h2" inverted content="Welcome to MatchIT" />
          <Button as={Link} to="/experts" size="huge" inverted>
            Search for an expert
          </Button>
          <Button as={Link} to="/jobs" size="huge" inverted>
            Search for a job opportunity
          </Button>
        </>
      </Container>
    </Segment>
  );
});
