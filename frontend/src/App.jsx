import { RouterProvider } from "react-router-dom"
import { route } from "./RouterRoot"
import { useCheckAuth } from "./hook/authHooks"
import { Toaster } from "./components/ui/sonner"


function App() {
  
  const { isLoading, isChecked } = useCheckAuth()

  if (isLoading || !isChecked) {
    return <div></div>
  }

  return (
    <div className="bg-gray-100 h-[100vh] p-2">
      <RouterProvider router={route}/>
      <Toaster richColors/>
    </div>
  )
}

export default App
