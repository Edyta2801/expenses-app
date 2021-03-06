import {
  Container,
  SimpleGrid,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import { Formik, Form, ErrorMessage, Field } from "formik";

import * as Yup from "yup";

const income = 15000;

const CATEGORY_OPTIONS = [
  { key: "jedzenie", text: "jedzenie", value: "jedzenie" },
  { key: "inne", text: "inne", value: "inne" },
  { key: "firma", text: "firma", value: "firma" },
  { key: "mieszkanie", text: "mieszkanie", value: "mieszkanie" },
];

function App() {
  const renderMonth = new Date().toLocaleDateString("pl-PL", { month: "long" });

  return (
    <Container maxW="xl" centerContent marginTop="10">
      <SimpleGrid columns={1} spacing={5} minW="sm">
        <Box bg="tomato" h="45px" borderRadius={10} px={6} py={2}>
          <Text align="center" fontSize="xl" color="white">
            {income}
          </Text>
        </Box>
        <hr />
        <Box bg="orange" h="45px" borderRadius={10} px={6} py={2}>
          <Text align="center" fontSize="xl" color="white">
            {renderMonth}
          </Text>
        </Box>

        <Formik
          initialValues={{
            category: "jedzenie",
            expense: "",
            howMuch: 0,
            fixed: false,
          }}
          validationSchema={Yup.object().shape({
            category: Yup.mixed().oneOf(
              CATEGORY_OPTIONS.map((category) => category.value)
            ),
            expense: Yup.string().required("Wpisz wydatek"),
            howMuch: Yup.number().min(
              0.01,
              "Nic nie kosztuje 0 zł- wpisz kwotę"
            ),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            resetForm();
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <FormControl isRequired my="2">
                <FormLabel htmlFor="category">Kategoria</FormLabel>
                <Select
                  id="category"
                  placeholder="Kategoria"
                  option={CATEGORY_OPTIONS}
                  value={values.category.text}
                  onChange={(e, { value }) => setFieldValue("category", value)}
                  required
                  search
                  error={Boolean(errors.category && touched.category)}
                >
                  {CATEGORY_OPTIONS.map((category) => (
                    <option key={category.key} value={category.value}>
                      {category.text}
                    </option>
                  ))}
                </Select>
                <ErrorMessage
                  name="category"
                  render={(msg) => <div>{msg}</div>}
                />
              </FormControl>

              <FormControl isRequired my="2">
                <FormLabel htmlFor="expense">Wydatek</FormLabel>
                <Input
                  id="expense"
                  label="wydatek"
                  placeholder="wydatek"
                  value={values.expense}
                  onChange={handleChange}
                  required
                  error={Boolean(errors.expense && touched.expense)}
                ></Input>
                <ErrorMessage
                  name="expense"
                  render={(msg) => <div>{msg}</div>}
                />
              </FormControl>

              <FormControl isRequired my="2">
                <FormLabel htmlFor="howMuch">Kwota</FormLabel>
                <Input
                  id="howMuch"
                  label="kwota"
                  placeholder="kwota"
                  type="number"
                  step={0.01}
                  value={values.howMuch}
                  onChange={handleChange}
                  required
                  error={Boolean(errors.howMuch && touched.howMuch)}
                ></Input>
                <ErrorMessage
                  name="howMuch"
                  render={(msg) => <Text color="red">{msg}</Text>}
                />
              </FormControl>

              <label>
                <Field type="checkbox" name="fixed" />
                Wydatek powtarza się
              </label>

              <Button
                w="100%"
                type="submit"
                disabled={isSubmitting}
                mt={4}
                colorScheme="teal"
              >
                OK
              </Button>
            </Form>
          )}
        </Formik>
      </SimpleGrid>
    </Container>
  );
}

export default App;
