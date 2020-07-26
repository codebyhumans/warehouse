import React, { useState, Key } from 'react'

import TableTree from '@atlaskit/table-tree'
import { colors } from '@atlaskit/theme'
import styled from 'styled-components'

interface KeyValue {
  propery: string
  value: any
  children?: KeyValue[]
}

interface IProps {
  list: KeyValue[]
}

export const PropertyList: React.FC<IProps> = (props) => {
  const [items] = useState(props.list.map((content, id) => ({ id, content })))

  const ColProperty = (content: KeyValue) => {
    return <Property>{content.propery}</Property>
  }

  const ColValue = (content: KeyValue) => {
    const value = typeof content.value === 'function' ? content.value() : content.value
    return <span>{value || '–'}</span>
  }

  return (
    <Wrapper>
      <TableTree
        columns={[ColProperty, ColValue]}
        columnWidths={['40%', '60%']}
        items={items}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-right: -25px;
  margin-left: -25px;
`

const Property = styled.span`
  font-size: 13px;
  color: ${colors.N600};
`
