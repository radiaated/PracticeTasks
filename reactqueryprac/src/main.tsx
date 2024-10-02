import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostsPage from "./page/PostsPage";
import CreatePostPage from "./page/CreatePostPage";
import { QueryClient, QueryClientProvider } from "react-query";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const client: QueryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/posts",
    element: <PostsPage />,
  },
  {
    path: "/post/create",
    element: <CreatePostPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
