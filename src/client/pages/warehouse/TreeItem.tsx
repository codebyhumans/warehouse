import React, { useEffect } from 'react';
import { RenderItemParams, ItemId } from '@atlaskit/tree';
import { TreeIcon } from './TreeIcon';
import styled from 'styled-components';
import { ICategory } from '@common/database/types/category';

interface IRenderItemProps extends RenderItemParams {
  selectedItem?: number;
  setSelectedItem: (itemId: number) => void;
}

export const TreeItem = ({ item, selectedItem, setSelectedItem, onExpand, onCollapse, provided }: IRenderItemProps) => {
  const data: ICategory = item.data;

  return (
    <Item
      id={`treeitem-${item.id}`}
      onClick={() => setSelectedItem(data.id)}
      onFocus={() => setSelectedItem(data.id)}
      ref={provided.innerRef}
      aria-selected={selectedItem === data.id}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <TreeIcon item={item} onExpand={onExpand} onCollapse={onCollapse} />
      <span>{data ? data.name : 'No data'}</span>
    </Item>
  );
};

const Item = styled.div`
  display: flex;
  align-items: center;

  &[aria-selected='true'] {
    background-color: hsl(204, 80%, 50%);
  }
`;
