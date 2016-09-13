import "core-js";

/**
 * Map for HTML strings against H.map.DomIcon instances
 * @type {Map<string, ScriptState>}
 */
export const DomIcons = new Map<string, H.map.DomIcon>();

/**
 * Returns the DOM Icon for the input HTML string, ensuring that no more
 * than one DOM Icon is created for each HTML string
 * @param html {string} - A string containing the markup to be used as a Dom Icon.
 */
export default function getDomMarkerIcon(html: string): H.map.DomIcon {
    if (!DomIcons.has(html)) {
        const icon = new H.map.DomIcon(html);
        DomIcons.set(html, icon);
    }

    return DomIcons.get(html);
}
