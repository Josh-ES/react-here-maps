import * as chai from 'chai';
import getLink from '../../src/utils/get-link';

describe('<HEREMap />', () => {
    describe('#getLink(url: string, name: string): any', () => {

        it('should return a valid LinkState object', () => {
            const linkState = getLink('http://js.api.here.com/v3/3.0/mapsjs-ui.css', 'HERE Maps UI Stylesheet');

            // check that the hasLoaded property is present
            chai.expect(linkState).to.have.property('hasLoaded');

            // check that the link property is present
            chai.expect(linkState).to.have.property('link');

            // check that the wasRejected property is present
            chai.expect(linkState).to.have.property('wasRejected');
        });

        it('should return an HTMLLinkElement as a property of a LinkState object, with the correct properties set.', () => {
            const linkState = getLink('http://js.api.here.com/v3/3.0/mapsjs-ui.css', 'HERE Maps UI Stylesheet');
            const { link } = linkState;

            // check that the href property is set to the desired URL
            chai.expect(link).to.have.property('href');
            chai.expect(link).to.have.property('href', 'http://js.api.here.com/v3/3.0/mapsjs-ui.css');

            // check that rel is set to 'stylesheet'
            chai.expect(link).to.have.property('rel');
            chai.expect(link).to.have.property('rel', 'stylesheet');

            // check that type is set to 'text/css'
            chai.expect(link).to.have.property('type');
            chai.expect(link).to.have.property('type', 'text/css');
        });

    });
});