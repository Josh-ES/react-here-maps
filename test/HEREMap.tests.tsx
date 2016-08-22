import HEREMap from '../src/HEREMap';
import * as chai from 'chai';
import * as jsdom from 'jsdom';
import * as sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import * as React from 'react';

declare var global: any;

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

describe('<HEREMap />', () => {

    it('calls componentDidMount', () => {
        const spy = sinon.spy(HEREMap.prototype, 'componentDidMount');

        const wrapper = mount(<HEREMap center={{ lat: 0, lng: 0 }}
                                       zoom={14}
                                       appId='NoiW7CS2CC05ppu95hyL'
                                       appCode='28L997fKdiJiY7TVVEsEGQ' />);

        chai.expect(HEREMap.prototype.componentDidMount).to.have.property('callCount', 1);
        HEREMap.prototype.componentDidMount.restore();
    });

});