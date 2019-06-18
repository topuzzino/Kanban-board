import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TaskItem from "./TaskItem";
configure({ adapter: new Adapter() });

describe("<TaskItem />", () => {
  it("should render input, if this.state.taskEditMode is true", () => {
    const wrapper = shallow(<TaskItem />);
    expect(wrapper.find("input"));
  });
});
