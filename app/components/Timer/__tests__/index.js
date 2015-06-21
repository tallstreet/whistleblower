import React from "react/addons";
import Timer from "../index.jsx";

describe("Timer", function() {
  it("displays the component", function() {
    const TestUtils = React.addons.TestUtils;

    const application = TestUtils.renderIntoDocument(
      <Timer TimerStore={{}} />
    );

    const divs = TestUtils.scryRenderedDOMComponentsWithClass(application, "Timer");

    expect(divs.length).to.equal(1);
  });
});
