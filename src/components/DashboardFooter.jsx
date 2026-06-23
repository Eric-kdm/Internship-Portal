function DashboardFooter() {
  return (
    <footer className="mt-10 border-t pt-6">

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <p className="text-sm text-gray-500">
          © 2026 Internship Portal. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm text-gray-500">

          <a href="#" className="hover:text-blue-600">
            Privacy Policy
          </a>

          <a href="#" className="hover:text-blue-600">
            Terms of Service
          </a>

          <a href="#" className="hover:text-blue-600">
            Support
          </a>

          <a href="#" className="hover:text-blue-600">
            Contact
          </a>

        </div>

      </div>

    </footer>
  );
}

export default DashboardFooter;