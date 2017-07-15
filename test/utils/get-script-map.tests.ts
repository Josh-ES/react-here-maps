import { expect } from "chai";

import getScriptMap, { ScriptMap } from "../../src/utils/get-script-map";

describe("<HEREMap />", () => {
  describe("#getScriptMap(secure?: boolean)", () => {

    it("should return all four core HERE Maps JavaScript API scripts", () => {
      const scriptMap: ScriptMap = getScriptMap();

      // expect the script map to have all four scripts set as properties
      expect(scriptMap).to.have.property("coreScript");
      expect(scriptMap).to.have.property("mapEventsScript");
      expect(scriptMap).to.have.property("serviceScript");
      expect(scriptMap).to.have.property("uiScript");

      // test the values of the scripts
      expect(scriptMap.coreScript).to.equal("//js.api.here.com/v3/3.0/mapsjs-core.js");
      expect(scriptMap.mapEventsScript).to.equal("//js.api.here.com/v3/3.0/mapsjs-mapevents.js");
      expect(scriptMap.serviceScript).to.equal("//js.api.here.com/v3/3.0/mapsjs-service.js");
      expect(scriptMap.uiScript).to.equal("//js.api.here.com/v3/3.0/mapsjs-ui.js");
    });

    it("should force https if secure flag set to true", () => {
      const scriptMap: ScriptMap = getScriptMap(true);

      // expect the script map to have all four scripts set as properties
      expect(scriptMap).to.have.property("coreScript");
      expect(scriptMap).to.have.property("mapEventsScript");
      expect(scriptMap).to.have.property("serviceScript");
      expect(scriptMap).to.have.property("uiScript");

      // test the values of the scripts have https at the front
      expect(scriptMap.coreScript).to.equal("https://js.api.here.com/v3/3.0/mapsjs-core.js");
      expect(scriptMap.mapEventsScript).to.equal("https://js.api.here.com/v3/3.0/mapsjs-mapevents.js");
      expect(scriptMap.serviceScript).to.equal("https://js.api.here.com/v3/3.0/mapsjs-service.js");
      expect(scriptMap.uiScript).to.equal("https://js.api.here.com/v3/3.0/mapsjs-ui.js");
    });

  });
});
