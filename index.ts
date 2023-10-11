import { App } from '@slack/web-api';
import {scrapeSiloMenu} from "./scrapers/silo";
import {scrapeFkMenu} from "./scrapers/fk";
import {scrapeMiklagardurMenu} from "./scrapers/miklagardur";

const slackToken = 'your-slack-token-here'; // replace with your actual Slack bot token

const app = new App({
    token: slackToken,
});

const runScrapers = async () => {
    try {
        const [imageTextResult, website1Result, website2Result] = await Promise.all([
            scrapeSiloMenu(),
            scrapeFkMenu(),
            scrapeMiklagardurMenu(),
        ]);

        const finalMessage = [imageTextResult, website1Result, website2Result].join('\n\n');

        // Post to Slack
        await app.chat.postMessage({
            channel: 'channel-id', // replace with your Slack channel id
            text: finalMessage,
        });
    } catch (error) {
        console.error(error);
    }
};

runScrapers();
