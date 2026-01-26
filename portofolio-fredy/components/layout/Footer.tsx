export function Footer() {
  return (
    <footer className="bg-primary text-white py-12" id="contact">
      <div className="container mx-auto px-8 md:px-24 lg:px-40">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-primary font-bold">
              F
            </div>
            Fredy.
          </div>

          <div className="flex gap-8 text-sm text-gray-300">
            <a href="#" className="hover:text-secondary transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              Services
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              About
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              Projects
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              Testimonials
            </a>
          </div>

          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Fredy. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
