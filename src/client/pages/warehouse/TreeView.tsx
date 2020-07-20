import React, { useState } from 'react';
import {
  SideNavigation,
  NavigationHeader,
  NavigationContent,
  Header,
  NavigationFooter,
  ButtonItem,
} from '@atlaskit/side-navigation';
import Tree, { mutateTree, TreeData, ItemId } from '@atlaskit/tree';
import styled from 'styled-components';
import { TreeItem } from './TreeItem';
import { useModals } from '@client/components/Modals';
import { CategoryModal } from './CategoryModal';

interface ITreeViewProps {
  tree: TreeData;
  setTreeData: (tree: TreeData) => void;
}

export const TreeView: React.FC<ITreeViewProps> = ({ tree, setTreeData }) => {
  const { setModal } = useModals();

  const [selectedItem, setSelectedItem] = useState<number>();

  const onExpand = (itemId: ItemId) => {
    setTreeData(mutateTree(tree, itemId, { isExpanded: true }));
  };

  const onCollapse = (itemId: ItemId) => {
    setTreeData(mutateTree(tree, itemId, { isExpanded: false }));
  };

  return (
    <TreeContainer>
      <SideNavigation label="project">
        <NavigationHeader>
          <Header>Склад</Header>
        </NavigationHeader>
        <NavigationContent showTopScrollIndicator>
          <Tree
            tree={tree}
            renderItem={(props) => (
              <TreeItem selectedItem={selectedItem} setSelectedItem={setSelectedItem} {...props} />
            )}
            onExpand={onExpand}
            onCollapse={onCollapse}
            isDragEnabled
            isNestingEnabled
          />
        </NavigationContent>
        <NavigationFooter>
          <ButtonGroup>
            <Button>-</Button>
            <Button onClick={() => setModal(() => <CategoryModal parrentId={selectedItem} />)}>+</Button>
          </ButtonGroup>
        </NavigationFooter>
      </SideNavigation>
      <Content>erg</Content>
    </TreeContainer>
  );
};

const TreeContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  min-width: 80%;
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const Button = styled(ButtonItem)`
  span {
    text-align: center;
  }
`;
