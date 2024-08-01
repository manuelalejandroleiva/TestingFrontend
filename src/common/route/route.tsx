import { createBrowserRouter } from "react-router-dom";

import { RootLayout } from "../../layout/RootLayout";

import React from "react";
import { Testing } from "src/pages/Login/Testing";
import Add from "src/pages/Add/Add";
import Edit from "src/pages/Edit/Edit";


const router = createBrowserRouter(
    [
        {
            path:'/',
            element:<RootLayout />,
            children: [
                {
                  index: true,
                  element: <Testing />,
                },
            ]

        },
        {
            path:'/add',
            element:<RootLayout />,
            children: [
                {
                  index: true,
                  element: <Add />,
                },
            ]

        },
        {
            path:'/edit/:id',
            element:<RootLayout />,
            children: [
                {
                  index: true,
                  element: <Edit />,
                },
            ]

        },
        {
            path: '*',
            element: <div>Not Found Page</div>,
          },
    ]
)

export default  router
