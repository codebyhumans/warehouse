import React from 'react';
import { User } from '@prisma/client';

import Select, { ValueType } from '@atlaskit/select';
import { Field, HelperMessage } from '@atlaskit/form';

export interface IUserSelectOption {
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
    <Field<ValueType<IUserSelectOption>> label="Пользователь" name="user">
      {({ fieldProps: { id, ...rest }, error }) => (
        <>
          <Select<IUserSelectOption> inputId={id} {...rest} options={options} placeholder="Выберете пользователя" />
          {error === 'EMPTY' && <HelperMessage>Пожалуйста, выберете пользователя для логина</HelperMessage>}
        </>
      )}
    </Field>
  );
};
