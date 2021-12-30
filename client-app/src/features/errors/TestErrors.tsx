import axios from "axios";
import React from "react";
import { useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import ValidationErrors from "./ValidationErrors";

export default function TestErrors() {
  const [errors, setErrors] = useState(null);

  function handleNotFound() {
    axios.get("/buggy/not-found").catch((err) => console.log(err.response));
  }
  function handleBadRequest() {
    axios.get("/buggy/bad-request").catch((err) => console.log(err.response));
  }
  function handleServerError() {
    axios.get("/buggy/server-error").catch((err) => console.log(err.response));
  }
  function handleUnauthorized() {
    axios.get("/buggy/unauthorized").catch((err) => console.log(err.response));
  }

  function handleValidationError() {
    axios.post(``, {}).catch((err) => setErrors(err));
  }

  return (
    <>
      <Header as="h1" content="Test Error component" />
      <Segment>
        <Button.Group widths={5}>
          <Button onClick={handleNotFound} content="Not Found" basic primary />
          <Button
            onClick={handleBadRequest}
            content="Bad Request"
            basic
            primary
          />
          <Button
            onClick={handleServerError}
            content="Server Error"
            basic
            primary
          />
          <Button
            onClick={handleUnauthorized}
            content="Unauthorized"
            basic
            primary
          />
          <Button
            onClick={handleValidationError}
            content="Validation Error"
            basic
            primary
          />
        </Button.Group>
      </Segment>
      {errors && <ValidationErrors errors={errors} />}
    </>
  );
}
