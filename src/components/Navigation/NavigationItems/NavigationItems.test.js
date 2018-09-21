// jest doc: https://jestjs.io/docs/en/getting-started.html
// enzyme doc: https://airbnb.io/enzyme/

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
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>);
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuthed />);
        wrapper.setProps({
            isAuthed: true
        });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render logout <NavigationItem /> if authenticated', () => {
        // beforeEach() set the value for wrapper, thus isAuthed was not set
        // isolated from other it()s, so we need to set the isAuthed again
        wrapper.setProps({
            isAuthed: true
        });
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>))
            .toEqual(true);
    });
});