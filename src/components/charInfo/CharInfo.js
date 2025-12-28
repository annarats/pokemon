import { useState, useEffect } from 'react';
import './charInfo.scss';
import usePokemonService from '../../services/PokemonService';
import setContent from '../../utils/setContent';

const CharInfo = (props) => {
    
    const [data, setData] = useState(null)
    const {getCharacter, getCharacterImage, clearError, process, setProcess} = usePokemonService()

    useEffect(()=> {
        updateChar();
    }, [props.charId])

    const updateChar = async () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        clearError()
        try {
            const charData = await getCharacter(charId);
            const imageData = await getCharacterImage(charId);

            setData({
                ...charData,
                thumbnail: imageData
            });
            setProcess('confirmed')
        } catch(e) {
            setProcess('error')
        }
    }

    return (
        <div className="char__info">
            {setContent(process, View, data)}
        </div>
    )
}
const View = ({data}) => {
    const { name, description, homepage, wiki, thumbnail, games } = data
    
        return(
            <>
                <div className="char__basics">
                    <img src={thumbnail} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
            </>
        )
    
}
export default CharInfo;