function Navbar() {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        InternHub
      </h1>

      <div className="flex gap-6">

        <button>Home</button>

        <button>Dashboard</button>

        <button>Profile</button>

      </div>

    </div>
  );
}

export default Navbar;