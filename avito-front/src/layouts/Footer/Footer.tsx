const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400 mt-16 border-t border-border">
            <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-6">
                <div className="text-sm text-center">
                    <p>&copy; {currentYear} Avito Модерация. Все права защищены.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
