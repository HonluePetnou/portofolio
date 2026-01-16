export function Footer() {
  return (
    <footer className="w-full py-6 mt-20 border-t border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row md:px-8">
        <p className="text-center text-sm text-gray-400 md:text-left">
          &copy; {new Date().getFullYear()} Honlue Petnou Frederic Armel.
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com" // Update with actual link if available or keep generic
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
