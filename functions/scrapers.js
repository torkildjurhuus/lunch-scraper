import { scrapeSiloMenu } from '../scrapers/silo';
import { scrapeMiklagardurMenu } from '../scrapers/miklagardur';
import { scrapeFkMenu } from '../scrapers/fk';

exports.handler = async (event) => {
    try {
        // Check which scraper to run from the event body or query parameters
        let scraperType = event.queryStringParameters.scraper;

        let result;
        switch (scraperType) {
            case 'silo':
                result = await scrapeSiloMenu();
                break;
            case 'miklagardur':
                result = await scrapeMiklagardurMenu();
                break;
            case 'fk':
                result = await scrapeFkMenu();
                break;
            default:
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Invalid scraper type provided' }),
                };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ menu: result }),
        };
    } catch (error) {
        console.error(`Error occurred: ${error}`);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
