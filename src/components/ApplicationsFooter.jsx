function ApplicationsFooter() {
  return (
    <footer className="mt-20 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">

      <p>
        © 2026 Architect Curations. All candidate data is encrypted.
      </p>

      <div className="flex items-center gap-6 mt-4 md:mt-0">

        <button className="hover:text-blue-600 transition">
          Next Page
        </button>

        <span className="font-medium">
          1 of 12
        </span>

        <button className="hover:text-blue-600 transition">
          Previous
        </button>

      </div>

    </footer>
  );
}

export default ApplicationsFooter;