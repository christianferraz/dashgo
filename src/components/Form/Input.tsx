import { Input as ChakraInput, FormControl, FormLabel, InputProps as ChakraInputProps } from "@chakra-ui/react"
import { forwardRef, ForwardRefRenderFunction } from "react"

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  placeholder?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({name, label, placeholder, ...rest}, ref) => {
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
          ref={ref}
          {...rest}
        />
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)