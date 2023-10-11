import axios from 'axios';

export const scrapeFkMenu = async () => {
    const API_KEY = '';
    const imageUrl = 'https://www.fk.fo/wp-content/uploads/2023/10/Matskra%CC%81in-Vika-41.jpg';

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

    axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`, requestData)
        .then(response => {
            const textAnnotations = response.data.responses[0].textAnnotations;
            const allText = textAnnotations.map(annotation => annotation.description);
            const menuText = allText.join(' ');

            const daysAndDates = /(\w+ (\d+\/\d+))/g; // Regular expression to match day names and their corresponding dates
            let matches = menuText.match(daysAndDates) || [];
            const today = new Date();
            const todayDate = today.getDate() + "/" + (today.getMonth() + 1).toString().padStart(2, "0"); // Format date as DD/MM

            let todayIndex = matches.findIndex(match => match.includes(todayDate));
            let todayMenu = '';

            if (todayIndex !== -1 && todayIndex + 1 < matches.length) {
                const startStr = matches[todayIndex];
                const endStr = matches[todayIndex + 1];
                const startIndex = menuText.indexOf(startStr) + startStr.length;
                const endIndex = menuText.indexOf(endStr);

                todayMenu = menuText.slice(startIndex, endIndex).trim();
                todayMenu = todayMenu.replace(/\\n/g, '\n');  // Replace '\n' string with actual newlines
            }

            const result = {
                date: todayDate,
                menu: todayMenu
            };

            console.log(result.menu);
        })
        .catch(error => {
            console.error('Error:', error);
        });
};
