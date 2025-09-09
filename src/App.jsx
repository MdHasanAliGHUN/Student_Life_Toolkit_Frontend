import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

function App() {
  const [isSideBarOpen, setSideBarOpen] = useState(false)
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar isSideBarOpen={isSideBarOpen} setSideBarOpen={setSideBarOpen}/>

      <div className="flex flex-col w-full md:ml-74">
        <Navbar isSideBarOpen={isSideBarOpen} setSideBarOpen={setSideBarOpen}/>
        <main className="flex-1 p-4 md:p-8 mt-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
