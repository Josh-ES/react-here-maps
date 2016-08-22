import HEREMap from "../src/HEREMap";
import getScriptMap from "../src/utils/get-script-map";
import * as chai from "chai";
import * as cheerio from "cheerio";
import { mount, shallow } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";

declare var global: any;

describe("<HEREMap />", () => {

    it("should call componentDidMount when the component is mounted", () => {
        const didMountSpy = sinon.spy(HEREMap.prototype, "componentDidMount");

        const wrapper = mount(<HEREMap center={{ lat: 0, lng: 0 }}
                                       zoom={14}
                                       appId="NoiW7CS2CC05ppu95hyL"
                                       appCode="28L997fKdiJiY7TVVEsEGQ" />);

        chai.expect(HEREMap.prototype.componentDidMount).to.have.property("callCount", 1);
        // make sure we restore the original method at the end of the test, removing the spy
        didMountSpy.restore();
    });

    it("should generate all the necessary script elements within the document", () => {
        const html = global.document.documentElement.outerHTML;
        const $ = cheerio.load(html);
        const scriptMap = getScriptMap();
        // check the length of the script map is equal to the number of script elements on the page
        // - we can do this as there are no other scripts on the page during testing
        chai.expect($("script").length).to.equal(Object.keys(scriptMap).length);
    });

});