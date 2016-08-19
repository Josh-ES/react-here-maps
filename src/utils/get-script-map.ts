// declare an interface representing the URL map that
// is returned from this method
interface ScriptMap {
    [key: string]: string;
}

export function getScriptMap(): ScriptMap {
    // store the versions of the HERE API
    const apiVersion = 'v3';
    const codeVersion = '3.0';

    // the base url for all scripts from the API
    const baseUrl: string = `http://js.api.here.com/` +
        `${apiVersion}/${codeVersion}`;

    // core code
    const coreScript: string =
        `${baseUrl}/mapsjs-core.js`;

    // service code
    const serviceScript: string =
        `${baseUrl}/mapsjs-service.js`;

    // default ui code
    const uiScript: string =
        `${baseUrl}/mapsjs-ui.js`;

    // map events (pan, scroll wheel zoom) code
    const mapEventsScript: string =
        `${baseUrl}/mapsjs-mapevents.js`;

    // return an array with all script names within
    return {
        coreScript,
        serviceScript,
        uiScript,
        mapEventsScript,
    };
}

// make the getScriptMap method the default export
export default getScriptMap;
