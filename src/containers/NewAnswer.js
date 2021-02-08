import React, { useState } from "react";
import { Form, Card } from "react-bootstrap";
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
  const [answer, setAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.context.length > 0 &&
      fields.context.length <= 1000 &&
      fields.question.length > 0
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const authenticatedUser = await Auth.currentAuthenticatedUser();
      const token = authenticatedUser.signInUserSession.idToken.jwtToken;

      const requestData = {
        headers: {
          Authorization: token
        },
        body: {
          context: fields.context,
          question: fields.question
        }
      }

      const answer = await API.post('getanswerapi', '/v1', requestData);
      setIsLoading(false);
      setAnswer(answer);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderAnswerValue() {
    return (
      <div className="text-center">
        <p></p>
        <Card bg="success" text="white">
          <Card.Body>{answer.body}</Card.Body>
        </Card>
      </div>
    )
  }

  function renderAnswerNull() {
    return (
      <div className="text-center">
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
      {answer === null ? renderAnswerNull() : renderAnswerValue()}
    </div>
  );
}