import { expect } from "chai";
import * as $ from "jquery";
import * as sinon from "sinon";

import {
  cache,
  getScript,
  getScriptStub,
  loadedScripts,
  onLoad,
  scriptTags,
  ScriptState,
  ScriptTag,
} from "../../src/utils/cache";

describe("<HEREMap />", () => {
  describe("cache", () => {
    describe("#getScript(url: string, name: string): ScriptState", () => {

      beforeEach(() => {
        loadedScripts.delete("jquery");
      });

      it("should load a script into the page", () => {
        const url: string = "https://code.jquery.com/jquery-2.2.4.js";
        const script: ScriptState = getScript(url, "jquery");

        // find the scripts
        const $jquery = $("body").find(`script[src="${url}"]`);
        expect($jquery.length).to.equal(1);
        $jquery.remove();
      });

      it("should load the script into the loadedScripts map", () => {
        const url: string = "https://code.jquery.com/jquery-2.2.4.js";
        getScript(url, "jquery");

        // find the scripts
        expect(loadedScripts.has("jquery")).to.equal(true);

        // remove the script from the dom
        $("body").find(`script[src="${url}"]`).remove();
      });

      it("should only attempt to set the script into the loadedScripts map once", () => {
        const setSpy = sinon.spy(loadedScripts, "set");

        // call get script once
        const url: string = "https://code.jquery.com/jquery-2.2.4.js";
        getScript(url, "jquery");

        // call get script a second time, expecting it not to set up the script again
        getScript(url, "jquery");

        // find the scripts
        expect(setSpy).to.have.property("callCount", 1);
      });

    });

    describe("#getScriptStub(name: string): ScriptTag", () => {

      it("should create a script stub for each script", () => {
        const url: string = "https://code.jquery.com/jquery-2.2.4.js";

        cache({
          jquery: url,
        });

        expect(scriptTags).to.have.property("jquery");

        const jquery: ScriptTag = getScriptStub("jquery");

        expect(scriptTags.jquery).to.equal(jquery);
      });

    });

    describe("#onLoad(name: string, callback: Callback): void", () => {

      it("should be called when the script is loaded", () => {
        // call get script once
        const url: string = "https://code.jquery.com/jquery-2.2.4.js";
        const jquery: ScriptState = getScript(url, "jquery");

        onLoad("jquery", () => {
          expect(jquery.hasLoaded).to.equal(true);
        });

        // remove the script from the dom
        $("body").find(`script[src="${url}"]`).remove();
      });

      it("should use the promise to call the onLoad callback initially", () => {
        // call get script once
        const url: string = "https://code.jquery.com/jquery-2.2.4.js";
        const jquery: ScriptState = getScript(url, "jquery");

        const thenSpy = sinon.spy(jquery.promise, "then");

        onLoad("jquery", () => {
          expect(thenSpy).to.have.property("callCount", 1);
        });
      });

    });
  });
});
