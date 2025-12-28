import './comicsList.scss';
import usePokemonService from '../../services/PokemonService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>
            break
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>
            break
        case 'confirmed':
            return <Component/>
            break
        case 'error':
            return <Error/>
            break
        default:
            throw new Error('Unexpected process')
    }
}

const ComicsList = () => {
    const [list, setList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [charEnded, setCharEnded] = useState(false)
    const {getAllItems, getItemsImage, process, setProcess } = usePokemonService()

    useEffect(()=>{
        onRequest(offset, true)
    }, [])
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllItems(offset)
        .then(async(res) => {
            const listWithImages = await Promise.all(
                    res.map(async item => {
                        const id = item.url.split('/').at(-2);
                        const thumbnail = await getItemsImage(id);
                        return { ...item, id, thumbnail };
                    })
                );
                return listWithImages
            })
            .then(onListLoaded)
            .then(()=>setProcess('confirmed'))
    }

    const onListLoaded = (newCharList) => {
        let ended = false
        if(newCharList.length < 20) {
            ended = true
        }

        setList(list => [...list, ...newCharList])
        setNewItemLoading(false)
        setOffset(offset => offset + 20)
        setCharEnded(ended)
    }
    console.log('render')
    const myRef = useRef([])
    const setInputRef = (el, i) => {
        myRef.current[i] = el
    }
    const onFocus = (i) => {
        myRef.current.forEach(item => item.classList.remove('char__item_selected'))
        myRef.current[i].classList.add('char__item_selected')
    }
    
    const renderItems = (arr) => {
        const cards = arr.map(({name, id, thumbnail}, index) => {
            return (
                <li tabIndex={0} className="comics__item" key={id} ref={el => setInputRef(el, index)} onClick={()=>onFocus(index)}>
                    <Link to={`/single/${id}?type=comic`}>
                        <img src={thumbnail} alt={name} className="comics__item-img"/>
                        <div className="comics__item-name">{name}</div>
                    </Link>
                </li>
            )
        })
        return (
            cards
        )
    }

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {setContent(process, ()=> renderItems(list), newItemLoading)}
                <button
                onClick={()=>{onRequest(offset)}}
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </ul>
        </div>
    )
}

export default ComicsList;