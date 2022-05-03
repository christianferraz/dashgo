import { Button, Flex, FormControl, FormLabel, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { FieldValues, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../components/Form/Input'

const signInFormSchema = yup.object().shape({
  user: yup.string().required('Usuário obrigatório'),
  password: yup.string().required('Senha obrigatória').min(6, 'deve ter no mínimo 6 caracteres')
})

const SignIn: NextPage = () => {
  const { handleSubmit, register, formState: {errors, isSubmitting}} = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const handleSignIn = async (values: FieldValues) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
  return (
    <Flex
      w='100vw'
      h='100vh'
      align='center'
      justify='center'>
      <Flex
        as='form'
        width='100%'
        maxWidth={360}
        bg='gray.800'
        p={8}
        flexDir='column'
        borderRadius={'2xl'}
        onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing={4}>
            <Input error={errors.user} type={'text'} placeholder={'Usuário'} {...register(('user'))} />
            <Input error={errors.password} type={'password'} placeholder={'Senha'} {...register('password')} />
            <Button type='submit' mt='6' colorScheme='blue' isLoading={isSubmitting}>Entrar</Button>
          </Stack>
        </Flex>
    </Flex>
  )
}

export default SignIn
