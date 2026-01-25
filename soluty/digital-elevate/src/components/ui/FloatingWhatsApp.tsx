import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/33123456789" // Replace with actual number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 animate-bounce-slow hover:shadow-[#25D366]/40 hover:shadow-2xl"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={32} fill="white" className="text-white" />
    </a>
  );
}
