import { NavLink } from 'react-router-dom'

export function AppHeader() {
    return (
        <header className="app-header">
            <h1>MarketTest</h1>
            <nav >
                <NavLink title='Home' to="/"><i className="fa-solid fa-house fa-lg"></i></NavLink>
                <NavLink title='Login' to="/admin"><i className="fa-solid fa-user fa-lg"></i></NavLink>
            </nav>
        </header>
    )
}