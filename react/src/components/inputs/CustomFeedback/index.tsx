import Feedback, { FeedbackProps } from "react-bootstrap/esm/Feedback";

interface CustomFeedbackProps extends FeedbackProps {
  messages?: string | string[];
}

const CustomFeedback = ({ messages, ...rest }: CustomFeedbackProps) => {
  if (Array.isArray(messages)) {
    return (
      <Feedback {...rest}>
        {messages.map((message, index) => (
          <span key={index}>
            {message}
            {index < messages.length - 1 && <br />}
          </span>
        ))}
      </Feedback>
    );
  } else if (typeof messages === "string") {
    return <Feedback {...rest}>{messages}</Feedback>;
  }

  return null;
};

export default CustomFeedback;
