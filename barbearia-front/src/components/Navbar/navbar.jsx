function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-purple-800 p-4 shadow-md transition-shadow duration-300">
            <div className="container mx-auto flex items-center justify-between">
                <a href="/" className="text-white text-2xl font-bold">BarberApp</a>
                <div>
                    <a href="/" className="text-xl text-gray-300 hover:text-white px-3">Home</a>
                    <a href="/contact" className="text-xl text-gray-300 hover:text-white px-3">Contato</a>
                    <a href="/login" className="text-xl text-gray-300 hover:text-white px-3">Login</a>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;