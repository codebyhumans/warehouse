import { TreeItem, TreeData, ItemId } from '@atlaskit/tree'
import { ICategory } from '@common/database/types/category'

export const createTreeData = (data: ICategory[], expandedNodes: ItemId[]): TreeData => {
  const rootItem: TreeItem = {
    id: 'root',
    children: [],
    hasChildren: false,
    isExpanded: false,
  }

  const items: { [key: string]: TreeItem } = {}

  for (const item of data) {
    items[item.id + ''] = {
      id: item.id + '',
      children: [],
      hasChildren: false,
      isExpanded: expandedNodes.includes(item.id + ''),
      data: item,
    }
  }

  for (const item of Object.values(items)) {
    const parentItem = item.data?.parentId ? items[item.data.parentId] : rootItem

    parentItem.children.push(item.id)

    if (!parentItem.hasChildren) {
      parentItem.hasChildren = true
    }
  }

  return {
    rootId: 'root',
    items: {
      root: rootItem,
      ...items,
    },
  }
}
