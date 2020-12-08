import { Card } from "antd";
import React from "react";
import { AddIcon } from "..";

interface IAddCurrencyProps {
  handleAddCurrency?(): any;
}

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  //border: "1px solid silver",
};
function AddCurrencyCard(props: IAddCurrencyProps) {
  return (
    <Card
      bordered={true}
      hoverable={true}
      onClick={props.handleAddCurrency}
      style={{ ...style, textAlign: "center" }}
    >
      <AddIcon />
      <h3>Add Currency</h3>
    </Card>
  );
}

export default AddCurrencyCard;
