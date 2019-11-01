import React from "react";
import { render } from "react-dom";
import Form, { Field } from "@atlaskit/form";
import "@atlaskit/css-reset";
import TextField from "@atlaskit/textfield";
import TextMaskAtlaskit from "../../src";

const Demo = () => (
  <Form onSubmit={data => console.log("form data", data)}>
    {({ formProps }) => (
      <React.Fragment>
        <h1>text-mask-atlaskit Demo</h1>
        <form {...formProps}>
          <Field name="phone" defaultValue="" label="phone" isRequired>
            {({ fieldProps }) => (
              <TextMaskAtlaskit
                mask={[
                  "(",
                  /[1-9]/,
                  /\d/,
                  ")",
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/
                ]}
                {...fieldProps}
              />
            )}
          </Field>
        </form>
      </React.Fragment>
    )}
  </Form>
);

render(<Demo />, document.querySelector("#demo"));
