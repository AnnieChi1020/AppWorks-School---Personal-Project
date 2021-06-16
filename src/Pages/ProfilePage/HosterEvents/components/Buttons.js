import React from "react";
import styled from "styled-components";

const Button = styled.button`
  font-size: 14px;
  line-height: 20px;
  padding: 3px 8px;
  margin-right: 5px;
  border: 1px solid #ced4da;
  border-radius: 5px;
`;

export const newButton = () => {
  return <Button />;
};
