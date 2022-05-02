import { Button, Flex, FormControl, FormLabel, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { Input } from '../components/Form/Input'
import { FieldValues, useForm } from 'react-hook-form'

const Home: NextPage = () => {
  const { handleSubmit, register, formState } = useForm()
  const handleSignIn = (values: FieldValues) => {
    console.log(values)
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
            <Input type={'text'} placeholder={'Usuário'} {...register('user')} />
          <Input type={'password'} placeholder={'Senha'} {...register('password')} />
            <Button type='submit' mt='6' colorScheme='blue' isLoading={formState.isSubmitting}>Entrar</Button>
          </Stack>
        </Flex>
    </Flex>
  )
}

export default Home
