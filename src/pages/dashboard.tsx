import dynamic from "next/dynamic";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react"
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar"
import { theme } from "../styles/theme"
import { ApexOptions } from "apexcharts"
import { useEffect } from "react"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"
import { setupAPIClient } from "../services/api"

const Chart = dynamic(() => import("react-apexcharts"), {ssr:false})

const options: ApexOptions = {
  chart: {
    toolbar: {
        show: false,
    },
    zoom: {
        enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
        color: theme.colors.gray[600]
    },
    axisTicks: {
        color: theme.colors.gray[600]
    },
    categories: [
        '2021-03-18T00:00:00.000Z',
        '2021-03-19T00:00:00.000Z',
        '2021-03-20T00:00:00.000Z',
        '2021-03-21T00:00:00.000Z',
        '2021-03-22T00:00:00.000Z',
        '2021-03-23T00:00:00.000Z',
        '2021-03-24T00:00:00.000Z',
    ]
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
        shade: 'dark',
        opacityFrom: 0.7,
        opacityTo: 0.3
    }
  }
}

const series = [
  {
    name: 'Series1',
    data: [31, 120, -10, 20, 51, 30]
  }
]

const Dashboard = () => {
  useEffect(() => {

    api.get('/me').then(response => { console.log('dashbord e esta ok', response) }).catch(err => console.log('erro no dashboard', err))
  },[])
  return (
    <Flex direction={"column"} h="100vh">
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <SimpleGrid flex="1" gap="4" minChildWidth="320px" >
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">Inscritos da semana</Text>
            <Chart options={options} series={series} type="area" height={160} />

          </Box>
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4">
            <Text fontSize="lg" mb="4">Taxa de abertura</Text>
            <Chart options={options} series={series} type="area" height={160}  width="80%" />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}

export default Dashboard

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')
  return {
    props: {}
  }
})