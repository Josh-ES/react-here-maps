import * as chai from "chai";
import { mount, ReactWrapper } from "enzyme";
import * as $ from "jquery";
import { first } from "lodash";
import * as React from "react";
import * as Sinon from "sinon";

import HEREMap, { HEREMapProps, HEREMapState } from "../src/HEREMap";
import Marker from "../src/Marker";

declare var global: any;
declare var window: any;
declare var sinon: Sinon.SinonStatic;

describe("<HEREMap />", () => {
  describe("<Marker />", () => {

    describe("DOM Marker", () => {
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

        // mount a marker to the HEREMap component
        const markerWrapper = mount((
          <Marker {...center}>
            <div className="circle-marker"/>
          </Marker>
        ), {
          context: {
            map: instance.getMap(),
          },
        });

        const {state} = instance;
        const {map} = state;
        const objects = map.getObjects();

        // check that there is one object at least
        chai.expect(objects).to.have.length(1);

        markerWrapper.unmount();
      });

      it("should attach an object to the H.Map that is an instance of H.map.DomMarker", () => {
        // set the initial center of this circle
        const center = {
          lat: 0,
          lng: 0,
        };

        // get the HEREMap instance
        const instance: HEREMap = wrapper.instance() as HEREMap;

        // mount a marker to the HEREMap component
        const markerWrapper = mount((
          <Marker {...center}>
            <div className="circle-marker"/>
          </Marker>
        ), {
          context: {
            map: instance.getMap(),
          },
        });

        const {state} = wrapper.instance();
        const {map} = state;
        const objects = map.getObjects();
        const thisMarker = first(objects);

        // check instanceof for this marker
        chai.expect(thisMarker).to.be.an.instanceof(H.map.DomMarker);

        markerWrapper.unmount();
      });

      it("should render the DOM marker to the DOM itself", (done) => {
        // set the initial center of this circle
        const center = {
          lat: 0,
          lng: 0,
        };

        // get the HEREMap instance
        const instance: HEREMap = wrapper.instance() as HEREMap;

        // mount a marker to the HEREMap component
        const markerWrapper = mount((
          <Marker {...center}>
            <div className="circle-marker"/>
          </Marker>
        ), {
          context: {
            map: instance.getMap(),
          },
        });

        // pause for a bit, since for some reason the marker does not appear
        // in the DOM immediately
        setTimeout(() => {
          chai.expect($(".dom-marker .circle-marker").length).to.equal(1);
          markerWrapper.unmount();
          done();
        }, 500);
      });

      it("should change the position of the marker automatically", () => {
        // spy on the componentWillReceiveProps method of the Marker component
        const willReceivePropsSpy = sinon.spy(Marker.prototype, "componentWillReceiveProps");

        // set the initial center of this circle
        const center = {
          lat: 0,
          lng: 0,
        };

        // get the HEREMap instance
        const instance: HEREMap = wrapper.instance() as HEREMap;

        // mount a marker to the HEREMap component
        const markerWrapper = mount((
          <Marker {...center}>
            <div className="circle-marker"/>
          </Marker>
        ), {
          context: {
            map: instance.getMap(),
          },
        });

        const {state} = wrapper.instance();
        const {map} = state;
        const objects = map.getObjects();

        // check that there is one object at least
        chai.expect(objects).to.have.length(1);

        const marker = first<any>(objects) as H.map.DomMarker;

        // check position of marker, using equals method of the H.geo.Point class
        chai.expect(marker.getPosition().equals({lat: 0, lng: 0})).to.equal(true);

        // change the radius to something other than the initial value
        markerWrapper.setProps({
          lat: 1,
        });

        // expect componentWillReceiveProps to have been called once
        chai.expect(Marker.prototype.componentWillReceiveProps).to.have.property("callCount", 1);

        // check the new radius of the circle
        chai.expect(marker.getPosition().equals({lat: 1, lng: 0})).to.equal(true);

        markerWrapper.unmount();

        willReceivePropsSpy.restore();
      });

      // unmount the component after all the tests are complete
      after(() => {
        wrapper.unmount();
      });

    });

    describe("Marker w/ Bitmap Provided", () => {
      let wrapper: ReactWrapper<HEREMapProps, HEREMapState>;

      it("should call the constructor of H.map.Icon with the correct bitmap parameter", () => {
        // spy on the H.map.Icon constructor
        const iconSpy = sinon.spy(H.map, "Icon");

        // get the page container element
        const container = document.getElementById("page-container");

        const center = {
          lat: 0,
          lng: 0,
        };

        const bitmap = "https://josh-es.github.io/react-here-maps/images/map-marker.png";

        // need to use full DOM rendering here to access lifecycle methods
        wrapper = mount<HEREMapProps, HEREMapState>((
          <HEREMap
            appId="NoiW7CS2CC05ppu95hyL"
            appCode="28L997fKdiJiY7TVVEsEGQ"
            center={center}
            zoom={14}
          >
            <Marker
              {...center}
              bitmap={bitmap}
            />
          </HEREMap>
        ), {
          attachTo: container,
        });

        chai.expect(iconSpy.calledWith(bitmap)).to.equal(true);

        // restore the original function
        iconSpy.restore();
      });

      it("should be the single Marker child of the HEREMap component instance", () => {
        // expect that a marker child component must be present
        chai.expect(wrapper.find(Marker)).to.have.length(1);
      });

      it("should be attached to the H.Map instance associated with the map", () => {
        const {state} = wrapper.instance();
        const {map} = state;
        const objects = map.getObjects();

        // check that there is one object at least
        chai.expect(objects).to.have.length(1);
      });

      it("should attach an object to the H.Map that is an instance of H.map.Marker", () => {
        const {state} = wrapper.instance();
        const {map} = state;
        const objects = map.getObjects();
        const thisMarker = first(objects);

        // check instanceof for this marker
        chai.expect(thisMarker).to.be.an.instanceof(H.map.Marker);
      });

      // unmount the component after all the tests are complete
      after(() => {
        wrapper.unmount();
      });

    });

    describe("Default Marker", () => {
      let wrapper: ReactWrapper<HEREMapProps, HEREMapState>;

      it("should not have triggered the H.map.Icon or H.map.DomIcon constructors", () => {
        // spy on the H.map.Icon constructor
        const iconSpy = sinon.spy(H.map, "Icon");
        // spy on the H.map.DomIcon constructor
        const domIconSpy = sinon.spy(H.map, "DomIcon");

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
            <Marker {...center} />
          </HEREMap>
        ), {
          attachTo: container,
        });

        chai.expect(iconSpy).to.have.property("callCount", 0);
        chai.expect(domIconSpy).to.have.property("callCount", 0);
      });

      it("should be the single Marker child of the HEREMap component instance", () => {
        // expect that a marker child component must be present
        chai.expect(wrapper.find(Marker)).to.have.length(1);
      });

      it("should be attached to the H.Map instance associated with the map", () => {
        const {state} = wrapper.instance();
        const {map} = state;
        const objects = map.getObjects();

        // check that there is one object at least
        chai.expect(objects).to.have.length(1);
      });

      it("should attach an object to the H.Map that is an instance of H.map.Marker", () => {
        const {state} = wrapper.instance();
        const {map} = state;
        const objects = map.getObjects();
        const thisMarker = first(objects);

        // check instanceof for this marker
        chai.expect(thisMarker).to.be.an.instanceof(H.map.Marker);
      });

      // unmount the component after all the tests are complete
      after(() => {
        wrapper.unmount();
      });

    });

  });
});
