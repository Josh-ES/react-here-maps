import HEREMap from '../src/HEREMap';
import * as chai from 'chai';
import * as sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import * as React from 'react';

describe('<HEREMap />', () => {

    it('should call componentDidMount when the component is mounted', () => {
        const spy = sinon.spy(HEREMap.prototype, 'componentDidMount');

        const wrapper = mount(<HEREMap center={{ lat: 0, lng: 0 }}
                                       zoom={14}
                                       appId='NoiW7CS2CC05ppu95hyL'
                                       appCode='28L997fKdiJiY7TVVEsEGQ' />);

        chai.expect(HEREMap.prototype.componentDidMount).to.have.property('callCount', 1);
        HEREMap.prototype.componentDidMount.restore();
    });

});