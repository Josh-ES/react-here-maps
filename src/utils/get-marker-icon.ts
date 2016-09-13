import "core-js";

/**
 * Map for image URL strings against H.map.Icon instances
 * @type {Map<string, ScriptState>}
 */
export const Icons = new Map<string, H.map.Icon>();

/**
 * Returns the Icon for the input bitmap URL string, ensuring that no more
 * than one Icon is created for each bitmap
 * @param bitmap {string} - The location of the bitmap to be used as an icon
 */
export default function getMarkerIcon(bitmap: string): H.map.Icon {
    if (!Icons.has(bitmap)) {
        const icon = new H.map.Icon(bitmap);
        Icons.set(bitmap, icon);
    }

    return Icons.get(bitmap);
}
