import { Route, DefaultGenerics } from 'react-location'
import TypingTest from '../components/TypingTest'
import Login from '../components/Auth'
import Layout from '../components/Layout'
import React from 'react'
import Account from '../components/Account'
import Test from '../components/Test'

const text =
  `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout`.toLowerCase()

const textMap: any = {}

text.split(' ').forEach((x, i) => {
  const hash = `${x}-${i}`
  textMap[i] = {
    word: x,
    characters: x.split('').map(x => {
      return { text: x, className: 'default' }
    }),
  }
})

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
        <Test margin={1} fontSize={32} text={textMap} />
      </Layout>
    ),
  },
]
