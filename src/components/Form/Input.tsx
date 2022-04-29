import { Input as ChakraInput, FormControl, FormLabel, InputProps as ChakraInputProps } from "@chakra-ui/react"

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  placeholder?: string
}

export const Input = ({name, label, placeholder, ...rest} : InputProps) => {
  return (
    <FormControl>
      { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
        <ChakraInput
          name={name}
          id={name}
          placeholder={placeholder}
          _placeholder={{opacity:"0.4"}}
          bg="gray.900"
          variant="filled"
          _hover={{bgColor: "gray.600"}}
          {...rest}
        />
    </FormControl>
  )
}