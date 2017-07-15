import { expect } from "chai";

import getDomMarkerIcon, { DomIcons } from "../../src/utils/get-dom-marker-icon";

describe("<HEREMap />", () => {
  describe("#getDomMarkerIcon(html: string): H.map.DomIcon", () => {

    beforeEach(() => {
      DomIcons.clear();
    });

    it("should create a new dom icon instance if one does not exist", () => {
      const html: string = "<div class='dom-marker'><div class='circle-marker' /></div>";

      // test we get an icon instance
      const icon: H.map.DomIcon = getDomMarkerIcon(html);
      expect(icon).to.be.an.instanceof(H.map.DomIcon);
    });

    it("should add the new dom icon instance to the map", () => {
      const html: string = "<div class='dom-marker'><div class='circle-marker' /></div>";

      // expect the map size to be zero
      expect(DomIcons.size).to.equal(0);

      // get an icon instance
      getDomMarkerIcon(html);

      // test that the size has increased by one
      expect(DomIcons.size).to.equal(1);
    });

    it("shouldn't create two dom icons for the same bitmap", () => {
      const html: string = "<div class='dom-marker'><div class='circle-marker' /></div>";

      // get an icon instance
      getDomMarkerIcon(html);

      // test that the size has increased to one
      expect(DomIcons.size).to.equal(1);

      // get a second icon instance
      getDomMarkerIcon(html);

      // test that the size is still one
      expect(DomIcons.size).to.equal(1);
    });

  });
});
