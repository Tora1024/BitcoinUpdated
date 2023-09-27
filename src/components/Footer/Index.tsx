import { Link } from 'preact-router';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white text-center p-4 absolute bottom-0 w-full">
      &copy; {currentYear} <Link href="/">Bitcoin Price</Link> | <Link href="/about">About Us</Link>
    </footer>
  );
}

export default Footer;
