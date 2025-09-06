import {createBrowserRouter} from "react-router-dom";
import { CategoryLayout, ItemsLayout, MainLayout, PurchaseDetailPage } from "./layout";
import { CategoryDetails, EmployeeInfoPage, HomePage, ItemsDetailPage, LoginPage, MainCategory, MainEmployeePage, MainItemsPage, MainPurchasePage } from "./pages";
import { InlineIcon } from "@iconify/react/dist/iconify.js";
import { UseRedirectAuth,UseProtectedRoute } from "./store/useAuthStore";
import EmployeeLayout from "./layout/EmployeeLayout";
import EmployeeAddInfoPage from "./pages/employees/EmployeeAddInfoPage";
import PurchaseLayout from "./layout/PurchaseLayout";
import MainTransactionPage from "./pages/transactions/MainTransactionPage";
import PurchaseAddDetailPage from "@/pages/purchase/PurchaseAddDetailPage.jsx";
import PurchaseItemDetailPage from "./pages/purchase/PurchaseItemDetailPage";
import UpdateTransactionPage from "./pages/transactions/UpdateTransactionPage";
import ItemCreatePage from "./pages/items/ItemCreatePage";
import CreateNewPurchase from "./pages/purchase/CreateNewPurchase";
import UpdatePurchase from "./pages/purchase/updatePurchase";
import CreateTransaction from "./pages/transactions/CreateTransaction";


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
          {path: "mutate", element: <ItemCreatePage/>},
        ]
      },
      {
        path: "employees", element: <EmployeeLayout/>,
        children: [
          {index: true, element: <MainEmployeePage/>},
          {path: "employees-info/:id", element: <EmployeeAddInfoPage/>},
          {path: ":id", element: <EmployeeInfoPage/>},
        ]
      },
      { 
        path: "purchase", element: <PurchaseLayout/>,
        children: [
          {index: true, element: <MainPurchasePage/>},
          {path: "new", element: <CreateNewPurchase/>},
          {path: "update", element: <UpdatePurchase/>},
          {path: ":id", element: <PurchaseDetailPage/>},
          {path: ":id/purchase-info", element: <PurchaseAddDetailPage/>},
          {path: ":id/purchase-info/:pi_id", element: <PurchaseItemDetailPage/>},
        ]
      },
      {
        path: "transaction", element:< MainTransactionPage/>,
      },
      {
        path: 'transaction/new', element: <CreateTransaction/>
      },
      {
        path: "transaction/:id", element:< UpdateTransactionPage/>
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

