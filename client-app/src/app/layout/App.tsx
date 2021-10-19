import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import { ToastContainer } from "react-toastify";
import ModalContainer from "../common/modals/ModalContainer";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import PrivateRoute from "./PrivateRoute";
import TestErrors from "../../features/errors/TestErrors";
import ServerError from "../../features/errors/ServerError";
import RegisterSuccess from "../../features/users/RegisterSuccess";
import ConfirmEmail from "../../features/users/ConfirmEmail";
import NotFound from "../../features/errors/NotFound";
import ExpertDashboard from "../../features/experts/dashboard/ExpertDashboard";
import ProfilePage from "../../features/profiles/ProfilePage";
import BecomeExpert from "../../features/profiles/becomeExpertForm/BecomeExpert";

function App() {
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent content="Loading app..." />;

  return (
    <>
      <ToastContainer position="bottom-left" hideProgressBar />
      <ModalContainer />
      {/* <Route exact path="/" component={HomePage} /> */}
      <Route
        path={"/"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/" component={ExpertDashboard} />
                <Route
                  path="/profiles/:username"
                  component={ProfilePage}
                />
                <PrivateRoute path="/becomeExpert" component={BecomeExpert} />
                <Route path="/errors" component={TestErrors} />
                <Route path="/server-error" component={ServerError} />
                <Route
                  path="/account/registerSuccess"
                  component={RegisterSuccess}
                />
                <Route path="/account/verifyEmail" component={ConfirmEmail} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
