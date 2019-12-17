import React from 'react';
import {unmountComponentAtNode} from 'react-dom';
import {configure, mount} from 'enzyme';
import UploadTask from './UploadTask';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import store from '../redux/store';
import {Button, Form} from '@patternfly/react-core';

let container:any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const submitdata = jest.fn();
describe('<UploadTask />', () => {
  it('Should render if we want it to', () => {
    const component = shallow(<UploadTask />);
    expect(component).toBeDefined(); // Passes
  });
});
describe('<UploadTask />', () => {
  it('checking submition of form', () =>{
    const view = mount(<Form
      id = "form"
      className = "flex-size"
      onClick = {submitdata}
    />);
    view.find('#form.flex-size')
        .hostNodes()
        .simulate('click');
    expect(submitdata).toBeCalled();
  });
});

