import axios from 'axios';




export const fetchSeasonalAnime = async () => {
    try{
        const response = await axios.get("https://api.jikan.moe/v4/seasons/now");
        return response.data.data;

    } catch (error) {
        console.error('Failed to fetch Seasonal Anime', error);
        throw error;
    }
}




export const fetchAnimeNews = async () => {
    try {
        const seasonalAnime = await fetchSeasonalAnime();
        const ids = seasonalAnime.map((anime) => anime.mal_id);;
        const firstIndex = ids[0];

        const response = await axios.get(`https://api.jikan.moe/v4/anime/${firstIndex}/news`);
        return (response.data?.data ?? []).slice(0, 2);
    } catch (error) {
        console.error('Failed to fetch Anime News', error);
        throw error;
    }
}