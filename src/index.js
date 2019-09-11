import React from "react";
import MaskedInput from "react-text-mask";
import styled from "styled-components";
import { codeFontFamily, gridSize, fontSize } from "@atlaskit/theme/constants";
import * as componentTokens from "./componentTokens";

const disabledRules = {
  light: {
    backgroundColor: componentTokens.defaultBackgroundColor.light,
    backgroundColorFocus: componentTokens.disabledBackgroundColor.light,
    backgroundColorHover: componentTokens.disabledBackgroundColor.light,
    borderColor: componentTokens.defaultBorderColor.light,
    borderColorFocus: componentTokens.defaultBorderColorFocus.light,
    textColor: componentTokens.disabledTextColor.light
  },
  dark: {
    backgroundColor: componentTokens.defaultBackgroundColor.dark,
    backgroundColorFocus: componentTokens.disabledBackgroundColor.dark,
    backgroundColorHover: componentTokens.disabledBackgroundColor.dark,
    borderColor: componentTokens.defaultBorderColor.dark,
    borderColorFocus: componentTokens.defaultBorderColorFocus.dark,
    textColor: componentTokens.disabledTextColor.dark
  }
};

const getMaxWidth = ({ width }) => {
  if (!width) return `100%`;
  switch (width) {
    case "xsmall":
      return "80px";
    case "small":
      return "160px";
    case "medium":
      return "240px";
    case "large":
      return "320px";
    case "xlarge":
      return "480px";
    default:
      return `${width}px`;
  }
};

const getPlaceholderColor = ({ isDisabled, mode }) =>
  isDisabled
    ? disabledRules[mode].textColor
    : componentTokens.placeholderTextColor[mode];

// can't group these placeholder styles into one block because browsers drop
// entire style blocks when any single selector fails to parse
const getPlaceholderStyle = props => ({
  "&::WebkitInputPlaceholder": {
    /* WebKit, Blink, Edge */
    color: getPlaceholderColor(props)
  },
  "&::MozPlaceholder": {
    /* Mozilla Firefox 19+ */
    color: getPlaceholderColor(props),
    opacity: 1
  },
  "&::MsInputPlaceholder": {
    /* Microsoft Edge */
    color: getPlaceholderColor(props)
  },
  "&:MsInputPlaceholder": {
    /* Internet Explorer 10-11 */
    color: getPlaceholderColor(props)
  }
});

const Container = styled.div`
  align-items: center;
  background-color: rgb(250, 251, 252);
  border-color: rgb(223, 225, 230);
  border-radius: 3px;
  border-width: 2px;
  border-style: ${props => (props.appearance === "none" ? "none" : "solid")};
  box-sizing: border-box;
  color: ${props => {
    window.props = props;
    console.log(props);
    return props.isDisabled
      ? componentTokens.disabledTextColor.light
      : componentTokens.textColor.light;
  }};
  cursor: ${props => (props.isDisabled ? "not-allowed" : "text")};
  display: flex;
  font-size: ${fontSize()}px;
  justify-content: space-between;
  max-width: ${props => getMaxWidth(props)};
  overflow: hidden;
  word-wrap: bread-word;
  transition: background-color 0.2s ease-in-out 0s,
    border-color 0.2s ease-in-out 0s;
  vertical-align: top;
  pointer-events: auto;
`;

const Masked = styled(MaskedInput)`
  background-color: transparent;
  border: 0;
  box-sizing: border-box;
  color: inherit;
  cursor: inherit;
  font-family: ${props => (props.isMonospaced ? codeFontFamily() : "inherit")};
  font-size: ${fontSize()}px;
  min-width: 0;
  outline: none;
  padding: ${props =>
    `${props.isCompact ? gridSize() / 2 : gridSize()}px ${gridSize() - 2}px`};
  width: 100%;
  height: ${props =>
    `${(props.isCompact ? gridSize() * 3.5 : gridSize() * 4.5) /
      fontSize()}em`};
  line-height: ${(gridSize() * 2.5) / fontSize()};
  :disabled {
    -webkit-text-fill-color: unset;
    -webkit-opacity: 1;
  }
  ::-ms-clear {
    display: none;
  }
  :invalid {
    box-shadow: none;
  }
  ${props => ({ ...getPlaceholderStyle(props) })}
`;

const TextMaskAtlaskit = props => {
  return (
    <Container>
      <Masked {...props} />
    </Container>
  );
};

export default TextMaskAtlaskit;
