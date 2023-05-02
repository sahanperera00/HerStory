export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" md:ml-6 md:mr-6">
      <p className="dark:text-gray-200 text-gray-700 text-center mt-10 capitalize">
        © {currentYear} All rights reserved by Code Crusaders.
      </p>
    </footer>
  );
}
