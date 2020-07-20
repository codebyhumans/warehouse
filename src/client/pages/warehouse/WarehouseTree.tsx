import React, { useState, useEffect } from 'react';
import { categoriesService } from '@client/services/categories-service';
import { TreeView } from './TreeView';
import { TreeData } from '@atlaskit/tree';
import { createTreeData } from '@client/libs/utils/tree-builder';

export const WarehouseTree: React.FC = () => {
  const [tree, setTreeData] = useState<TreeData>();

  const loadCategories = async () => {
    try {
      const result = await categoriesService.getAllCategories();
      const treeData = createTreeData(result);
      setTreeData(treeData);
    } finally {
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  if (!tree) {
    return <div>is loading</div>;
  }

  return <TreeView tree={tree} setTreeData={setTreeData} />;
};
