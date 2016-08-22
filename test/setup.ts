import * as jsdom from "jsdom";

declare var global: any;

const exposedProperties = ["window", "navigator", "document"];

const doc = jsdom.jsdom("<!doctype html><html><body></body></html>");

global.document = doc;
global.window = doc.defaultView;

Object.keys(document.defaultView).forEach((property: string) => {
    if (typeof global[property] === "undefined") {
        exposedProperties.push(property);
        global[property] = document.defaultView[<any>property];
    }
});

global.navigator = {
    userAgent: "node.js"
};
