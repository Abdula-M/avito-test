import './Navbar.scss'

import { useLocation, useNavigate } from "react-router-dom"

import { List, BarChart3, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button.tsx"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const isHome = location.pathname === '/list'
    const isStats = location.pathname === '/stats'
    const isItemPage = location.pathname.startsWith('/item/')

    const listButtonText = isItemPage ? 'К списку' : 'Список'
    const ListIcon = isItemPage ? ArrowLeft : List

    return (
        <header className="navbar">
            <div className="navbar__container">
                <div onClick={() => navigate('/list')} className="navbar__logo-wrapper">
                    <span className="navbar__logo-text">
                        Avito
                    </span>
                </div>

                <nav className="navbar__nav">
                    <Button
                        variant="ghost"
                        size="default"
                        className={isHome || isItemPage ? 'navbar__button--active' : ''}
                        onClick={() => navigate('/list')}
                    >
                        <ListIcon className="navbar__button-icon" />
                        {listButtonText}
                    </Button>
                    <Button
                        variant="ghost"
                        size="default"
                        className={isStats ? 'navbar__button--active' : ''}
                        onClick={() => navigate('/stats')}
                    >
                        <BarChart3 className="navbar__button-icon" />
                        Статистика
                    </Button>
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    )
}

export default Navbar;