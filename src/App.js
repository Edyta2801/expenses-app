import { Container, SimpleGrid, Box, Text } from "@chakra-ui/react";

const income = 15000;

function App() {
  const renderMonth = new Date().toLocaleDateString("pl-PL", { month: "long" });
  return (
    <Container maxW="xl" centerContent marginTop="20">
      <SimpleGrid columns={2} spacing={10}>
        <Box bg="tomato" h="50px" borderRadius={30} px={6} py={2}>
          <Text align="center" fontSize="xl" color="white">
            {income}
          </Text>
        </Box>
        <Box bg="orange" h="50px" borderRadius={30} px={6} py={2}>
          <Text align="center" fontSize="xl" color="white">
            {renderMonth}
          </Text>
        </Box>
      </SimpleGrid>
    </Container>
  );
}

export default App;
