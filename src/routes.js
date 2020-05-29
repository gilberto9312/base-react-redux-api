/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react'
import Home from './views/home'
import { Redirect } from 'react-router-dom'
import DashboardLayout from './layouts/dashboard'

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/home" />
  },
  {
    path: '/home',
    exact: true,
    component: Home
  },
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: '/about',
        exact: true,
        component: lazy(() => import('./views/about'))
      }
    ]
  }
]

export default routes
