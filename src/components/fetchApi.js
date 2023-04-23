import axios from 'axios';
export const fetchApi = async pokemon => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const res = await fetch(url);
    const data = await res.json();
    return data; // this is the data from the api
  } catch (error) {
    console.log(error);
  }
};

export const getPokemons = async (limit = 20, offset = 0) => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPokemonData = async url => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getGiveaways = async () => {
  try {
    const url = 'https://gamerpower.p.rapidapi.com/api/giveaways?platform=pc';

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDADPI_KEY,
        'X-RapidAPI-Host': 'gamerpower.p.rapidapi.com'
      }
    };

    const res = await fetch(url, options);
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const getMinecraftData = async () => {
  try {
    const url = 'http://localhost:3001/db';

    const res = await fetch(url);
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

//Language: javascript;

const url = 'http://localhost:3005';
const query = {
  name: 'name'
};
export const fetchMcData = async mc => {
  try {
    console.log(`${url}/search/${mc}`);
    return fetch(`${url}/search/${mc}`);
  } catch (error) {
    console.log(error);
  }
};

export const getMcData = async mc => {
  try {
    let url = `http://localhost:3005/search/${mc}`;
    const res = await fetch(url);
    const data = await res.json();
    return data; // this is the data from the api
  } catch (error) {
    console.log(error);
  }
};
export const getAnimeData = async anm => {
  try {
    let url = `https://api.waifu.pics/sfw/${anm}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const fetchItems = async () => {
//   try {
//     const BASE_URL = import.meta.env.VITE_SUPABASE_REST_URL;
//     const TABLE_NAME = 'items';
//     const response = await axios.get(`${BASE_URL}/${TABLE_NAME}?select=*`, {
//       headers: {
//         apikey: import.meta.env.VITE_SUPABASE_APIKEY
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

