import { scrapeSiloMenu } from './scrapers/silo';
import {scrapeMiklagardurMenu} from "./scrapers/miklagardur";
import {scrapeFkMenu} from "./scrapers/fk";

async function main() {
    const silo = await scrapeSiloMenu();
    console.log('Silo: ',silo);
    const miklagardur = await scrapeMiklagardurMenu();
    console.log('Miklagarður: ',miklagardur);
    (async () => {
    const menu = await scrapeFkMenu();
    if (menu) {
        console.log("FK:", menu);
    }
    })();

}
main().catch((error) => console.error(`An error occurred: ${error}`));
