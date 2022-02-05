import { useEffect } from 'react'
import { useNavigate } from 'react-location'

export const useRedirect = (
  condition: any,
  pathName: string,
  replace = true
) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (condition) {
      return navigate({ to: `/${pathName}`, replace: true })
    }

    return undefined

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition])
}
