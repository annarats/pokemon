import { useState } from "react";
import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import CharForm from "../components/charForm/CharForm"
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import './mainPage.scss'

const MainPage = () => {

    const [selectedChar, setChar] = useState(null)

    const onCharSelected = (id) => {
        setChar(id)
    }
    return(
        <>
            <RandomChar/>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <div className="right">
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    <CharForm/>
                </div>
            </div>
        </>
    )

}

export default MainPage;