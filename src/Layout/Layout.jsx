import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";
import RightSidebar from "../Components/RightSidebar";

const Layout = ({ children }) => {
  return (
    <div className="w-full overflow-hidden bg-zinc-100 justify-between relative flex h-screen">
      <Sidebar />
      <div className="lg:w-[calc(100%-44rem)] w-[calc(100%-20rem)] overflow-y-scroll relative">
        {children}
      </div>
      <RightSidebar />
      <Footer />
    </div>
  );
};

export default Layout;
