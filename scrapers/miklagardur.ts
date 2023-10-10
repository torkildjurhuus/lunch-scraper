import axios from 'axios';
import cheerio from 'cheerio';

export const scrapeMiklagardurMenu = async (): Promise<string | null> => {
    const maxRetries = 5;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            const { data } = await axios.get('https://www.sms.fo/', {
                timeout: 5000,
            });
            const $ = cheerio.load(data);
            const title = $('div.food-content > div.food-inner-content > div > div.food-day.active')
                .find('.food-day-title')
                .text()
                .trim();

            if (title) {
                return title;
            }
        } catch (error) {
            console.error(`An error occurred on attempt ${retries + 1}: ${error}`);
        }

        retries++;
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
    }
    return null;
};
