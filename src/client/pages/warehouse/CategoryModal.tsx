import React from 'react';
import { useModals } from '@client/components/Modals';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import Form, { FormFooter } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import { Field } from '@atlaskit/form';
import { ICategory } from '@common/database/types/category';
import { categoriesService } from '@client/services/categories-service';

interface ICategoryModalProps {
  parrentId?: number;
}

export const CategoryModal: React.FC<ICategoryModalProps> = ({ parrentId }) => {
  const { onClose } = useModals();

  const handleSubmit = async (data: ICategory) => {
    try {
      if (parrentId) {
        data.parrentId = parrentId;
      }
      const result = await categoriesService.createCategory(data);
      if (!!result.length) {
        onClose();
      }
    } finally {
      //
    }
  };

  return (
    <ModalDialog heading="Добавить категорию" onClose={onClose}>
      <Form<ICategory> onSubmit={handleSubmit}>
        {({ formProps }) => (
          <form {...formProps}>
            <Field name="name" label="Название" isRequired={true}>
              {({ fieldProps }) => <TextField {...fieldProps} />}
            </Field>
            <FormFooter>
              <Button type="submit" appearance="primary">
                Добавить
              </Button>
            </FormFooter>
          </form>
        )}
      </Form>
    </ModalDialog>
  );
};
