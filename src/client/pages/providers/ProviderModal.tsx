import React, { useEffect, useState, useMemo } from 'react';
import { providersService } from '@client/services/providers-service';
import { useModals } from '@client/components/Modals';
import ModalDialog from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import { IProvider } from '@db/types/provider';

export type ProviderActions = 'info' | 'delete' | 'update';

interface IProviderModalProps {
  id: number;
  action: ProviderActions;
}

export const ProviderModal: React.FC<IProviderModalProps> = ({ id, action }) => {
  const { onClose } = useModals();

  const [provider, setProvider] = useState<IProvider>();

  const loadProvider = async () => {
    const provider = await providersService.getProviderById(id);

    if (provider) {
      setProvider(provider);
    }
  };

  useEffect(() => {
    loadProvider();
  }, [id]);

  const modal = useMemo(() => {
    switch (action) {
      case 'info':
        return <div>info</div>;
      case 'delete':
        return <div>delete</div>;
      case 'update':
        return <div>update</div>;
      default:
        return null;
    }
  }, [id, action]);

  return provider ? (
    <ModalDialog heading={provider.name} onClose={onClose}>
      {modal}
    </ModalDialog>
  ) : (
    <Spinner size="large" />
  );
};
