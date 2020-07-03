import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import Button from '@atlaskit/button';
import Form, { FormFooter } from '@atlaskit/form';

import { useStores } from '../../stores/appStore';

import { UserSelectField, IUserSelectOption } from './UserSelectField';
import { PasswordField } from './PasswordField';
import { RememberMeField } from './RememberMeField';

interface IFormProps {
  user: IUserSelectOption;
  password: string;
  remember: boolean;
}

export const SignInForm: React.FC = observer(() => {
  const {
    authenticationStore: { signIn },
    usersStore: { users },
  } = useStores();

  return (
    <SignInFormContainer>
      <Form<IFormProps>
        onSubmit={({ user, password, remember }) => {
          console.log(user.value, password, remember);
          signIn(user.value, password, remember);
        }}
      >
        {({ formProps, submitting }) => (
          <form {...formProps}>
            <UserSelectField users={users} />
            <PasswordField />
            <RememberMeField />
            <FormFooter>
              <Button type="submit" appearance="primary" isLoading={submitting}>
                Войти
              </Button>
            </FormFooter>
          </form>
        )}
      </Form>
    </SignInFormContainer>
  );
});

const SignInFormContainer = styled.div`
  display: flex;
  width: 400px;
  max-width: 100%;
  margin: 0 auto;
  flex-direction: column;
`;
