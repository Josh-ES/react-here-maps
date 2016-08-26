import HEREMap from "../../src/HEREMap";
import cache, { getScriptStub } from "../../src/utils/cache";
import getLink from "../../src/utils/get-link";
import getScriptMap from "../../src/utils/get-script-map";
import * as chai from "chai";
import { mount } from "enzyme";
import * as $ from "jquery";
import { last } from "lodash";
import * as React from "react";
import * as Sinon from "sinon";

declare var global: any;
declare var window: any;
declare var sinon: Sinon.SinonStatic;

describe("<HEREMap />", () => {

    before((done) => {
        const scriptMap = getScriptMap();
        cache(scriptMap);

        const scriptNames = Object.keys(scriptMap);
        const finalScriptToLoad = last(scriptNames);

        const stylesheetUrl = "http://js.api.here.com/v3/3.0/mapsjs-ui.css";
        getLink(stylesheetUrl, "HERE Maps UI");

        const fixture = "<div id=\"page-container\"></div>";
        document.body.insertAdjacentHTML("afterbegin", fixture);

        getScriptStub(finalScriptToLoad).onLoad((err: any, res?: any) => {
            global.H = window.H;
            done(err);
        });
    });

    describe("HMapMethods Mixin", () => {
        describe("#getElement()", () => {

            it("should return an element when called on a <HEREMap> component instance", () => {
                const container = document.getElementById("page-container");

                // need to use full DOM rendering here to access lifecycle methods
                const wrapper = mount((
                    <HEREMap
                        center={{ lat: 0, lng: 0 }}
                        zoom={14}
                        appId="NoiW7CS2CC05ppu95hyL"
                        appCode="28L997fKdiJiY7TVVEsEGQ"
                    />
                ), {
                    attachTo: container,
                });

                // get the component from the ReactWrapper returned by enzyme
                const component: HEREMap = wrapper.instance() as HEREMap;
                const componentEl = component.getElement();

                // get the number of map containers and canvas elements
                const mapContainersLength = $(componentEl).find('#mapContainer').length;
                const canvasLength = $(componentEl).find('canvas').length;

                // we should have one map container and one canvas for the one <HEREMap> component instance
                chai.expect(mapContainersLength).to.equal(1);
                chai.expect(canvasLength).to.equal(1);

                // remove the test map from the DOM
                wrapper.unmount();
            });

        });

        describe("#getMap()", () => {

            it("should return a H.Map instance when called on a <HEREMap> component instance", () => {
                const container = document.getElementById("page-container");

                // need to use full DOM rendering here to access lifecycle methods
                const wrapper = mount((
                    <HEREMap
                        center={{ lat: 0, lng: 0 }}
                        zoom={14}
                        appId="NoiW7CS2CC05ppu95hyL"
                        appCode="28L997fKdiJiY7TVVEsEGQ"
                    />
                ), {
                    attachTo: container,
                });

                // get the component from the ReactWrapper returned by enzyme
                const component: HEREMap = wrapper.instance() as HEREMap;
                const map = component.getMap();

                // expect the returned map to be an instance of H.Map
                chai.expect(map).to.be.an.instanceof(H.Map);

                // remove the test map from the DOM
                wrapper.unmount();
            });

        });

        describe("#setCenter(point: H.geo.IPoint)", () => {

            it("should set the center of the associated H.Map instance " +
                "when called on a <HEREMap> component instance", () => {
                const container = document.getElementById("page-container");

                // need to use full DOM rendering here to access lifecycle methods
                const wrapper = mount((
                    <HEREMap
                        center={{ lat: 0, lng: 0 }}
                        zoom={14}
                        appId="NoiW7CS2CC05ppu95hyL"
                        appCode="28L997fKdiJiY7TVVEsEGQ"
                    />
                ), {
                    attachTo: container,
                });

                // get the component from the ReactWrapper returned by enzyme
                const component: HEREMap = wrapper.instance() as HEREMap;
                const map = component.getMap();

                // expect the returned map to be an instance of H.Map
                chai.expect(map).to.be.an.instanceof(H.Map);

                // spy on the map.setCenter method
                const setCenterSpy = sinon.spy(map, "setCenter");

                component.setCenter({ lat: 51.5, lng: 0 });

                // expect map.setCenter to have been called once
                chai.expect(map.setCenter).to.have.property("callCount", 1);

                setCenterSpy.restore();

                // remove the test map from the DOM
                wrapper.unmount();
            });

        });

        describe("#setZoom(zoom: number)", () => {

            it("should set the zoom of the associated H.Map instance " +
                "when called on a <HEREMap> component instance", () => {
                const container = document.getElementById("page-container");

                // need to use full DOM rendering here to access lifecycle methods
                const wrapper = mount((
                    <HEREMap
                        center={{ lat: 0, lng: 0 }}
                        zoom={14}
                        appId="NoiW7CS2CC05ppu95hyL"
                        appCode="28L997fKdiJiY7TVVEsEGQ"
                    />
                ), {
                    attachTo: container,
                });

                // get the component from the ReactWrapper returned by enzyme
                const component: HEREMap = wrapper.instance() as HEREMap;
                const map = component.getMap();

                // expect the returned map to be an instance of H.Map
                chai.expect(map).to.be.an.instanceof(H.Map);

                // spy on the map.setZoom method
                const setZoomSpy = sinon.spy(map, "setZoom");

                component.setZoom(12);

                // expect map.setZoom to have been called once
                chai.expect(map.setZoom).to.have.property("callCount", 1);

                setZoomSpy.restore();

                // remove the test map from the DOM
                wrapper.unmount();
            });

        });

        describe("#componentWillReceiveProps(nextProps: HEREMapProps)", () => {

            it("should be called when the props on the associated <HEREMap> instance change", () => {
                const container = document.getElementById("page-container");

                // need to use full DOM rendering here to access lifecycle methods
                const wrapper = mount((
                    <HEREMap
                        center={{ lat: 0, lng: 0 }}
                        zoom={14}
                        appId="NoiW7CS2CC05ppu95hyL"
                        appCode="28L997fKdiJiY7TVVEsEGQ"
                    />
                ), {
                    attachTo: container,
                });

                // spy on the HEREMap.componentWillReceiveProps method
                const willReceivePropsSpy = sinon.spy(HEREMap.prototype, "componentWillReceiveProps");

                // set the zoom property to something different to the initial value
                wrapper.setProps({ zoom: 12 });

                // expect map.setZoom to have been called once
                chai.expect(HEREMap.prototype.componentWillReceiveProps).to.have.property("callCount", 1);

                // restore the original method on the HEREMap class (important)
                willReceivePropsSpy.restore();

                // remove the test map from the DOM
                wrapper.unmount();
            });

        });
    });
});