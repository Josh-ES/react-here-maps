import HEREMap from "../src/HEREMap";
import cache, { getScriptStub } from "../src/utils/cache";
import getLink from "../src/utils/get-link";
import getScriptMap from "../src/utils/get-script-map";
import * as chai from "chai";
import { mount, render, shallow } from "enzyme";
import { last, forEach } from "lodash";
import * as React from "react";
import * as Sinon from "sinon";
import * as $ from "jquery";

declare var global: any;
declare var window: any;
declare var sinon: Sinon.SinonStatic;

describe("<HEREMap />", () => {

    before(function(done) {
        const scriptMap = getScriptMap();
        cache(scriptMap);

        const scriptNames = Object.keys(scriptMap);
        const finalScriptToLoad = last(scriptNames);

        const stylesheetUrl = 'http://js.api.here.com/v3/3.0/mapsjs-ui.css';
        getLink(stylesheetUrl, 'HERE Maps UI');

        const fixture = '<div id="page-container" style="height: 400px;"></div>';
        document.body.insertAdjacentHTML('afterbegin', fixture);

        getScriptStub(finalScriptToLoad).onLoad((err: any, res?: any) => {
            global.H = window.H;
            done(err);
        });
    });

    it("should call componentDidMount when the component is mounted", () => {
        const didMountSpy = sinon.spy(HEREMap.prototype, "componentDidMount");

        const container = document.getElementById('page-container');

        // need to use full DOM rendering here to access lifecycle methods
        const wrapper = mount((
            <HEREMap center={{ lat: 0, lng: 0 }}
                     zoom={14}
                     appId="NoiW7CS2CC05ppu95hyL"
                     appCode="28L997fKdiJiY7TVVEsEGQ" />
        ), {
            attachTo: container,
        });

        chai.expect(HEREMap.prototype.componentDidMount).to.have.property("callCount", 1);

        // make sure we restore the original method at the end of the test, removing the spy
        didMountSpy.restore();

        // remove the test map from the DOM
        wrapper.unmount();
    });

    it("should generate all the necessary script elements within the document", () => {
        const scriptMap = getScriptMap();
        // check the length of the script map is equal to the number of script elements on the page
        // - we can do this as there are no other scripts on the page during testing
        forEach(scriptMap, (script: string) => {
            chai.expect($(`script[src="${script}"]`).length).to.equal(1);
        })
    });

    it("should generate all the necessary link elements within the document", () => {
        // check the number of link elements on the page is equal to 1
        // - we can do this as there are no other links on the page during testing
        chai.expect($("link[rel=\"stylesheet\"]").length).to.equal(1);
    });

    it("should generate a map when the component gets rendered", function generateMapTest() {
        const container = document.getElementById('page-container');

        // need to use full DOM rendering here to access lifecycle methods
        const wrapper = mount((
            <HEREMap center={{ lat: 0, lng: 0 }}
                     zoom={14}
                     appId="NoiW7CS2CC05ppu95hyL"
                     appCode="28L997fKdiJiY7TVVEsEGQ" />
        ), {
            attachTo: container,
        });

        chai.expect($('canvas').length).to.equal(1);

        wrapper.unmount();
    });

    it("should generate a canvas twice the size of the map container when hidpi mode is enabled", function hidpiMode() {
        const container = document.getElementById('page-container');

        // need to use full DOM rendering here to access lifecycle methods
        const wrapper = mount((
            <HEREMap center={{ lat: 0, lng: 0 }}
                     zoom={14}
                     hidpi={true}
                     appId="NoiW7CS2CC05ppu95hyL"
                     appCode="28L997fKdiJiY7TVVEsEGQ" />
        ), {
            attachTo: container,
        });

        wrapper.unmount();
    });

});