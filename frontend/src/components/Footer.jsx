export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24">
      <p className="dark:text-gray-200 text-gray-700 text-center m-20 capitalize">
        © {currentYear} All rights reserved by Code Crusaders.
      </p>
    </footer>
  );
}
