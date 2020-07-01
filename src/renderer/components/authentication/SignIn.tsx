import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import Button, { ButtonGroup } from '@atlaskit/button';
import Form, { Field, FormFooter } from '@atlaskit/form';

import { useStores } from '../../stores/appStore';
import { UserSelect } from './UserSelect';
import { PasswordInput } from './PasswordInput';

export const SignIn: React.FC = observer(() => {
  const {
    usersStore: { users },
    authenticationStore: { signIn },
  } = useStores();

  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [password, setPassword] = useState<string>('');

  return (
    <SignInFormContainer>
      <Form onSubmit={() => signIn(selectedUserId, password)}>
        {() => (
          <form>
            <Field name="user" label="User" isRequired={true}>
              {() => <UserSelect users={users} onSelectUser={setSelectedUserId} />}
            </Field>
            <Field name="password" label="Password" isRequired={true}>
              {() => <PasswordInput disabled={selectedUserId <= 0} handlePasswordChange={setPassword} />}
            </Field>
            <FormFooter>
              <ButtonGroup>
                <Button type="submit" appearance="primary" isDisabled={selectedUserId <= 0 || !password}>
                  Sign in
                </Button>
              </ButtonGroup>
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
