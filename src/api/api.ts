import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonSprites = async (pokemonNames: string[]): Promise<string[]> => {
    try {
        const spriteURLs = await Promise.all(
            pokemonNames.map(async (name) => {
                const res = await axios.get(`${BASE_URL}/pokemon/${name}`);
                return res.data.sprites?.front_default || '';
            })
        );

        return spriteURLs.filter(Boolean);
    } catch (error) {
        console.error('Error fetching Pokémon sprites:', error);
        return [];
    }
};
