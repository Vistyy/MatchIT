import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
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
        <Menu.Item as={NavLink} exact to="/" header>
          <img src="/assets/logo.svg" alt="logo" />
          MatchIT
        </Menu.Item>
        <>
          <Menu.Item as={NavLink} to="/becomeExpert" name="First link" />
          <Menu.Item as={NavLink} to="/" name="Second link" />
          {isLoggedIn() ? (
            <Menu.Menu fixed="top" position="right">
              {user && !user.isExpert && (
                <Menu.Item position="right">
                  <Button
                    as={NavLink}
                    to="/becomeExpert"
                    content="Become an expert"
                    inverted
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
                  src={user?.image?.url || "/assets/user.png"}
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
                      to={`/profiles/${user?.username}`}
                      text="My Profile"
                      icon="user"
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
                >
                  Login
                </Button>
                <Button
                  onClick={() => modalStore.openModal(<RegisterForm />)}
                  size="huge"
                  inverted
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
