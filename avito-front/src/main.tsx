import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";

import { Toaster } from "@/components/ui/sonner";
import MainLayout from "@/layouts/MainLayout.tsx";
import ItemPage from "@/routes/ItemPage/ItemPage.tsx";
import ListPage from "@/routes/ListPage/ListPage.tsx";
import StatsPage from "@/routes/StatsPage/StatsPage.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <Navigate to="/list" replace />,
            },
            {
                path: "/list",
                element: <ListPage/>,
            },
            {
                path: "/item/:id",
                element: <ItemPage/>,
            },
            {
                path: "/stats",
                element: <StatsPage/>,
            },
        ]
    }

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
              <ToastContainer position="bottom-right" />
              <Toaster />
          </QueryClientProvider>
      </ThemeProvider>
  </StrictMode>,
)
