import React from 'react'
import { DefaultGenerics, Route } from 'react-location'
import Account from '../components/Account'
import Login from '../components/Auth'
import Layout from '../components/Layout'
import Space from '../components/Space'
import TypingTest from '../components/TypingTest'

export const routes: Route<DefaultGenerics>[] = [
  {
    path: '/',
    element: (
      <Space>
        <Layout>
          <TypingTest />
        </Layout>
      </Space>
    ),
  },
  {
    path: '/login',
    element: (
      <Space>
        <Layout>
          <Login />
        </Layout>
      </Space>
    ),
  },
  {
    path: '/account',
    element: (
      <Space>
        <Layout>
          <Account />
        </Layout>
      </Space>
    ),
  },
  {
    path: '/space',
    element: (
      <Space>
        <Layout>
          <TypingTest />
        </Layout>
      </Space>
    ),
  },
]
