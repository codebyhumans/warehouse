import React from 'react'
import { RenderItemParams } from '@atlaskit/tree'
import { TreeIcon } from './TreeIcon'
import { ICategory } from '@common/database/types/category'

interface IRenderItemProps extends RenderItemParams {
  selectedItem?: number
  setSelectedItem: (itemId?: number) => void
}

export const TreeItem: React.FC<IRenderItemProps> = ({
  item,
  selectedItem,
  setSelectedItem,
  onExpand,
  onCollapse,
  provided,
}) => {
  const data: ICategory = item.data

  const handleContextClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setSelectedItem(data.id)
  }

  return (
    <div
      id={item.id}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => setSelectedItem(data.id)}
      onFocus={() => setSelectedItem(data.id)}
      onContextMenu={handleContextClick}
      aria-selected={selectedItem === data.id}
      className="tree-item">
      <TreeIcon item={item} onExpand={onExpand} onCollapse={onCollapse} />
      <span>{data ? data.name : 'No data'}</span>
    </div>
  )
}
