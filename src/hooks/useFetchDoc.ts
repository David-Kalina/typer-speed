import { DocumentData, getDocs, Query } from 'firebase/firestore'
import React, { useEffect } from 'react'

export const useFetchDoc = (query: Query<DocumentData>, key: string | number) => {
  const [data, setData] = React.useState<any>()
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    getDocs(query)
      .then(snapshot => {
        setData(snapshot.docs.map(doc => doc.data()[0][key]))
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [key, query])

  return { data, loading }
}
