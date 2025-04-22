// components/MobileSidebar.tsx

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react" // Optional: for hamburger icon
import { NavLink } from "react-router-dom"

const MobileSidebar = ({sidebarPage}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button  variant="ghost"  size="icon" className="lg:hidden ">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        {/* You can replace this with your real sidebar component */}
        <div className="p-3">
          <div className="mb-10">
            <h1 className="text-2xl text-emerald-700 font-bold ">Kolak Inv</h1>
          </div>

          <ul className="flex flex-col gap-5">
            {
              sidebarPage.map((items, index)=>(
                <li key={index}>
                  <NavLink className="hover:text-blue-300 grid grid-cols-[25px_1fr] items-center gap-2" to={items.path}><span className="text-[20px]">{items.icon}</span> {items.name}</NavLink>
                </li>
              ) )
            }
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
