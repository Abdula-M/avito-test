import { Outlet } from "react-router-dom";

import Footer from "@/layouts/Footer/Footer.tsx";
import Navbar from "@/layouts/Header/Navbar.tsx";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64">
                <Navbar />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;