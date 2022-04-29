import { Button, Flex, FormControl, FormLabel, Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { text } from 'stream/consumers'
import {Input}  from '../components/Form/Input'

const Home: NextPage = () => {
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
        >
          <Stack spacing={4}>
            <Input name='user' type={'text'} placeholder={'Usuário'} />
            <Input name='Senha' type={'password'} placeholder={'Senha'}  />
            <Button type='submit' mt='6' colorScheme='blue'>Entrar</Button>
          </Stack>
        </Flex>
    </Flex>
  )
}

export default Home
