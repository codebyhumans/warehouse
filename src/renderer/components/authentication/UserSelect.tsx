import React from 'react';
import Select from '@atlaskit/select';
import { User } from '@prisma/client';

interface IUserSelectProps {
  users: User[];
  onSelectUser: (userId: number) => void;
}

export const UserSelect: React.FC<IUserSelectProps> = (props) => {
  const { users, onSelectUser } = props;

  const options = users.map((u) => ({
    label: u.name,
    value: u.id,
  }));

  return (
    <Select
      className="single-select"
      classNamePrefix="react-select"
      options={options}
      onChange={(value: any) => onSelectUser(value.value)}
      placeholder="Select user"
    />
  );
};
