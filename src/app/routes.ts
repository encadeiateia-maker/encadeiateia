import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Projects } from "./pages/Projects";
import { Process } from "./pages/Process";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "services", Component: Services },
      { path: "projects", Component: Projects },
      { path: "process", Component: Process },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "blog", Component: Blog },
      { path: "blog/:id", Component: BlogPost },
      { path: "*", Component: NotFound },
    ],
  },
]);
