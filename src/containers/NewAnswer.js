import React, { useState } from "react";
import { Form, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";
import { API, Auth } from "aws-amplify";
import "./NewAnswer.css";

export default function NewAnswer() {
  const [fields, handleFieldChange] = useFormFields({
    context: "",
    question: ""
  });

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.context.length > 0 &&
      fields.question.length > 0
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const user = await Auth.currentAuthenticatedUser();
      await callAPI(user);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  async function callAPI(user) {
    const token = user.signInUserSession.idToken.jwtToken
    const requestData = {
      headers: {
        Authorization: token
      },
      body: {
        context: fields.context,
        question: fields.question
      }
    }
    // console.log(data.body)
    return await API.post('getanswerapi', '/v1', requestData);
  }

  function getAnswer() {
    console.log("hey");
    return (
      <div className="answer">
        <p></p>
        <Card>
          <Card.Body></Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="NewQAPair">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="context">
          <Form.Label>Context</Form.Label>
          <Form.Control
            as="textarea"
            onChange={handleFieldChange}
            value={fields.context}
          />
        </Form.Group>
        <Form.Group controlId="question">
          <Form.Label>Question</Form.Label>
          <Form.Control
            onChange={handleFieldChange}
            value={fields.question}
          />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Get answer
        </LoaderButton>
      </Form>
      {getAnswer()}
    </div>
  );
}