import React from 'react';
import TextField from '@atlaskit/textfield';
import { ErrorMessage, Field, HelperMessage, ValidMessage } from '@atlaskit/form';

export const PasswordField = () => (
  <Field
    name="password"
    label="Пароль"
    isRequired={true}
    validate={(value) => (value && value.length < 8 ? 'TOO_SHORT' : undefined)}
  >
    {({ fieldProps, error, valid, meta }) => (
      <>
        <TextField type="password" {...fieldProps} />
        {!error && !valid && (
          <HelperMessage>Use 8 or more characters with a mix of letters, numbers & symbols.</HelperMessage>
        )}
        {error && <ErrorMessage>Password needs to be more than 8 characters.</ErrorMessage>}
        {valid && meta.dirty ? <ValidMessage>Awesome password!</ValidMessage> : null}
      </>
    )}
  </Field>
);
