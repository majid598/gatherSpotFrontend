import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";
import RightSidebar from "../Components/RightSidebar";

const Layout = ({ children }) => {
  return (
    <div className="w-full !overflow-hidden bg-zinc-100 justify-between relative flex !h-screen">
      <Sidebar />
      <div className="xl:w-[calc(100%-44rem)] md:w-[calc(100%-16rem)] sm:w-[calc(100%-4rem)] w-full overflow-y-scroll relative">
        {children}
      </div>
      <RightSidebar />
      <Footer />
    </div>
  );
};

export default Layout;
