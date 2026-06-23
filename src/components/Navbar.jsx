function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-blue-600 font-bold text-2xl">
            Portal
          </h1>

          <div className="hidden md:flex gap-6 text-gray-600">
            <a href="#">Opportunities</a>
            <a href="#">Messages</a>
            <a href="#">Resources</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="cursor-pointer">🔔</span>
          <span className="cursor-pointer">🌙</span>

          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;