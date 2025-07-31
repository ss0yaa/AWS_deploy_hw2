import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CommentPage from "./pages/CommentPage";
import WritePage from "./pages/WritePage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import DeletePage from "./pages/DeletePage";

const router = createBrowserRouter([
  {
    // / 경로로 접속하면, 기본적으로 <App /> 컴포넌트가 렌더링
    // children은 <App /> 안에 서브 페이지들을 중첩 라우팅으로 포함
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <CommentPage />,
      },
      {
        path: "/write",
        element: <WritePage />,
      },
      {
        path: "/comment/:id",
        element: <DetailPage />,
      },
      {
        path: "/edit/:id",
        element: <EditPage />,
      },
      {
        path: "/delete/:id",
        element: <DeletePage />,
      },
    ],
  },
]);

export default router;
