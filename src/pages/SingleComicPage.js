import './singleComicPage.scss';
import usePokemonService from '../services/PokemonService';
import Spinner from '../components/spinner/Spinner';
import Error from '../components/error/Error';
import { useState, useEffect} from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const SingleComic = () => {
    const {id} = useParams()
    const {loading, error, getItem, getItemsImage, getCharacter, getCharacterImage, clearError} = usePokemonService()
    const location = useLocation();
    const [data, setData] = useState(null);
    const type = new URLSearchParams(location.search).get('type'); 

    useEffect(()=>{
        onRequest()
    }, [id, type])
    const onRequest = async () => {
        clearError();

        try {
            let item;
            let thumbnail;

            item = await getCharacter(id);
            thumbnail = await getCharacterImage(id);

            setData({
                ...item,
                thumbnail
            });

        } catch (err) {
            console.error(err);
        }
    };

    const errorMessage = error ? <Error/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <View data={data}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({data}) => {
    let history = useNavigate();

    const goBack = () => {
        history(-1)
    }
    const {name, fulldescription, thumbnail} = data;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{fulldescription}</p>
                <button onClick={goBack} className="single-comic__back">Back to all</button>
            </div>
            
        </div>
    )
}

export default SingleComic;