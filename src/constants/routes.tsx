import React from 'react'
import { DefaultGenerics, Route } from 'react-location'
import Account from '../components/Account'
import Login from '../components/Auth'
import Layout from '../components/Layout'
import TypingTest from '../components/TypingTest'

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
      <Layout>
        <Account />
      </Layout>
    ),
  },

  {
    path: '/refactor',
    element: (
      <Layout>
        <TypingTest />
      </Layout>
    ),
  },
]
