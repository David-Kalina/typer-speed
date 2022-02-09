import React from 'react'
import { DefaultGenerics, Route } from 'react-location'
import Account from '../components/Account'
import Login from '../components/Auth'
import Layout from '../components/Layout'
import TypingTest from '../components/TypingTest'
import WordManager from '../components/WordManager'
import WordManagerWrapper from '../components/WordManagerWrapper'
import NewWordsManager from '../components/NewWordsManager'

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
        <WordManagerWrapper fontSize={2}>
          <WordManager />
        </WordManagerWrapper>
      </Layout>
    ),
  },
]
