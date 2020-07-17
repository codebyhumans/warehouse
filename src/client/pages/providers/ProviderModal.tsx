import React, { useEffect, useState } from 'react';
import { providersService } from '@client/services/providers-service';
import { useModals } from '@client/components/Modals';
import ModalDialog from '@atlaskit/modal-dialog';
import { IProvider } from '@common/database/types/provider';
import Button from '@atlaskit/button';
import Form, { FormFooter } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import { Field } from '@atlaskit/form';

interface IProviderModalProps {
  id?: number;
}

export const ProviderModal: React.FC<IProviderModalProps> = ({ id }) => {
  const { onClose } = useModals();

  const [provider, setProvider] = useState<IProvider>();

  const loadProvider = async (providerId: number) => {
    const provider = await providersService.getProviderById(providerId);

    if (provider) {
      setProvider(provider);
    }
  };

  useEffect(() => {
    id && loadProvider(id);
  }, [id]);

  const handleSubmit = async (data: IProvider) => {
    try {
      const newProvider = provider
        ? await providersService.updateProvider(provider.id, data)
        : await providersService.addProvider(data);

      if (newProvider) {
        onClose();
      }
    } finally {
      //
    }
  };

  return (
    <ModalDialog heading={provider ? provider.name : 'Добавить поставщика'} onClose={onClose}>
      <Form<IProvider> onSubmit={handleSubmit}>
        {({ formProps }) => (
          <form {...formProps}>
            <Field name="name" label="Название" isRequired={true} defaultValue={provider?.name || ''}>
              {({ fieldProps }) => <TextField {...fieldProps} />}
            </Field>
            <Field name="address" label="Адрес" defaultValue={provider?.address || ''}>
              {({ fieldProps }) => <TextField {...fieldProps} />}
            </Field>
            <Field name="phone" label="Телефон" defaultValue={provider?.phone || ''}>
              {({ fieldProps }) => <TextField {...fieldProps} />}
            </Field>
            <Field name="email" label="Почта" defaultValue={provider?.email || ''}>
              {({ fieldProps }) => <TextField {...fieldProps} />}
            </Field>
            <Field name="bankName" label="Банк" defaultValue={provider?.bankName || ''}>
              {({ fieldProps }) => <TextField {...fieldProps} />}
            </Field>
            <Field name="bankAddress" label="Адрес банка" defaultValue={provider?.bankAddress || ''}>
              {({ fieldProps }) => <TextField {...fieldProps} />}
            </Field>
            <Field name="bankMfo" label="МФО Банка" defaultValue={provider?.bankMfo || ''}>
              {({ fieldProps }) => <TextField {...fieldProps} />}
            </Field>
            <Field name="bankExpense" label="Банковские расходы" defaultValue={provider?.bankExpense || ''}>
              {({ fieldProps }) => <TextField {...fieldProps} />}
            </Field>
            <FormFooter>
              <Button type="submit" appearance="primary">
                {provider ? 'Обновить' : 'Добавить'}
              </Button>
            </FormFooter>
          </form>
        )}
      </Form>
    </ModalDialog>
  );
};
