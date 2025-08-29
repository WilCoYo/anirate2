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