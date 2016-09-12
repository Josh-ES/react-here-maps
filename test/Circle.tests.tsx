import Circle from "../src/Circle";
import HEREMap, { HEREMapProps, HEREMapState } from "../src/HEREMap";
import * as chai from "chai";
import { mount, ReactWrapper } from "enzyme";
import { first } from "lodash";
import * as React from "react";
import * as Sinon from "sinon";

declare var global: any;
declare var window: any;
declare var sinon: Sinon.SinonStatic;

describe("<HEREMap />", () => {
    describe("<Circle />", () => {

        let wrapper: ReactWrapper<HEREMapProps, HEREMapState>;

        before(() => {
            // get the page container element
            const container = document.getElementById("page-container");

            const center = {
                lat: 0,
                lng: 0,
            };

            // need to use full DOM rendering here to access lifecycle methods
            wrapper = mount<HEREMapProps, HEREMapState>((
                <HEREMap
                    appId="NoiW7CS2CC05ppu95hyL"
                    appCode="28L997fKdiJiY7TVVEsEGQ"
                    center={center}
                    zoom={14}
                />
            ), {
                attachTo: container,
            });
        });

        it("should be attached to the H.Map instance associated with the map", () => {
            // set the initial center of this circle
            const center = {
                lat: 0,
                lng: 0,
            };

            // get the HEREMap instance
            const instance: HEREMap = wrapper.instance() as HEREMap;

            // mount a circle instance to the component
            const circleWrapper = mount((
                <Circle
                    {...center}
                    strokeColor="#1275E8"
                    fillColor="rgba(18, 117, 232, 0.2)"
                    lineWidth={2}
                    radius={10000}
                />
            ), {
                context: {
                    map: instance.getMap(),
                },
            });

            const { state } = wrapper.instance();
            const { map } = state;
            const objects = map.getObjects();

            // check that there is one object at least
            chai.expect(objects).to.have.length(1);

            circleWrapper.unmount();
        });

        it("should attach an object to the H.Map that is an instance of H.map.Circle", () => {
            // set the initial center of this circle
            const center = {
                lat: 0,
                lng: 0,
            };

            // get the HEREMap instance
            const instance: HEREMap = wrapper.instance() as HEREMap;

            // mount a circle instance to the component
            const circleWrapper = mount((
                <Circle
                    {...center}
                    strokeColor="#1275E8"
                    fillColor="rgba(18, 117, 232, 0.2)"
                    lineWidth={2}
                    radius={10000}
                />
            ), {
                context: {
                    map: instance.getMap(),
                },
            });

            const { state } = wrapper.instance();
            const { map } = state;
            const objects = map.getObjects();
            const circle = first(objects);

            // check instanceof for this marker
            chai.expect(circle).to.be.an.instanceof(H.map.Circle);

            circleWrapper.unmount();
        });

        it("should have the correct center set on the circle", () => {
            // set the initial center of this circle
            const center = {
                lat: 0,
                lng: 0,
            };

            // get the HEREMap instance
            const instance: HEREMap = wrapper.instance() as HEREMap;

            // mount a circle instance to the component
            const circleWrapper = mount((
                <Circle
                    {...center}
                    strokeColor="#1275E8"
                    fillColor="rgba(18, 117, 232, 0.2)"
                    lineWidth={2}
                    radius={10000}
                />
            ), {
                context: {
                    map: instance.getMap(),
                },
            });

            const { state } = wrapper.instance();
            const { map } = state;
            const objects = map.getObjects();

            // check that there is one object at least
            chai.expect(objects).to.have.length(1);

            const circle = first<any>(objects) as H.map.Circle;

            // check center of circle, using equals method of the H.geo.Point class
            chai.expect(circle.getCenter().equals({ lat: 0, lng: 0 })).to.be.true;

            circleWrapper.unmount();
        });

        it("should have the correct radius set on the circle", () => {
            // set the initial center of this circle
            const center = {
                lat: 0,
                lng: 0,
            };

            // get the HEREMap instance
            const instance: HEREMap = wrapper.instance() as HEREMap;

            // mount a circle instance to the component
            const circleWrapper = mount((
                <Circle
                    {...center}
                    strokeColor="#1275E8"
                    fillColor="rgba(18, 117, 232, 0.2)"
                    lineWidth={2}
                    radius={10000}
                />
            ), {
                context: {
                    map: instance.getMap(),
                },
            });

            const { state } = wrapper.instance();
            const { map } = state;
            const objects = map.getObjects();

            // check that there is one object at least
            chai.expect(objects).to.have.length(1);

            const circle = first<any>(objects) as H.map.Circle;

            // check radius of circle
            chai.expect(circle.getRadius()).to.equal(10000);

            circleWrapper.unmount();
        });

        it("should automatically effect a change of radius when the radius prop is changed", () => {
            // spy on the componentWillReceiveProps method of the Circle component
            const willReceivePropsSpy = sinon.spy(Circle.prototype, "componentWillReceiveProps");

            // set the initial center of this circle
            const center = {
                lat: 0,
                lng: 0,
            };

            // get the HEREMap instance
            const instance: HEREMap = wrapper.instance() as HEREMap;

            // mount a circle instance to the component
            const circleWrapper = mount((
                <Circle
                    {...center}
                    strokeColor="#1275E8"
                    fillColor="rgba(18, 117, 232, 0.2)"
                    lineWidth={2}
                    radius={10000}
                />
            ), {
                context: {
                    map: instance.getMap(),
                },
            });

            const { state } = wrapper.instance();
            const { map } = state;
            const objects = map.getObjects();

            // check that there is one object at least
            chai.expect(objects).to.have.length(1);

            const circle = first<any>(objects) as H.map.Circle;

            // check radius of circle
            chai.expect(circle.getRadius()).to.equal(10000);

            // change the radius to something other than the initial value
            circleWrapper.setProps({
                radius: 5000,
            });

            // expect componentWillReceiveProps to have been called once
            chai.expect(Circle.prototype.componentWillReceiveProps).to.have.property("callCount", 1);

            // check the new radius of the circle
            chai.expect(circle.getRadius()).to.equal(5000);

            circleWrapper.unmount();

            willReceivePropsSpy.restore();
        });

        it("should automatically effect a change of center when the lat or lng props are changed", () => {
            // spy on the componentWillReceiveProps method of the Circle component
            const willReceivePropsSpy = sinon.spy(Circle.prototype, "componentWillReceiveProps");

            // set the initial center of this circle
            const center = {
                lat: 0,
                lng: 0,
            };

            // get the HEREMap instance
            const instance: HEREMap = wrapper.instance() as HEREMap;

            // mount a circle instance to the component
            const circleWrapper = mount((
                <Circle
                    {...center}
                    strokeColor="#1275E8"
                    fillColor="rgba(18, 117, 232, 0.2)"
                    lineWidth={2}
                    radius={10000}
                />
            ), {
                context: {
                    map: instance.getMap(),
                },
            });

            const { state } = wrapper.instance();
            const { map } = state;
            const objects = map.getObjects();

            // check that there is one object at least
            chai.expect(objects).to.have.length(1);

            const circle = first<any>(objects) as H.map.Circle;

            // check center of circle, using equals method of the H.geo.Point class
            chai.expect(circle.getCenter().equals({ lat: 0, lng: 0 })).to.be.true;

            // change the radius to something other than the initial value
            circleWrapper.setProps({
                lat: 1,
            });

            // expect componentWillReceiveProps to have been called once
            chai.expect(Circle.prototype.componentWillReceiveProps).to.have.property("callCount", 1);

            // check the new center of the circle, using equals method of the H.geo.Point class
            chai.expect(circle.getCenter().equals({ lat: 1, lng: 0 })).to.be.true;

            circleWrapper.unmount();

            willReceivePropsSpy.restore();
        });

        // unmount the component after all the tests are complete
        after(() => {
            wrapper.detach();
        });

    });
});
