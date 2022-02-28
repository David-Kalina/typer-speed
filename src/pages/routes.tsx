import React from 'react'
import { DefaultGenerics, Route } from 'react-location'
import Account from '../components/Account'
import Login from '../components/Auth'
import FilterableTable from '../components/FilterableTable'
import Layout from '../components/Layout'
import TypingTest from '../components/TypingTest'
import { leaderBoardFilters, leaderBoardHeaders } from '../customization/filters'
import { testsRef } from '../firebase'

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
    path: '/leaderboards',
    element: (
      <Layout>
        <FilterableTable
          personal={false}
          competitive={true}
          size="lg"
          target="seconds"
          orderTarget="wpm"
          orderStyle="desc"
          filters={leaderBoardFilters}
          headers={leaderBoardHeaders}
          caption={'Leaderboards'}
          documentReference={testsRef}
          targetLimit={10}
        />
      </Layout>
    ),
  },
]
