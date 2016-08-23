import * as jsdom from "jsdom";
import { XMLHttpRequest } from "xmlhttprequest";

declare var global: any;

const exposedProperties = ["window", "navigator", "document"];

const doc = jsdom.jsdom("<!doctype html><html><body></body></html>", {
    virtualConsole: jsdom.createVirtualConsole().sendTo(console),
});

global.document = doc;
global.window = doc.defaultView;

// fix the XMLHttpRequest API implementation
global.window.XMLHttpRequest = XMLHttpRequest;

Object.keys(document.defaultView).forEach((property: string) => {
    if (typeof global[property] === "undefined") {
        exposedProperties.push(property);
        global[property] = document.defaultView[<any>property];
    }
});

global.navigator = {
    userAgent: "node.js"
};
