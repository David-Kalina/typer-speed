import { DocumentData, getDocs, Query } from 'firebase/firestore'
import React, { useEffect } from 'react'

export const useFetchDocs = (query: Query<DocumentData>) => {
  const [data, setData] = React.useState<DocumentData[]>([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    getDocs(query)
      .then(snapshot => {
        setData(snapshot.docs.map(doc => doc.data()))
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [query])

  return { data, loading }
}
