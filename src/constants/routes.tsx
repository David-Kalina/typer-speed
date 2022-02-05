import { Route, DefaultGenerics } from 'react-location'
import TypingTest from '../components/TypingTest'
import Login from '../components/Auth'
import Layout from '../components/Layout'
import React from 'react'
import Account from '../components/Account'
export const routes: Route<DefaultGenerics>[] = [
  {
    path: '/',
    element: (
      <Layout>
        <TypingTest />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: '/account',
    element: (
      <Layout height="100%">
        <Account />
      </Layout>
    ),
  },
]
