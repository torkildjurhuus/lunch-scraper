import axios from 'axios';
import cheerio from 'cheerio';

Date.prototype.getWeek = function(): number {
    const date = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    const dayNum = date.getUTCDay() || 7;

    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));

    return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

export const scrapeSiloMenu = async (): Promise<string | null> => {
    try {
        const { data } = await axios.get('https://silo.fo/matskra/');
        const $ = cheerio.load(data);

        const currentWeek = new Date().getWeek();
        const dayOfWeek = new Date().getDay() - 1;

        if (dayOfWeek === 5 || dayOfWeek === 6) {
            return "Ongin matskrá í vikuskiftinum";
        }


        let matskra: string | null = null;

        $('.flex_cell').each((index, weekElement) => {
            const weekTitle = $(weekElement).find('h3.ItemTitle b').text().trim();

            if (weekTitle.includes(`Vika ${currentWeek}`)) {
                const menuContent = $(weekElement).find(`#cphContent_rGroups_rItems_0_lTitleAddtional_${dayOfWeek}`).text().trim();

                if (menuContent) {
                    matskra = menuContent;
                    return false;
                }
            }
        });

        return matskra;

    } catch (error) {
        console.error(`Error occurred: ${error}`);
        return null;
    }
};
