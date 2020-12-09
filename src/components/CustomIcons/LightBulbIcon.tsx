import Icon from "@ant-design/icons";
import React from "react";
import CustomIconProp from "./CustomIconPopsTypes";

const LightBulbIcon = (props: CustomIconProp) => {
  const iconSize = props.size ? props.size : "1em";
  const ImportSvg = () => (
    <svg
      version="1.1"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 30 30"
      fill={props.color ? props.color : ""}
    >
      <g id="Lightbulb">
        <g>
          <path d="M15-0.027c-5.49,0-9.957,4.473-9.957,9.97c0,2.637,1.667,4.878,3.137,6.856c0.251,0.339,0.5,0.674,0.739,1.007    c0.486,0.68,0.801,1.228,0.977,2.019C10.189,21.146,11.318,22,12.771,22h4.459c1.453,0,2.582-0.853,2.874-2.173    c0.17-0.769,0.463-1.403,0.977-2.123c0.255-0.355,0.521-0.711,0.79-1.07c1.518-2.027,3.086-4.123,3.086-6.731    C24.956,4.427,20.49-0.027,15-0.027z"></path>
          <path d="M18.5,24h-7c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5h7c0.276,0,0.5-0.224,0.5-0.5S18.776,24,18.5,24z"></path>
          <path d="M18.5,26h-7c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5h7c0.276,0,0.5-0.224,0.5-0.5S18.776,26,18.5,26z"></path>
          <path d="M17.5,28h-5c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5h5c0.276,0,0.5-0.224,0.5-0.5S17.776,28,17.5,28z"></path>
        </g>
      </g>
    </svg>
  );
  return <Icon component={ImportSvg} {...props} />;
};

export default LightBulbIcon;
