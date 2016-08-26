import HEREMap, { HEREMapProps } from "../../src/HEREMap";
import { mount, ReactWrapper } from "enzyme";
import { assignIn } from "lodash";
import * as React from "react";

// mount a test component to the DOM
export function mountComponent(userProps?: any): ReactWrapper<any, any> {
    const props: HEREMapProps = assignIn({
        appCode: "28L997fKdiJiY7TVVEsEGQ",
        appId: "NoiW7CS2CC05ppu95hyL",
        center: { lat: 0, lng: 0 },
        zoom: 14,
    }, userProps);

    const container = document.getElementById("page-container");

    // need to use full DOM rendering here to access lifecycle methods
    const wrapper = mount((
        <HEREMap
            {...props}
        />
    ), {
        attachTo: container,
    });

    // return the wrapper back
    return wrapper;
}

// make the exported mount function the default export
export default mountComponent;
