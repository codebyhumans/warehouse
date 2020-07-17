import React, { useEffect, useState, useMemo } from 'react';
import { useModals } from '@client/components/Modals';
import ModalDialog from '@atlaskit/modal-dialog';

import { UnitForm } from './UnitForm';
import { unitsService } from '@client/services/units-service';
import { IUnit } from '@common/database/types/unit';

interface IProps {
  onSuccess?: () => void;
  id?: number;
}

export const UnitManageModal: React.FC<IProps> = ({ id }) => {
  const { onClose } = useModals();

  const [unit, setUnit] = useState<IUnit>();
  const [loading, setLoading] = useState<boolean>(false);

  const loadProvider = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const unit = await unitsService.getUnitById(id);
      if (unit) setUnit(unit);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProvider();
  }, [id]);

  return (
    <ModalDialog heading={`${id ? 'Редактирование' : 'Создание'} ед.измерения`} onClose={onClose}>
      <UnitForm unit={unit} loading={loading} onCancel={onClose} />
    </ModalDialog>
  );
};
