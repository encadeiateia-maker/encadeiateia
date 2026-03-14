import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Showcase } from "./pages/Showcase";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "showcase", Component: Showcase },
      { path: "blog", Component: Blog },
      { path: "blog/:id", Component: BlogPost },
      { path: "*", Component: NotFound },
    ],
  },
]);
