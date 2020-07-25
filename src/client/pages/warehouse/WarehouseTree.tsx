import React, { useState, useEffect } from 'react'
import { categoriesService } from '@client/services/categories-service'
import { TreeView } from './TreeView'
import { TreeData, ItemId } from '@atlaskit/tree'
import { createTreeData } from '@client/libs/utils/tree-builder'
import { localConfig } from '@common/local-config'
import './Tree.scss'

export const WarehouseTree: React.FC = () => {
  const [tree, setTreeData] = useState<TreeData>()
  const [expandedNodes, setExpandedNodes] = useState<ItemId[]>(localConfig.get('expandedNodes', []))

  console.log(expandedNodes)

  const loadCategories = async () => {
    try {
      const result = await categoriesService.getAllCategories()
      const treeData = createTreeData(result, expandedNodes)
      setTreeData(treeData)
    } finally {
    }
  }

  useEffect(() => {
    loadCategories()
    return () => {
      localConfig.set(
        'expandedNodes',
        expandedNodes.filter((v, i, a) => a.indexOf(v) === i),
      )
    }
  }, [])

  if (!tree) {
    return <div>is loading</div>
  }

  return (
    <TreeView
      tree={tree}
      setTreeData={setTreeData}
      expandedNodes={expandedNodes}
      setExpandedNodes={setExpandedNodes}
      reset={loadCategories}
    />
  )
}
