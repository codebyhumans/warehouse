import React from 'react';
import styled from 'styled-components';
import { TreeItem, ItemId } from '@atlaskit/tree';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';

interface ITreeIconProps {
  item: TreeItem;
  onExpand: (itemId: ItemId) => void;
  onCollapse: (itemId: ItemId) => void;
}

export const TreeIcon: React.FC<ITreeIconProps> = ({ item, onExpand, onCollapse }) => {
  if (item.hasChildren) {
    return item.isExpanded ? (
      <ChevronDownIcon label="" size="medium" onClick={() => onCollapse(item.id)} />
    ) : (
      <ChevronRightIcon label="" size="medium" onClick={() => onExpand(item.id)} />
    );
  }

  return <Dot>&bull;</Dot>;
};

const Dot = styled.span`
  display: flex;
  width: 24px;
  height: 32px;
  justify-content: center;
  font-size: 12px;
  line-height: 32px;
`;
