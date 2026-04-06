export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/[0.06]">
      <p className="text-white/60 text-sm text-center">
        © {new Date().getFullYear()} Innove — Todos os direitos reservados
      </p>
    </footer>
  );
}
