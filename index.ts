import { scrapeSiloMenu } from './scrapers/silo';
import {scrapeMiklagardurMenu} from "./scrapers/miklagardur";
import {scrapeFkMenu} from "./scrapers/fk";

async function main() {
    const silo = await scrapeSiloMenu();
    console.log('Silo: ',silo);
    const miklagardur = await scrapeMiklagardurMenu();
    console.log('Miklagarður: ',miklagardur);
    const fk = await scrapeFkMenu();
    console.log('FK: ',fk);
}
