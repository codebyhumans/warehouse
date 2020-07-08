import React from 'react';

import { Checkbox } from '@atlaskit/checkbox';
import { CheckboxField } from '@atlaskit/form';

export const RememberMeField = () => (
  <CheckboxField name="remember" label="Запомнить меня">
    {({ fieldProps }) => <Checkbox {...fieldProps} label="Автоматически входить на этом ПК" />}
  </CheckboxField>
);
