import React from "react";
import { shallow, mount } from "enzyme";
import Column from "./Column";
import App from "./App";

jest.mock("./Column", () => {});

describe("First React component test with Enzyme", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<App />);
    //const myMockFn = jest.fn();
    //const div = wrapper.find("div").at(0);
    expect(wrapper.hasClass("App")).toBe(true);
  });
});
