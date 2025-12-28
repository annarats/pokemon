import './charList.scss';
import usePokemonService from '../../services/PokemonService';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';
import { useState, useEffect, useRef, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner />
        case 'confirmed':
            return <Component />
        case 'error':
            return <Error />
        default:
            throw new Error('Unexpected process')
    }
}

const CharList = (props) => {
    const [list, setList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    const { getAllCharacters, getCharacterImage, process, setProcess } = usePokemonService();

    const nodeRef = useRef([]);

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = async (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        try {
            const res = await getAllCharacters(offset);
            const listWithImages = await Promise.all(
                res.map(async item => {
                    const id = item.url.split('/').at(-2);
                    const thumbnail = await getCharacterImage(id);
                    return { ...item, id, thumbnail };
                })
            );
            onListLoaded(listWithImages);
            setProcess('confirmed')
        } catch (e) {
            console.error(e);
            setNewItemLoading(false);
            setProcess('error')
        }
    };

    const onListLoaded = (newCharList) => {
        const ended = newCharList.length < 9;
        setList(prevList => [...prevList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(prevOffset => prevOffset + 9);
        setCharEnded(ended);
    };

    const focusOnItem = (index) => {
        nodeRef.current.forEach(item => {
            if (item) item.classList.remove('char__item_selected');
        });

        if (nodeRef.current[index]) {
            nodeRef.current[index].classList.add('char__item_selected');
            nodeRef.current[index].focus();
        }
    };

    const renderItems = (arr) => {
        const cards = arr.map(({ name, id, thumbnail }, index) => {

            return (
                <CSSTransition
                    classNames="fade"
                    timeout={600}
                >
                    <li
                        ref={el => nodeRef.current[index] = el}
                        tabIndex={0}
                        key={id}
                        onClick={() => {
                            props.onCharSelected(id);
                            focusOnItem(index);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onCharSelected(id);
                                focusOnItem(index);
                            }
                        }}
                        className="char__item"
                    >
                        <img src={thumbnail} alt={name} />
                        <div className="char__name">{name}</div>
                    </li>
                </CSSTransition>
            );
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {cards}
                </TransitionGroup>
            </ul>
        );
    };

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(list), newItemLoading)
    }, [process])

    return (
        <div className="char__list">
            {elements}
            <button
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={{ display: charEnded ? 'none' : 'block' }}
                className="button button__main button__long"
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default CharList;
