import React, { useEffect, useState } from 'react';
import { providersService } from '@client/services/providers-service';
import { useModals } from '@client/components/Modals';
import ModalDialog from '@atlaskit/modal-dialog';
import { Provider } from '@prisma/client';

export const ProviderModal: React.FC<{ id: number }> = ({ id }) => {
  const [provider, setProvider] = useState<Provider>();
  const modal = useModals();

  const loadProvider = async () => {
    const provider = await providersService.getProviderById(id);
    if (provider) setProvider(provider);
  };

  useEffect(() => {
    loadProvider();
  }, []);

  return (
    <ModalDialog heading="Hi there 👋" onClose={modal.onClose}>
      <div>123 Form {JSON.stringify(provider)}</div>
    </ModalDialog>
  );
};
