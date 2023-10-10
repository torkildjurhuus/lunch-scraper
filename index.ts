import { scrapeMenu } from './scrapers/silo';

async function main() {
    const foodTitles = await scrapeMenu();
    console.log(foodTitles);
}

main().catch((error) => console.error(`An error occurred: ${error}`));
