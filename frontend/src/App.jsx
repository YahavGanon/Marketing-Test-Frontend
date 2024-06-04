import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './assets/style/main.scss';
import { AppHeader } from './cmps/AppHeader';
import { HomePage } from './pages/HomePage';

// Import AdminPage from the pages directory
import { AdminPage } from './pages/AdminPage';

export function App() {
    return (
        <>
            <Router>
                <section className="main-layout app">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AdminPage />} path="/admin" /> {/* Use element prop instead of component for rendering */}
                        </Routes>
                    </main>
                </section>
            </Router>
        </>
    );
}