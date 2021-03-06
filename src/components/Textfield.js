import GlobalTheme from "@atlaskit/theme/components";
import React from "react";
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent
} from "@atlaskit/analytics-next";
import { name as packageName, version as packageVersion } from "../version.js";

import Input from "./Input";
import { Theme } from "../theme";

class Textfield extends React.Component {
  static defaultProps = {
    appearance: "standard",
    isCompact: false,
    isMonospaced: false,
    isInvalid: false,
    isRequired: false,
    isReadOnly: false,
    isDisabled: false
  };

  state = {
    isFocused: false,
    isHovered: false
  };

  input = null;

  handleOnFocus = event => {
    this.setState({ isFocused: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleOnBlur = event => {
    this.setState({ isFocused: false });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  handleOnMouseDown = event => {
    /** Running e.preventDefault() on the INPUT prevents double click behaviour */
    // Sadly we needed this cast as the target type is being correctly set
    const target = event.target;
    if (target.tagName !== "INPUT") {
      event.preventDefault();
    }
    if (
      this.input &&
      !this.props.isDisabled &&
      document.activeElement !== this.input
    ) {
      this.input.focus();
    }
    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  };

  onMouseEnter = () => {
    if (!this.props.isDisabled) {
      this.setState({ isHovered: true });
    }
  };

  onMouseLeave = () => {
    if (!this.props.isDisabled) {
      this.setState({ isHovered: false });
    }
  };

  // we want to keep a copy of the ref as well as pass it along
  setInputRef = input => {
    this.input = input;

    const forwardedRef = this.props.forwardedRef;

    if (!forwardedRef) {
      return;
    }

    if (typeof forwardedRef === "object") {
      // This is a blunder on the part of @types/react
      // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065
      // .current should be assignable
      // @ts-ignore
      forwardedRef.current = input;
    }

    if (typeof forwardedRef === "function") {
      forwardedRef(input);
    }
  };

  render() {
    const { isFocused, isHovered } = this.state;
    const {
      // Sadly need to pull these out.
      // It is injected by the HOC and we don't want to pass it onto the HTML input
      // @ts-ignore: not passed onto input
      createAnalyticsEvent,
      // @ts-ignore: not passed onto input
      forwardedRef,

      appearance,
      isCompact,
      isDisabled,
      isInvalid,
      isRequired,
      isReadOnly,
      isMonospaced,
      theme,
      width,
      elemAfterInput,
      elemBeforeInput,
      testId,
      ...otherProps
    } = this.props;

    return (
      <Theme.Provider value={theme}>
        <GlobalTheme.Consumer>
          {({ mode }) => (
            <Theme.Consumer
              appearance={appearance}
              mode={mode}
              width={width}
              isDisabled={isDisabled}
              isCompact={isCompact}
              isMonospaced={isMonospaced}
              isFocused={isFocused}
              isHovered={isHovered}
              isInvalid={isInvalid}
            >
              {tokens => (
                <Input
                  /* spreading before applying other props to prevent overwriting */
                  {...otherProps}
                  isDisabled={isDisabled}
                  isReadOnly={isReadOnly}
                  isRequired={isRequired}
                  theme={tokens}
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleOnFocus}
                  onMouseEnter={this.onMouseEnter}
                  onMouseLeave={this.onMouseLeave}
                  onMouseDown={this.handleOnMouseDown}
                  elemAfterInput={elemAfterInput}
                  elemBeforeInput={elemBeforeInput}
                  innerRef={this.setInputRef}
                  testId={testId}
                />
              )}
            </Theme.Consumer>
          )}
        </GlobalTheme.Consumer>
      </Theme.Provider>
    );
  }
}

const ForwardRefTextfield = React.forwardRef((props, ref) => (
  <Textfield {...props} forwardedRef={ref} />
));

export { ForwardRefTextfield as TextFieldWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent("atlaskit");

export default withAnalyticsContext({
  componentName: "textFieldAtlaskit",
  packageName,
  packageVersion
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnAtlaskit({
      action: "blurred",
      actionSubject: "textFieldAtlaskit",

      attributes: {
        componentName: "textFieldAtlaskit",
        packageName,
        packageVersion
      }
    }),

    onFocus: createAndFireEventOnAtlaskit({
      action: "focused",
      actionSubject: "textFieldAtlaskit",

      attributes: {
        componentName: "textFieldAtlaskit",
        packageName,
        packageVersion
      }
    })
  })(ForwardRefTextfield)
);
