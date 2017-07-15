import * as chai from "chai";
import * as $ from "jquery";
import { forEach } from "lodash";
import * as Sinon from "sinon";

import HEREMap from "../src/HEREMap";
import cache, { onAllLoad } from "../src/utils/cache";
import getLink from "../src/utils/get-link";
import getScriptMap from "../src/utils/get-script-map";
import mount from "./helpers/mount";

declare var global: any;
declare var window: any;
declare var sinon: Sinon.SinonStatic;

describe("<HEREMap />", () => {

  before(function beforeAllHook(done) {
    this.timeout(5000);

    const scriptMap = getScriptMap();
    cache(scriptMap);

    const stylesheetUrl = "//js.api.here.com/v3/3.0/mapsjs-ui.css";
    getLink(stylesheetUrl, "HERE Maps UI");

    const fixture = "<div id=\"page-container\"></div>";
    document.body.insertAdjacentHTML("afterbegin", fixture);

    onAllLoad((errors: any[], results?: any[]) => {
      global.H = window.H;
      done(errors && errors[0]);
    });
  });

  it("should call componentDidMount when the component is mounted", () => {
    const didMountSpy = sinon.spy(HEREMap.prototype, "componentDidMount");

    // need to use full DOM rendering here to access lifecycle methods
    const wrapper = mount();

    chai.expect(didMountSpy).to.have.property("callCount", 1);

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
    });
  });

  it("should generate all the necessary link elements within the document", () => {
    const stylesheetUrl = "//js.api.here.com/v3/3.0/mapsjs-ui.css";
    // check the number of link elements on the page is equal to 1
    // - we can do this as there are no other links on the page during testing
    chai.expect($(`link[rel=\"stylesheet\"][href="${stylesheetUrl}"]`).length).to.equal(1);
  });

  it("should generate a map when the component gets rendered", () => {
    // need to use full DOM rendering here to access lifecycle methods
    const wrapper = mount();
    chai.expect($("canvas").length).to.equal(1);
    wrapper.unmount();
  });

  it("should generate a canvas twice the size of the map" +
    " container when hidpi mode is enabled", () => {
    // need to use full DOM rendering here to access lifecycle methods
    const wrapper = mount({
      hidpi: true,
    });

    // in hidpi mode, the pixelRatio is set to 2
    // this means the canvas height and width should be twice that of the map container
    const canvasHeight = parseInt($("canvas").attr("height") as string, 10);
    const canvasWidth = parseInt($("canvas").attr("width") as string, 10);

    chai.expect(canvasHeight).to.equal($(".map-container").height() * 2);
    chai.expect(canvasWidth).to.equal($(".map-container").width() * 2);

    wrapper.unmount();
  });

});
