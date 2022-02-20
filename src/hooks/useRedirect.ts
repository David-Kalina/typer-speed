import { useEffect } from 'react'
import { useNavigate } from 'react-location'

export const useRedirect = (condition: unknown, pathName: string) => {
  const navigate = useNavigate()

  console.log(condition)

  useEffect(() => {
    if (condition) {
      return navigate({ to: `/${pathName}`, replace: true })
    }
  }, [condition, navigate, pathName])
}
