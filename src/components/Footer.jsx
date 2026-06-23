function Footer() {
  return (
    <footer className="bg-white border-t mt-12 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
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
            Help Center
          </a>

          <a href="#" className="hover:text-blue-600">
            Contact
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;