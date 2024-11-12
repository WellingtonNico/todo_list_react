import { ReactNode } from "react";
import { Form, FormControlProps } from "react-bootstrap";
import CustomFeedback from "../CustomFeedback";

export interface InputProps extends FormControlProps {
  invalidMessages?: string | string[];
  validMessages?: string | string[];
  label?: ReactNode;
}

const Input = ({
  invalidMessages,
  validMessages,
  isInvalid,
  isValid,
  label,
  ...rest
}: InputProps) => {
  return (
    <Form.Group className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        isInvalid={isInvalid || Boolean(invalidMessages)}
        isValid={isValid || Boolean(validMessages)}
        {...rest}
      />
      {validMessages && (
        <CustomFeedback messages={validMessages} type="valid" />
      )}
      {invalidMessages && (
        <CustomFeedback messages={invalidMessages} type="invalid" />
      )}
    </Form.Group>
  );
};

export default Input;
