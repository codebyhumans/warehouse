import React, { useMemo } from 'react'

interface IProps {
  value: number
}

export const Currency: React.FC<IProps> = ({ value }) => {
  const amount = useMemo(() => (value / 100).toFixed(2), [value])

  return <>{amount}</>
}
