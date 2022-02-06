import { Route, DefaultGenerics } from 'react-location'
import TypingTest from '../components/TypingTest'
import Login from '../components/Auth'
import Layout from '../components/Layout'
import React from 'react'
import Account from '../components/Account'
import Test from '../components/Test'

const text = `Humpty Dumpty sat on a wall, Humpty Dumpty had a great fall. All the king's horses and all the king's men were unable to`

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
    path: '/test',
    element: (
      <Layout>
        <Test margin={1} fontSize={32} text={text} />
      </Layout>
    ),
  },
]
