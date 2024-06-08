import Footer from "../components/Footer/Footer";
import Header from "../components/Header/index";

function DefaultLayout({ children }) {
  return (
    <div className="max-w-full dark:bg-gray-900 dark:text-white">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <div className="max-w-full mt-10  dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
