import React from 'react';
import { User } from '@prisma/client';
import Select from '@atlaskit/select';
import { Field, HelperMessage } from '@atlaskit/form';

interface IUserSelectOption {
  label: string;
  value: number;
}

interface IUserSelectFieldProps {
  users: User[];
}

export const UserSelectField: React.FC<IUserSelectFieldProps> = ({ users }) => {
  const options: IUserSelectOption[] = users.map((u) => ({
    label: u.name,
    value: u.id,
  }));

  return (
    <Field<IUserSelectOption> label="Пользователь" name="user">
      {({ fieldProps, error }) => (
        <>
          <Select
            {...fieldProps}
            options={options}
            onChange={(a: any, b) => a.value}
            placeholder="Выберете пользователя"
          />
          {error === 'EMPTY' && <HelperMessage>Пожалуйста, выберете пользователя для логина</HelperMessage>}
        </>
      )}
    </Field>
  );
};
