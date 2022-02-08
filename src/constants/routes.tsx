import { Route, DefaultGenerics } from 'react-location'
import TypingTest from '../components/TypingTest'
import Login from '../components/Auth'
import Layout from '../components/Layout'
import React from 'react'
import Account from '../components/Account'
import WordManager from '../components/WordManager'
import { WordManagerProps } from '../types'
import { testWords } from './testWords'
import WordManagerWrapper from '../components/WordManagerWrapper'

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
  {
    path: '/refactor',
    element: (
      <Layout>
        <WordManagerWrapper fontSize={1.5}>
          <WordManager words={testWords} />
        </WordManagerWrapper>
      </Layout>
    ),
  },
]
