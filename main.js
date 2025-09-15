const apiKey = `d114bde3033b42e2b269078193ce6b0f`;
let news = [];
const getLatestNews = async () => {
    const url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    );
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log("dddd", news);
};
getLatestNews();