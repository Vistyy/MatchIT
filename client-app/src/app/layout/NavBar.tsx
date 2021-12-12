import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
import LoginForm from "../../features/users/LoginForm";
import RegisterForm from "../../features/users/RegisterForm";
import { useStore } from "../stores/store";

export default observer(function NavBar() {
  const {
    userStore: { user, logout, isLoggedIn },
    modalStore,
  } = useStore();
  return (
    <Menu inverted fixed="top" className="navbar--menu">
      <Container>
        <Menu.Item as={Link} exact to="/" header>
          <img src="/assets/logo.svg" alt="logo" />
          MatchIT
        </Menu.Item>
        <>
          <Menu.Item as={Link} to="/" name="Experts" />
          <Menu.Item as={Link} to="/jobs" name="Jobs" />
          {isLoggedIn() ? (
            <Menu.Menu fixed="top" position="right">
              {user && (
                <Menu.Item position="right">
                  <Button
                    as={Link}
                    to="/addJob"
                    content="Add New Job Offer"
                    inverted
                    className="positive--custom--inverted"
                  />
                </Menu.Item>
              )}
              {user && !user.isExpert && (
                <Menu.Item position="right" style={{ paddingLeft: "0" }}>
                  <Button
                    as={Link}
                    to="/becomeExpert"
                    content="Become an expert"
                    inverted
                    className="positive--custom--inverted"
                  />
                </Menu.Item>
              )}
              <Menu.Item
                position="right"
                style={{
                  position: "relative",
                  minWidth: "8em",
                  width: "max-content",
                  paddingLeft: "10px",
                }}
                fitted="horizontally"
              >
                <Image
                  src={user?.photo?.url || "/assets/user.png"}
                  avatar
                  spaced="right"
                />
                <Dropdown
                  item
                  pointing="top right"
                  text={user?.displayName}
                  className="navbar-profile--dropdown"
                >
                  <Dropdown.Menu style={{ marginTop: "0.35em" }}>
                    <Dropdown.Item
                      as={Link}
                      to={`/profiles/${user?.userName}`}
                      text="My Profile"
                      icon="user"
                    />
                    <Dropdown.Item
                      as={Link}
                      to={`/jobs/user/${user?.userName}`}
                      text="My Jobs"
                      icon="suitcase"
                    />
                    <Dropdown.Item
                      onClick={logout}
                      text="Logout"
                      icon="power"
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            </Menu.Menu>
          ) : (
            <Menu.Menu fixed="top" position="right">
              <Menu.Item position="right">
                <Button
                  onClick={() => modalStore.openModal(<LoginForm />)}
                  size="huge"
                  inverted
                  style={{ marginRight: "1em" }}
                  className="positive--custom--inverted"
                >
                  Login
                </Button>
                <Button
                  onClick={() => modalStore.openModal(<RegisterForm />)}
                  size="huge"
                  inverted
                  className="positive--custom--inverted"
                >
                  Register
                </Button>
              </Menu.Item>
            </Menu.Menu>
          )}
        </>
      </Container>
    </Menu>
  );
});
