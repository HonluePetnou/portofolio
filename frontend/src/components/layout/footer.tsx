export function Footer() {
  return (
    <footer className="w-full py-8 mt-20 border-t border-glass-border bg-glass-bg backdrop-blur-sm">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row md:px-8">
        <p className="text-center text-sm text-muted md:text-left">
          &copy; {new Date().getFullYear()} Honlue Petnou Frederic Armel.
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
