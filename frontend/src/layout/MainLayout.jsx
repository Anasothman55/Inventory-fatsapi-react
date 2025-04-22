import { Outlet } from "react-router-dom"
import {  Sidebar } from "../components/content"
import MobileSidebar from "@/components/content/MobileSidebar"
import { sidebarPage } from "@/RouterRoot"


const MainLayout = () => {
  return (
    <div className="flex gap-5 items-start h-full">
      <aside className="size-40 py-3 max-lg:hidden" >
        <Sidebar/>
      </aside>



      <main className="w-full h-full overflow-auto bg-white shadow-sm py-3 px-5 rounded-md relative">
        <aside className="lg:hidden text-end sticky top-1 ">
          <MobileSidebar sidebarPage={sidebarPage}/>
        </aside>
        <Outlet />
      </main>
    </div>
  )
}
export default MainLayout






