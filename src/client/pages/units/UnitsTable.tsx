import React, { useMemo } from 'react';
import { unitsService } from '@client/services/units-service';
import { Table, useTableProcessor } from '@client/components/Table';
import { useModals } from '@client/components/Modals';
import { UnitManageModal } from './UnitManageModal';
import { IUnit } from '@common/database/types/unit';

export const UnitsTable: React.FC = () => {
  const modals = useModals();

  const openUnitManageModal = (id: number) => modals.setModal(() => <UnitManageModal id={id} />);

  const { settings } = useTableProcessor<IUnit>(unitsService.getAllUnits, {
    name: 'units',
    columns: [
      {
        Header: 'Название',
        accessor: 'name',
      },
      {
        Header: 'Мера',
        accessor: 'measure',
        Cell: ({ cell }) => <i>{cell.value}</i>,
      },
      {
        Header: '',
        accessor: 'id',
        Cell: ({ cell }) => <div onClick={() => openUnitManageModal(cell.value)}>{cell.value}</div>,
        Footer: ({ rows }) => {
          const total = useMemo(() => rows.reduce((sum, row) => row.values.id + sum, 0), [rows]);
          return <>Total: {total}</>;
        },
      },
    ],
  });

  return <Table {...settings} />;
};
