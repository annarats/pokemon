import {lazy, Suspense} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../../pages/404'))
const MainPage = lazy(() => import('../../pages/MainPage'))
const SingleComicPage = lazy(() => import('../../pages/SingleComicPage'))

const App = () => {

    return (
        <BrowserRouter basename="/pokemon">
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/single/:id" element={<SingleComicPage />} />
                            <Route path="*" element={<Page404/>} />
                        </Routes>
                    </Suspense>    
                </main>
            </div>
        </BrowserRouter>
        
    )

}

export default App;