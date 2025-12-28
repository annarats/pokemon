import {useHttp} from '../hooks/https.hook'

const usePokemonService = () => {
    const _apiBase = 'https://pokeapi.co/api/v2/';
    const _baseOffset = 0;
    const {loading, error, request, clearError, process, setProcess} = useHttp()

    const getAllCharacters = async(offset = _baseOffset) => {
        const res = await request(`${_apiBase}pokemon-species/?limit=9&offset=${offset}`)
        return res.results.map(_tranformAllCharacters)
    }
    
    const getCharacter = async(id) => {
        const res = await request(`${_apiBase}pokemon-species/${id}`)
        return _transformCharacter(res)
    }

    const getCharacterImage = async(id) => {
        const res =  await request(`${_apiBase}pokemon/${id}`)
        return _transformCharacterImage(res)
    }

    const getCharacterGames = async(id) => {
        const res =  await request(`${_apiBase}pokemon/${id}`)
        return _transformCharacterGames(res)
    }

    const getAllItems = async(offset = _baseOffset) => {
        const res = await request(`${_apiBase}item/?limit=20&offset=${offset}`)
        return res.results.map(_transformAllItems)
    }
    const getItem = async(id) => {
        const res = await request(`${_apiBase}item/${id}`)
        return _transformItem(res)
    }
    const getItemsImage = async(id) => {
        const res = await request(`${_apiBase}item/${id}`)
        return _transformItemsImage(res)
    }
    const _transformCharacter = (res) => {
        return{
            name: res.name,
            description: res.flavor_text_entries[0].flavor_text ? `${res.flavor_text_entries[0].flavor_text.slice(0, 500)}...` : 'There is no description for this character',
            fulldescription: res.flavor_text_entries[0].flavor_text ? res.flavor_text_entries[0].flavor_text : 'There is no description for this character',
            homepage: `https://www.pokemon.com/us/pokedex/${res.name}`,
            wiki: `https://bulbapedia.bulbagarden.net/wiki/${res.name}_(Pokémon)`
        }
    }
    const _transformCharacterGames = (res) => {
        return res.game_indices
    }
    const _transformCharacterImage = (res) => {
        return res.sprites.other['official-artwork'].front_default
    }
    const _tranformAllCharacters = (res) => {
        return{
            name: res.name,
            url: res.url
        }
    }
    const _transformAllItems = (res) => {
        return{
            name: res.name,
            url: res.url
        }
    }
    const _transformItem = (res) => {
        return{
            name: res.name,
            url: res.url
        }
    }
    const _transformItemsImage = (res) => {
        return res.sprites.default
    }
    return{loading, error, request, clearError, getAllCharacters, getCharacter, getCharacterImage, getCharacterGames, getAllItems, getItem, getItemsImage, process, setProcess}
}

export default usePokemonService;