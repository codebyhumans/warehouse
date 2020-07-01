import React from 'react';

import Textfield from '@atlaskit/textfield';

interface IPasswordInputProps {
  disabled: boolean;
  handlePasswordChange: (value: string) => void;
}

export const PasswordInput: React.FC<IPasswordInputProps> = (props) => {
  const { disabled, handlePasswordChange } = props;

  return <Textfield isRequired={true} isDisabled={disabled} onChange={(e) => handlePasswordChange(e.currentTarget.value)} />;
};
