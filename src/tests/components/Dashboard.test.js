import { shallow } from 'enzyme';
import React from 'react';
import Dashboard from '../../components/Dashboard';

test('Should render the Dashboard page', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper).toMatchSnapshot();
});