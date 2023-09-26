function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white text-center p-4 absolute bottom-0 w-full">
      &copy; {currentYear} Bitcoin Price | <a href="/about">About Us</a>
    </footer>
  );
}

export default Footer;
