import {createBrowserRouter} from "react-router-dom";
import { CategoryLayout, ItemsLayout, MainLayout } from "./layout";
import { CategoryDetails, EmployeeInfoPage, HomePage, ItemsDetailPage, LoginPage, MainCategory, MainEmployeePage, MainItemsPage } from "./pages";
import { InlineIcon } from "@iconify/react/dist/iconify.js";
import { UseRedirectAuth,UseProtectedRoute } from "./store/useAuthStore";
import EmployeeLayout from "./layout/EmployeeLayout";



export const  route = createBrowserRouter([
  {
    path: "/", element: (
      <UseProtectedRoute>
        <MainLayout />
      </UseProtectedRoute>
    ),
    children: [
      {index: true, element: <HomePage/>},
      {path: "category", element: <CategoryLayout/>,
        children: [
          {index: true, element: <MainCategory/>},
          {path: ":id", element: <CategoryDetails/>},
        ]
      },
      {path: "items", element: <ItemsLayout/>,
        children: [
          {index: true, element: <MainItemsPage/>},
          {path: ":id", element: <ItemsDetailPage/>},
        ]
      },
      {
        path: "employees", element: <EmployeeLayout/>,
        children: [
          {index: true, element: <MainEmployeePage/>},
          {path: ":id", element: <EmployeeInfoPage/>},
        ]
      }
    ]
  },
  {
    path: "/login", 
    element:(
      <UseRedirectAuth>
        <LoginPage/>
      </UseRedirectAuth>
    ) ,
  },
  {
    path: "*", element: <h1>404 not found</h1>
  }
])



export const sidebarPage = [
  {path: "/", name: "Dashboard", icon: <InlineIcon icon={"uis:graph-bar"}/>},
  {path: "/category", name: "Categories", icon: <InlineIcon icon={"material-symbols:space-dashboard"}/>},
  {path: "/items", name: "Items", icon: <InlineIcon icon={"fluent-mdl2:product-variant"}/>},
  {path: "/employees", name: "Employees", icon: <InlineIcon icon={"fa-solid:users"}/>},
  {path: "/purchase", name: "Purchase", icon: <InlineIcon icon={"bxs:purchase-tag"}/>},
  {path: "/transaction", name: "Transactions", icon: <InlineIcon icon={"carbon:ibm-data-product-exchange"}/>},

]

