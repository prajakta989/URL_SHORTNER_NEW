import { useUrlState } from '@/context'
import useFetch from '@/hooks/use-fetch'
import React from 'react'

const Dashboard = () => {
  const {data} = useUrlState()
  const {loading, error, data:urls, fn:fnUrls } = useFetch()
  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
