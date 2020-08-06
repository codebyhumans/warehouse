import React, { useState, useEffect, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import Form, { FormFooter, OnSubmitHandler } from '@atlaskit/form'
import { Field, HelperMessage } from '@atlaskit/form'
import Select, { ValueType } from '@atlaskit/select'
import ErrorIcon from '@atlaskit/icon/glyph/error'
import { CheckboxField } from '@atlaskit/form'
import { Checkbox } from '@atlaskit/checkbox'
import TextField from '@atlaskit/textfield'
import { colors } from '@atlaskit/theme'
import Button from '@atlaskit/button'

import { usersService } from '@client/services/users-service'
import { useStores } from '@client/stores'
import { useHistory } from 'react-router'
import { localConfig } from '@common/local-config'
import { useNotifications } from '@client/components/Notifications'

interface IFormProps {
  user: IUserOption
  password: string
  remember: boolean
}

export interface IUserOption {
  label: string
  value: number
}

export const LoginPage: React.FC = observer(() => {
  const [usersOptions, setUsersOptions] = useState<IUserOption[]>([])
  const { notify } = useNotifications()
  const { userStore } = useStores()
  const history = useHistory()

  const defaultUser = useMemo(() => localConfig.get('pages.login.lastUser'), [])

  const loadUsers = async () => {
    const users = await usersService.getAllUsers()

    setUsersOptions(
      users.map((u) => ({
        label: u.name,
        value: u.id,
      })),
    )
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleSubmit: OnSubmitHandler<IFormProps> = async (form) => {
    const success = await userStore.signIn(
      form.user.value,
      form.password,
      form.remember,
    )

    if (!success) {
      return notify({
        title: ' Неверный пароль. Повторите попытку',
        icon: (
          <ErrorIcon
            primaryColor={colors.R400}
            label="login-not-successfully"
          />
        ),
      })
    }

    if (success) {
      localConfig.set('pages.login.lastUser', form.user)
      history.push('/users')
    }
  }

  return (
    <SignInFormContainer>
      <Form<IFormProps> onSubmit={handleSubmit}>
        {({ formProps, submitting }) => (
          <form {...formProps}>
            <Field<ValueType<IUserOption>>
              label="Пользователь"
              defaultValue={defaultUser}
              name="user"
              isRequired>
              {({ fieldProps, error }) => (
                <>
                  <Select<IUserOption>
                    {...fieldProps}
                    options={usersOptions}
                    placeholder="Выберете пользователя"
                  />
                  {error === 'EMPTY' && (
                    <HelperMessage>
                      Пожалуйста, выберете пользователя для логина
                    </HelperMessage>
                  )}
                </>
              )}
            </Field>
            <Field
              name="password"
              label="Пароль"
              isRequired={true}
              validate={(value) =>
                value && value.length < 8 ? 'TOO_SHORT' : undefined
              }>
              {({ fieldProps, error, valid, meta }) => (
                <>
                  <TextField type="password" {...fieldProps} />
                  {!error && !valid && (
                    <HelperMessage>
                      Пароль должен быть более 8 символов.
                    </HelperMessage>
                  )}
                </>
              )}
            </Field>
            <CheckboxField name="remember">
              {({ fieldProps }) => (
                <Checkbox {...fieldProps} label="Запоминить пользователя" />
              )}
            </CheckboxField>
            <FormFooter>
              <Button type="submit" appearance="primary" isLoading={submitting}>
                Войти
              </Button>
            </FormFooter>
          </form>
        )}
      </Form>
    </SignInFormContainer>
  )
})

const SignInFormContainer = styled.div`
  display: flex;
  width: 400px;
  max-width: 100%;
  margin: 0 auto;
  flex-direction: column;
`
