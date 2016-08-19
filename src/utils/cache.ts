// import from npm
import { assignIn, forEach } from 'lodash';
import * as Promise from 'bluebird';

// declare an interface for the object that is
// used to describe each script and stored in the
// map
interface ScriptState {
    hasLoaded: boolean;
    wasRejected: boolean;
    error?: any;
    promise: Promise.Thenable<string>;
    tag: HTMLScriptElement;
}

/**
 * map for script names against utility objects
 * @type {Map<string, ScriptState>}
 */
const loadedScripts = new Map<string, ScriptState>();

// declare an interface for the scripts object
// that is passed into the cache function
interface Scripts {
    [name: string]: string;
}

// declare a standard callback type
type Callback = (error: any, result?: any) => void;

// declare an interface for a single script tag object
interface ScriptTag {
    tag: HTMLScriptElement;
    onLoad(callback: Callback): void;
}

// declare an interface for the script tags object
// that stores info on each requested script
interface ScriptTags {
    [name: string]: ScriptTag;
}

/**
 *
 * @param scripts {Scripts} - An object with all the scripts required. Keys are script names, values are URLs.
 */
export function cache(scripts: Scripts): ScriptTags {
    const scriptTags: ScriptTags = { };

    forEach(scripts, (script, name) => {
        assignIn(scriptTags, {
            [name]: {
                tag: getScript(script, name),
                // TODO think of a way of doing this using 'bind' or 'call'?
                onLoad: onLoad(name),
            }
        });
    });

    return scriptTags;
}

/**
 * Callback to be fired when each script has loaded.
 * @param name {string} - The name of the string that has just loaded.
 */
function onLoad(name: string) {
    return (callback: Callback) => {
        const stored = loadedScripts.get(name);

        if (stored) {
            stored.promise.then(() => {
                stored.wasRejected ? callback(stored.error) : callback(null, stored);
            });
        }
    }
}

/**
 * Get a script from a remote location.
 * @param name {string} - The name of the script to be retrieved.
 * @param url {string} - The URL/location of the script to be retrieved.
 */
function getScript(url: string, name: string) {
    if (!loadedScripts.has(name)) {
        const tag: HTMLScriptElement = document.createElement('script');

        const promise = new Promise((resolve, reject) => {
            const body = document.getElementsByTagName('body')[0];

            // make sure the script type is javascript
            // and that scripts are loaded in order using
            // the 'async' option
            assignIn(tag, {
                type: 'text/javascript',
                async: false,
            });

            const handleResult = (state: string) => {
                return (event: Event) => {
                    const stored = loadedScripts.get(name);

                    if (state === 'loaded') {
                        stored.hasLoaded = true;
                        resolve(url);
                    } else if (state === 'error') {
                        stored.wasRejected = true;
                        reject(event);
                    }
                }
            };

            assignIn(tag, {
                onload: handleResult('loaded'),
                onerror: handleResult('error'),

                onreadystatechange() {
                    handleResult(tag.readyState);
                },
            });

            // add load and error event listeners
            tag.addEventListener('load', tag.onload);
            tag.addEventListener('error', tag.onerror);

            assignIn(tag, { src: url });

            body.appendChild(tag);

            return tag;
        });

        const scriptObject: ScriptState = {
            hasLoaded: false,
            wasRejected: false,
            promise,
            tag,
        };

        loadedScripts.set(name, scriptObject);
    }

    return loadedScripts.get(name);
}

// also make cache the default export
export default cache;
