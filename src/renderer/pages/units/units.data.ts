import { Unit } from '@prisma/client';
import { HeadType, RowType } from '@atlaskit/dynamic-table/dist/cjs/types';

enum UnitKeys {
  Name = 'name',
  Measure = 'measure',
}

const RowNames = {
  [UnitKeys.Name]: 'Название',
  [UnitKeys.Measure]: 'Еденица измерения',
};

export const createTableHeader = (withWidth?: boolean): HeadType => ({
  cells: [
    {
      key: UnitKeys.Name,
      content: RowNames[UnitKeys.Name],
      isSortable: true,
    },
    {
      key: UnitKeys.Measure,
      content: RowNames[UnitKeys.Measure],
      isSortable: true,
    },
  ],
});

export const createTableRows = (units: Unit[]): RowType[] =>
  units.map((p) => ({
    key: `${p.id}`,
    cells: [
      {
        key: UnitKeys.Name,
        content: p.name,
      },
      {
        key: UnitKeys.Measure,
        content: p.measure,
      },
    ],
  }));
