import { useEffect } from 'react'
import { useNavigate } from 'react-location'

export const useRedirect = (condition: unknown, pathName: string) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (condition) {
      return navigate({ to: `/${pathName}`, replace: true })
    }

    return undefined
  }, [condition, navigate, pathName])
}
