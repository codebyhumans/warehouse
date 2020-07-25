import React from 'react'
import styled from 'styled-components'
import { TreeItem, ItemId } from '@atlaskit/tree'
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down'
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right'

interface ITreeIconProps {
  item: TreeItem
  onExpand: (itemId: ItemId) => void
  onCollapse: (itemId: ItemId) => void
}

export const TreeIcon: React.FC<ITreeIconProps> = ({ item, onExpand, onCollapse }) => {
  if (item.hasChildren) {
    return (
      <button
        tabIndex={-1}
        onClick={() => (item.isExpanded ? onCollapse(item.id) : onExpand(item.id))}
        className="icon-button">
        {item.isExpanded ? (
          <ChevronDownIcon label="" size="medium" />
        ) : (
          <ChevronRightIcon label="" size="medium" />
        )}
      </button>
    )
  }

  return <Dot>&bull;</Dot>
}

const Dot = styled.span`
  display: flex;
  width: 24px;
  height: 32px;
  margin: 0 5px;
  justify-content: center;
  font-size: 12px;
  line-height: 32px;
`
