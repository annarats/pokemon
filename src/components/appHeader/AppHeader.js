import './appHeader.scss';
import { NavLink } from 'react-router-dom';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <NavLink style={({ isActive }) => ({color: isActive ? '#be0807' : 'inherit'})} to="/">
                    <span>Pokémon</span> information portal
                </NavLink>
            </h1>
        </header>
    )
}

export default AppHeader;