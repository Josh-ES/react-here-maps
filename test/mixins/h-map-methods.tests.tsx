import HEREMap from "../../src/HEREMap";
import cache, { getScriptStub } from "../../src/utils/cache";
import getLink from "../../src/utils/get-link";
import getScriptMap from "../../src/utils/get-script-map";
import mount from "../helpers/mount";
import * as chai from "chai";
import * as $ from "jquery";
import { last } from "lodash";
import "react";
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

        const stylesheetUrl = "//js.api.here.com/v3/3.0/mapsjs-ui.css";
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
                // need to use full DOM rendering here to access lifecycle methods
                const wrapper = mount();

                // get the component from the ReactWrapper returned by enzyme
                const component: HEREMap = wrapper.instance() as HEREMap;
                const componentEl = component.getElement();

                // get the number of map containers and canvas elements
                const mapContainersLength = $(componentEl).find(".map-container").length;
                const canvasLength = $(componentEl).find("canvas").length;

                // we should have one map container and one canvas for the one <HEREMap> component instance
                chai.expect(mapContainersLength).to.equal(1);
                chai.expect(canvasLength).to.equal(1);

                // remove the test map from the DOM
                wrapper.unmount();
            });

        });

        describe("#getMap()", () => {

            it("should return a H.Map instance when called on a <HEREMap> component instance", () => {
                // need to use full DOM rendering here to access lifecycle methods
                const wrapper = mount();

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
                // need to use full DOM rendering here to access lifecycle methods
                const wrapper = mount();

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
                // need to use full DOM rendering here to access lifecycle methods
                const wrapper = mount();

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
                // need to use full DOM rendering here to access lifecycle methods
                const wrapper = mount();

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

            it("should change the zoom level when the zoom prop on the associated <HEREMap> instance changes", (done) => {
                // need to use full DOM rendering here to access lifecycle methods
                const wrapper = mount();

                // TODO find way of doing this a bit better
                // use timeouts to deal with the time it takes to fetch and render a map
                setTimeout(() => {
                    // get the map associated with the mounted HEREMap instance
                    const instance: HEREMap = wrapper.instance() as HEREMap;
                    const map = instance.getMap();

                    // test the original zoom level of the map
                    chai.expect(map.getZoom()).to.equal(14);

                    // set the zoom property to something different to the initial value
                    wrapper.setProps({ zoom: 12 });

                    setTimeout(() => {
                        // test the new zoom level
                        chai.expect(map.getZoom()).to.equal(12);

                        // remove the test map from the DOM
                        wrapper.unmount();

                        done();
                    }, 500);
                }, 500);
            });

            it("should change the center when the center prop on the associated <HEREMap> instance changes", (done) => {
                // need to use full DOM rendering here to access lifecycle methods
                const wrapper = mount();

                // use timeouts to deal with the time it takes to fetch and render a map
                setTimeout(() => {
                    // get the map associated with the mounted HEREMap instance
                    const instance: HEREMap = wrapper.instance() as HEREMap;
                    const map = instance.getMap();

                    // test the original center of the map
                    chai.expect(map.getCenter().equals({ lat: 0, lng: 0 })).to.be.true;

                    // set the zoom property to something different to the initial value
                    wrapper.setProps({
                        center: {
                            lat: 1,
                            lng: 1,
                        },
                    });

                    setTimeout(() => {
                        // test the new center
                        chai.expect(map.getCenter().equals({ lat: 1, lng: 1 })).to.be.true;

                        // remove the test map from the DOM
                        wrapper.unmount();

                        done();
                    }, 500);
                }, 500);
            });

        });
    });
});
