import axios from 'axios';



const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let queue = [];
let active = false;

const processQueue = async () =>  {
    if(active) return;
    active = true;


    while(queue.length > 0) {
        const batch = queue.splice(0, 3);
        await Promise.all(batch.map(fn => fn()))
        
        if(queue.length > 0) {
            await delay(1000);
        }
    }
    active = false;
}

const pendingRequests = new Map();

const rateLimitRequest = (requestFn, key) => {

    if (key && pendingRequests.has(key)) {
        return pendingRequests.get(key);
    }

    const promise = new Promise((resolve, reject) => {
        queue.push(async () => {
            try {
                const result = await requestFn();
                resolve(result);
            } catch(err) {
                reject(err);
            } finally {
                if (key) pendingRequests.delete(key);
            }
        });
        processQueue();
    })

    if(key) {
        pendingRequests.set(key, promise);
    }
    return promise;
}



export const fetchSeasonalAnime = async () => {
    try{
        const response = await rateLimitRequest(
            () => axios.get("https://api.jikan.moe/v4/seasons/now"), "seasonalAnime"
    );
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

        const response = await rateLimitRequest(() => axios.get(`https://api.jikan.moe/v4/anime/${firstIndex}/news`));
        return (response.data?.data ?? []).slice(0, 2);
    } catch (error) {
        console.error('Failed to fetch Anime News', error);
        throw error;
    }
}