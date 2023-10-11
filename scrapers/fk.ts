import axios from 'axios';
import cheerio from 'cheerio';

export const scrapeFkMenu = async (): Promise<string | null> => {
    const API_KEY = process.env.GOOGLE_CLOUD_VISION_API_KEY;

    try {
        // Step 1: Fetch the FK main page for the image URL
        const response = await axios.get('https://www.fk.fo/matskrain-i-hoyvik/');
        const $ = cheerio.load(response.data);
        const imageUrl = $('#st-container > div.st-pusher > div > div > div > div.container.content-page > div > div > div.content.col-md-9 > section > div.vc_row.wpb_row.vc_row-fluid > div > div > div > div.wpb_single_image.wpb_content_element.vc_align_left img').attr('src');

        if (!imageUrl) {
            console.error('Failed to fetch the image URL.');
            return null;
        }

        const requestData = {
            requests: [
                {
                    image: {
                        source: {
                            imageUri: imageUrl
                        }
                    },
                    features: [
                        {
                            type: 'TEXT_DETECTION'
                        }
                    ]
                }
            ]
        };

        const ocrResponse = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`, requestData);

        const textAnnotations = ocrResponse.data.responses[0].textAnnotations;
        const allText = textAnnotations.map(annotation => annotation.description);
        const menuText = allText.join(' ');

        const daysAndDates = /(\w+ (\d+\/\d+))/g;
        let matches = menuText.match(daysAndDates) || [];
        const today = new Date();
        const todayDate = today.getDate() + "/" + (today.getMonth() + 1).toString().padStart(2, "0");

        let todayIndex = matches.findIndex(match => match.includes(todayDate));
        let todayMenu = '';

        if (todayIndex !== -1 && todayIndex + 1 < matches.length) {
            const startStr = matches[todayIndex];
            const endStr = matches[todayIndex + 1];
            const startIndex = menuText.indexOf(startStr) + startStr.length;
            const endIndex = menuText.indexOf(endStr);

            todayMenu = menuText.slice(startIndex, endIndex).trim();
            todayMenu = todayMenu.replace(/\\n/g, '\n');
        }

        return todayMenu;

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};
