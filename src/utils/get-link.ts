// import from npm
import "core-js";
import { assignIn } from "lodash";

// declare an interface for the object that is
// used to describe each link and stored in the
// map
export interface LinkState {
  hasLoaded: boolean;
  wasRejected: boolean;
  error?: any;
  link: HTMLLinkElement;
}

/**
 * map for link names against utility objects
 * @type {Map<string, LinkState>}
 */
const loadedLinks = new Map<string, LinkState>();

/**
 * Get a style or other linked resource from a remote location.
 * @param name {string} - The name of the resource to be retrieved.
 * @param url {string} - The URL/location of the resource to be retrieved.
 */
export function getLink(url: string, name: string) {
  if (!loadedLinks.has(name) && !document.querySelector(`link[href="${url}"]`)) {
    const link: HTMLLinkElement = document.createElement("link");
    const body = document.getElementsByTagName("body")[0];

    assignIn(link, {
      href: url,
      rel: "stylesheet",
      type: "text/css",
    });

    body.appendChild(link);

    const linkObject: LinkState = {
      hasLoaded: false,
      link,
      wasRejected: false,
    };

    loadedLinks.set(name, linkObject);
  }

  return loadedLinks.get(name);
}

// make the "getLink" method the default export
export default getLink;
