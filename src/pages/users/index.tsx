import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react"
import NextLink from "next/link"
import { useState } from "react"
import { RiAddLine, RiPencilLine } from "react-icons/ri"
import { Header } from "../../components/Header"
import { Pagination } from "../../components/Pagination"
import { Sidebar } from "../../components/Sidebar"
import { Users, useUsers } from "../../services/hooks/useUsers"

const UserList = () => {
  const [page, setPage] = useState(1)
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const { data, isLoading, isFetching, error } = useUsers(page)
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center" >
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" />}
            </Heading>
            <NextLink href={"/users/create"} passHref>
              <Button
                as="a"
                size="sm"
                fontSize="15"
                colorScheme={"pink"}
                leftIcon={<Icon as={RiAddLine} />}
              >
                  Cadastrar
                </Button>
              </NextLink>
          </Flex>
          {
          isLoading  ? (
            <Flex align={"center"}>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex align={"center"}>
              Falha
            </Flex>
          ) : (
            <>
            <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={["4", "4", "6"]} color="gray.300" width='8'>
                  <Checkbox colorScheme="green" />
                </Th>
                <Th>Usuário</Th>
                { isWideVersion && <Th>Data de cadastro</Th> }
                <Th width="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {
              data?.users.map((d: Users) =>
                (<Tr key={d.id}>
                  <Td px={["4", "4", "6"]} >
                    <Checkbox colorScheme="green" />
                  </Td>
                  <Td>
                    <Box>
                      <Link color="purple.400">
                        <Text fontWeight="bold">{d.name}</Text>
                      </Link>
                      <Text fontSize="sm" color="gray.300">{d.email}</Text>
                    </Box>
                  </Td>
                  { isWideVersion && <Td>04 de abril, 2021</Td> }
                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="15"
                      colorScheme={"pink"}
                      leftIcon={<Icon as={RiPencilLine} />}
                    >
                      Editar
                    </Button>
                  </Td>
                </Tr>)
              )}
            </Tbody>
          </Table>
        {data && <Pagination totalCountOfRegisters={data?.totalCount} currentPage={page} onPageChange={setPage} /> }
        </>
        )}
        </Box>
      </Flex>
    </Box>
  )
}

export default UserList