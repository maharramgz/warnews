export default async function handler(req, res) {
    // Pulls your key from Vercel's secret Environment Variables
    const API_KEY = process.env.NEWS_API_KEY;

    const query = "(Israel AND IDF) OR (Iran AND Tehran) OR (Pentagon AND 'Middle East')";
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=40&language=en&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Set headers to prevent caching issues and allow the response
        res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Intelligence retrieval failed." });
    }
}