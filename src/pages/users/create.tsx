import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react"
import Link from "next/link"
import { Input } from "../../components/Form/Input"
import { Select } from "../../components/Form/Select"
import { Header } from "../../components/Header"
import { Sidebar } from "../../components/Sidebar"
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChangeEvent } from "react"

interface CreateUserFormData {
  name: string
  email: string
  cpf: string
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Usuário obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  cpf: yup.string().required('CPF obrigatório').length(14).test('cpf', 'CPF inválido', (cpf) => {
    let CPF = Array.from(String(cpf?.replace(/[\-\.]/g, "")), Number)
    let soma1 = 0
    for (let i=0, val=10;i<9;i++,val--){
      soma1 += CPF[i] * val
    }
    let digit1 = ((soma1 % 11) < 2 ) ? 0 : (11 - (soma1 % 11))
    if(digit1 !== CPF[9]){
      return false
    }
    let soma2 = 0
    for (let i=0, val=11;i<9;i++,val--){
      soma2 += CPF[i] * val
    }
    let digit2 = 11 - ((soma2 + (digit1 * 2)) % 11)

    if(digit2 !== CPF[10]){
      return false
    }
    return true
  })
})

const CreateUser = () => {
  const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema)
  })
  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log("valores submit", values)
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box as='form' flex="1" borderRadius={8} bg="gray.800" p={["6","8"]} onSubmit={handleSubmit(handleCreateUser)}>
          <Heading size="lg" fontWeight="normal">Criar Usuário</Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input placeholder="Digite o nome completo" label="nome" error={errors.name} {...register('name')} />
              <Input type="text" label="CPF" error={errors.cpf} {...register('cpf')} />
              <Input type="email" label="email" error={errors.email} {...register('email')} />
            </SimpleGrid>

          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button colorScheme="pink" type='submit' isLoading={isSubmitting} >Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default CreateUser