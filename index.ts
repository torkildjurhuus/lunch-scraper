import { miklaScrape } from './scrapers/miklagardur';

async function main() {
    const foodTitles = await miklaScrape();
    console.log(foodTitles);
}

main().catch((error) => console.error(`An error occurred: ${error}`));
