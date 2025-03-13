import React from "react";
import "../styles/Container.scss";

export default function Container({ children }) {
  return <div className="container">{children}</div>;
}
