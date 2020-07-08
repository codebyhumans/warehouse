import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import Button from '@atlaskit/button';
import Form, { FormFooter, OnSubmitHandler } from '@atlaskit/form';

import { useStores } from '../../stores';

import { UserSelectField, IUserSelectOption } from './UserSelectField';
import { PasswordField } from './PasswordField';
import { RememberMeField } from './RememberMeField';
import { useHistory } from 'react-router';

interface IFormProps {
  user: IUserSelectOption;
  password: string;
  remember: boolean;
}

export const SignInForm: React.FC = observer((props) => {
  const {
    userStore: { signIn },
    usersStore: { users },
  } = useStores();

  const history = useHistory();

  const handleSubmit: OnSubmitHandler<IFormProps> = ({ user, password, remember }) => {
    const result = signIn(user.value, password, remember);

    console.log(result);

    if (!result) {
      return;
    }

    history.push('/users');
  };

  return (
    <SignInFormContainer>
      <Form<IFormProps> onSubmit={handleSubmit}>
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
