import {BurgerBuilder} from "./BurgerBuilder";
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import React from "react";

configure({
    adapter: new Adapter()
});

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />); // so that BurgerBuilder won't crash
    });

    it('should render <BuildControls /> when receiving ingredients', function () {
        wrapper.setProps({
            ingredients: {}
        });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});

// Error: Error watching file for changes: EMFILE
// To fix this:
// brew update
// brew install watchman