import { observer } from "mobx-react-lite";
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
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
          <img src="logo192.png" alt="logo" />
          MatchIT
        </Menu.Item>
        <>
          <Menu.Item as={NavLink} to="/" name="First link" />
          <Menu.Item as={NavLink} to="/" name="Second link" />
          {isLoggedIn ? (
            <Menu.Item position="right">
              <Image src="logo192.png" avatar spaced="right" />
              <Dropdown pointing="top left" text={user?.displayName}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={`/profiles/${user?.username}`}
                    text="My Profile"
                    icon="user"
                  />
                  <Dropdown.Item onClick={logout} text="Logout" icon="power" />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          ) : (
            <>
              <Menu.Item position="right">
                <Button
                  onClick={() => modalStore.openModal(<LoginForm />)}
                  size="huge"
                  inverted
                >
                  Login
                </Button>
              </Menu.Item>
              <Menu.Item position="right">
                <Button
                  onClick={() => modalStore.openModal(<RegisterForm />)}
                  size="huge"
                  inverted
                >
                  Register
                </Button>
              </Menu.Item>
            </>
          )}
        </>
      </Container>
    </Menu>
  );
});
