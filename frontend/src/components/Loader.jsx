import { Spinner } from "react-bootstrap";

export const Loader = () => {
  return (
    <Spinner
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
    />
  );
};
