import React, { useMemo } from 'react'
import dayjs from 'dayjs'

import Tooltip from '@atlaskit/tooltip'
import Tag from '@atlaskit/tag'

interface IProps {
  value: Date | string | number | undefined
  format?: string
  detailFormat?: string
}

export const Date: React.FC<IProps> = ({ value, format, detailFormat }) => {
  const date = useMemo(() => dayjs(value).format(format || 'MMMM D, YYYY'), [
    value,
    format,
  ])

  const detailDate = useMemo(
    () => dayjs(value).format(detailFormat || 'dddd, MMMM D, YYYY HH:mm'),
    [value, detailFormat],
  )

  return (
    <Tooltip content={detailDate} position="top">
      <Tag text={date} />
    </Tooltip>
  )
}
