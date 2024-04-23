import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="w-full overflow-hidden bg-zinc-100 justify-between relative flex h-screen">
      <Sidebar />
      <div className="lg:w-4/5 md:w-4/5 w-full overflow-y-scroll relative">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
