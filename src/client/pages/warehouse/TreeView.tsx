import React, { useState } from 'react'
import {
  SideNavigation,
  NavigationHeader,
  NavigationContent,
  Header,
  NavigationFooter,
  ButtonItem,
} from '@atlaskit/side-navigation'
import Tree, { mutateTree, TreeData, ItemId } from '@atlaskit/tree'
import styled from 'styled-components'
import { TreeItem } from './TreeItem'
import Error from '@atlaskit/icon/glyph/error'
import { useModals } from '@client/components/Modals'
import { CategoryModal } from './CategoryModal'
import { useNotifications } from '@client/components/Notifications'
import { colors } from '@atlaskit/theme'
import { categoriesService } from '@client/services/categories-service'

interface ITreeViewProps {
  tree: TreeData
  expandedNodes: ItemId[]
  setExpandedNodes: (nodes: ItemId[]) => void
  setTreeData: (tree: TreeData) => void
  reset: () => void
}

export const TreeView: React.FC<ITreeViewProps> = ({
  tree,
  expandedNodes,
  setExpandedNodes,
  setTreeData,
  reset,
}) => {
  const { openModal, openDialog, closeModal } = useModals()
  const { notify } = useNotifications()

  const [selectedItem, setSelectedItem] = useState<number>()

  const onExpand = (itemId: ItemId) => {
    setExpandedNodes([...expandedNodes, itemId])
    setTreeData(mutateTree(tree, itemId, { isExpanded: true }))
  }

  const onCollapse = (itemId: ItemId) => {
    setExpandedNodes(expandedNodes.filter((n) => n != itemId))
    setTreeData(mutateTree(tree, itemId, { isExpanded: false }))
  }

  const handleRemoveCategory = () => {
    if (!selectedItem) {
      return
    }

    const treeItems = Object.values(tree.items)
    const treeItem = treeItems.find((i) => i.data?.id === selectedItem)

    if (!treeItem) {
      return
    }

    if (!!treeItem.children.length) {
      const subCategories: string[] = []

      for (const item of treeItems) {
        if (treeItem.children.includes(item.id)) {
          subCategories.push(item.data.name)
        }
      }

      notify({
        title: 'Ошибка',
        icon: <Error primaryColor={colors.R300} label="delete-category-error" />,
        description: `Невозможно удалить категорию ${
          treeItem.data.name
        } с подкатегориями ${subCategories.join(', ')}.`,
      })
    } else {
      openDialog({
        heading: `Удалить категорию ${treeItem.data.name}`,
        actions: [
          {
            text: 'Удалить',
            async onClick() {
              try {
                await categoriesService.deleteCategory(treeItem.data.id)
              } finally {
                reset()
                closeModal()
              }
            },
          },
        ],
      })
    }
  }

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
            offsetPerLevel={10}
            isDragEnabled
            isNestingEnabled
          />
        </NavigationContent>
        <NavigationFooter>
          <ButtonGroup>
            <Button onClick={handleRemoveCategory}>-</Button>
            <Button
              onClick={() =>
                openModal(() => <CategoryModal parentId={selectedItem} reset={reset} />)
              }>
              +
            </Button>
          </ButtonGroup>
        </NavigationFooter>
      </SideNavigation>
      <Content>erg</Content>
    </TreeContainer>
  )
}

const TreeContainer = styled.div`
  display: flex;
`

const Content = styled.div`
  min-width: 80%;
`

const ButtonGroup = styled.div`
  display: flex;
`

const Button = styled(ButtonItem)`
  span {
    text-align: center;
  }
`
