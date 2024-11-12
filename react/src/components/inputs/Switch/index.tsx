import { ReactNode } from "react";
import { Form, FormCheckProps } from "react-bootstrap";

export interface Switch extends FormCheckProps {
  invalidMessages?: string | string[];
  validMessages?: string | string[];

  label?: ReactNode;
}

const Switch = ({
  invalidMessages,
  validMessages,
  isInvalid,
  isValid,
  label,
  ...rest
}: Switch) => {
  const getFeedback = () => {
    if (validMessages) {
      return cleanFeedback(validMessages);
    } else if (invalidMessages) {
      return cleanFeedback(invalidMessages);
    }
    return null;
  };

  const cleanFeedback = (feedback?: string | string[]) => {
    if (Array.isArray(feedback)) {
      return feedback.join(" ");
    } else {
      return feedback;
    }
  };

  const getFeedbackType = () => {
    if (isInvalid || Boolean(invalidMessages)) {
      return "invalid";
    } else if (isValid || Boolean(validMessages)) {
      return "valid";
    }
  };
  return (
    <Form.Group className="mb-3">
      <Form.Switch
        isInvalid={isInvalid || Boolean(invalidMessages)}
        isValid={isValid || Boolean(validMessages)}
        feedback={getFeedback()}
        feedbackType={getFeedbackType()}
        label={label}
        {...rest}
      />
    </Form.Group>
  );
};

export default Switch;
