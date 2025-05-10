import { Link, NavLink } from "react-router-dom"
import { sidebarPage } from "../../RouterRoot"
import { InlineIcon } from "@iconify/react/dist/iconify.js"
import { Button } from "../ui/button"
import LogoutButton from "./LogoutButton"





const Sidebar = () => {
  return (
    <div className="flex flex-col pl-2 justify-between h-full overflow-auto">
      <div >
        <div className="mb-10">
          <h1 className="text-2xl text-emerald-700 font-bold ">
            <Link to="/">Kolak Inv</Link>
          </h1>
        </div>

        <ul className="flex flex-col gap-5">
          {
            sidebarPage.map((items, index)=>(
              <li key={index}>
                <NavLink className="hover:text-blue-300 grid grid-cols-[25px_1fr] items-center gap-2" to={items.path} ><span className="text-[20px]">{items.icon}</span> {items.name}</NavLink>
              </li>
            ) )
          }
        </ul>
      </div>
      <LogoutButton/>
    </div>
  )
}

export default Sidebar


