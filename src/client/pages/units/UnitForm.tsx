import React from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import Form, { Field, FormFooter } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import { unitsService } from '@client/services/units-service';
import { ModalFooter } from '@atlaskit/modal-dialog';
import { IUnit } from '@db/types/unit';

interface IProps {
  unit?: IUnit;
  loading: boolean;
  onCancel: () => void;
  onSuccess?: () => void;
}

interface IFormProps {
  name: string;
  measure: string;
}

export const UnitForm: React.FC<IProps> = ({ loading, unit, onCancel }) => {
  const onSubmit = async (data: IFormProps) => {
    if (!unit) {
      await unitsService.createUnit(data.name, data.measure);
    } else await unitsService.updateUnit(unit.id, data);
  };

  return (
    <Form onSubmit={onSubmit}>
      {({ formProps }) => (
        <form {...formProps}>
          <Field name="name" defaultValue={unit && unit.name} label="Название" isRequired>
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>
          <Field name="measure" defaultValue={unit && unit.measure} label="Сокращенное название" isRequired>
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>
          <ModalFooter>
            <ButtonGroup>
              <Button appearance="subtle" onClick={onCancel}>
                Отменить
              </Button>
              <Button type="submit" appearance="primary" isLoading={loading}>
                Сохранить
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      )}
    </Form>
  );
};
