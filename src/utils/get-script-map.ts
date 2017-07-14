// declare an interface representing the URL map that
// is returned from this method
interface ScriptMap {
  [key: string]: string;
}

export function getScriptMap(secure?: boolean): ScriptMap {
  // store the versions of the HERE API
  const apiVersion = "v3";
  const codeVersion = "3.0";

  // get the relevant protocol for the HERE Maps API
  let protocol = "";

  if (secure === true) {
    protocol = "https:";
  }

  // the base url for all scripts from the API
  const baseUrl: string = `${protocol}//js.api.here.com/` +
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
    mapEventsScript,
    serviceScript,
    uiScript,
  };
}

// make the getScriptMap method the default export
export default getScriptMap;
