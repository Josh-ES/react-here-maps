import HEREMap, { HEREMapProps, HEREMapState } from "../src/HEREMap";
import Circle from "../src/Circle";
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
                >
                    <Circle
                        {...center}
                        strokeColor="#1275E8"
                        fillColor="rgba(18, 117, 232, 0.2)"
                        lineWidth={2}
                        radius={10000}
                    />
                </HEREMap>
            ), {
                attachTo: container,
            });
        });

        it("should be the single Circle child of the HEREMap component instance", () => {
            // expect that a marker child component must be present
            chai.expect(wrapper.find(Circle)).to.have.length(1);
        });

        it("should be attached to the H.Map instance associated with the map", () => {
            const { state } = wrapper.instance();
            const { map } = state;
            const objects = map.getObjects();

            // check that there is one object at least
            chai.expect(objects).to.have.length(1);
        });

        it("should attach an object to the H.Map that is an instance of H.map.Circle", () => {
            const { state } = wrapper.instance();
            const { map } = state;
            const objects = map.getObjects();
            const thisMarker = first(objects);

            // check instanceof for this marker
            chai.expect(thisMarker).to.be.an.instanceof(H.map.Circle);
        });

        it("should have the correct center set on the circle", () => {
            const { state } = wrapper.instance();
            const { map } = state;
            const objects = map.getObjects();

            // check that there is one object at least
            chai.expect(objects).to.have.length(1);

            const circle = first<H.map.Circle>(objects);

            // check center of circle, using equals method of the H.geo.Point class
            chai.expect(circle.getCenter().equals({ lat: 0, lng: 0 })).to.be.true;
        });

        it("should have the correct radius set on the circle", () => {
            const { state } = wrapper.instance();
            const { map } = state;
            const objects = map.getObjects();

            // check that there is one object at least
            chai.expect(objects).to.have.length(1);

            const circle = first<any>(objects) as H.map.Circle;

            // check radius of circle
            chai.expect(circle.getRadius()).to.equal(10000);
        });

        // unmount the component after all the tests are complete
        after(() => {
            wrapper.unmount();
        });

    });
});
