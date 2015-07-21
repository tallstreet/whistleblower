import React from "react/addons";
import Form from "../index.jsx";

describe("Form", function() {
  it("displays the component", function() {
    const TestUtils = React.addons.TestUtils;

    const application = TestUtils.renderIntoDocument(
      <Form />
    );

    const divs = TestUtils.scryRenderedDOMComponentsWithClass(application, "Form");

    expect(divs.length).to.equal(1);
  });
});
