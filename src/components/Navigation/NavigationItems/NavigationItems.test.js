import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from "./NavigationItems";
import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

// use enzyme to test standalone components, isolated components
// configure enzyme and make it adapt to our react project
configure({
    adapter: new Adapter()
});

// describe(), it(), expect() -> jest library
describe('<NavigationItems />', () => {
    it('should render two <NavigationItem /> elements if not authenticated', () => {
        // shallow is used the most, because it doesn't deeply render a component
        const wrapper = shallow(<NavigationItems/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
});