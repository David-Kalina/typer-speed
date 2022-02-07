import { Route, DefaultGenerics } from 'react-location'
import TypingTest from '../components/TypingTest'
import Login from '../components/Auth'
import Layout from '../components/Layout'
import React from 'react'
import Account from '../components/Account'
import Test from '../components/Test'

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
  // {
  //   path: '/test',
  //   element: (
  //     <Layout>
  //       <Test margin={1} fontSize={32} text={textMap} />
  //     </Layout>
  //   ),
  // },
]
