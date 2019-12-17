import React from 'react';
import {unmountComponentAtNode} from 'react-dom';
import {configure} from 'enzyme';
import Rating from './Rating';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import store from '../redux/store';

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

describe('<Rating />', () => {
  it('Should render if we want it to', () => {
    const component = shallow(<Provider store={store}> <Rating /> </Provider>);
    expect(component).toBeDefined(); // Passes
  });
});


