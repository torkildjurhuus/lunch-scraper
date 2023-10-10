import { scrapeSiloMenu } from './scrapers/silo';

async function main() {
    const foodTitles = await scrapeSiloMenu();
    console.log(foodTitles);
}

main().catch((error) => console.error(`An error occurred: ${error}`));
