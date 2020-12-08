import Icon from "@ant-design/icons";
import React from "react";
import CustomIconProp from "./CustomIconPopsTypes";

const AddIcon = (props: CustomIconProp) => {
  const iconSize = props.size ? props.size : 30;
  const ExportSvg = () => (
    <svg
      version="1.1"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 30 30"
      fill={props.color ? props.color : ""}
    >
      <g id="Add">
        <path d="M14.5,0C6.505,0,0,6.505,0,14.5S6.505,29,14.5,29S29,22.495,29,14.5S22.495,0,14.5,0z M22.137,15H15v7.137   c0,0.276-0.224,0.5-0.5,0.5s-0.5-0.224-0.5-0.5V15H6.864c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5H14V6.864   c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5V14h7.137c0.276,0,0.5,0.224,0.5,0.5S22.413,15,22.137,15z"></path>
      </g>
    </svg>
  );
  return <Icon component={ExportSvg} {...props} />;
};

export default AddIcon;
