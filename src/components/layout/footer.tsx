const Footer = () => {
  return (
    <footer className="bg-pink-100">
      <div className="flex mx-auto text-center justify-center gap-4 py-6 text-sm text-gray-500 px-5">
        <p className="text-sm font-semibold">
          Monthsary &copy; {new Date().toLocaleDateString()}
        </p>
        <p className="text-sm">Made with 💘 for You</p>
      </div>
    </footer>
  );
};

export default Footer;
