import { Input as ChakraInput, FormControl, FormLabel, InputProps as ChakraInputProps, FormErrorMessage } from "@chakra-ui/react"
import { ChangeEvent, EventHandler, forwardRef, ForwardRefRenderFunction, KeyboardEvent, KeyboardEventHandler } from "react"
import { FieldError } from "react-hook-form"

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  placeholder?: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({name, label, error = null, placeholder, ...rest}, ref) => {

  const FormatCPF = (e: KeyboardEvent<HTMLInputElement>) => {
    let val = e.currentTarget.value;
    val = val.replace(/\D/g,"").replace(/^[0]+/g,"")
    val = val.replace(/(\d)(\d{8})$/, "$1.$2")
    val = val.replace(/(\d)(\d{5})$/, "$1.$2")
    val = val.replace(/(\d)(\d{2})$/, "$1-$2")
    e.currentTarget.value = val
  }

  const handleFormatName = (e?: ChangeEvent<HTMLInputElement>) => {
    alert('a')
    return
  }


  if(label?.toLowerCase().includes('nome')) {

    return (
      <FormControl isInvalid={!!error}>
        { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
        <ChakraInput
          name={name}
          onChange={(e)=>handleFormatName(e)}
          id={name}
          placeholder={placeholder}
          _placeholder={{opacity:"0.4"}}
          bg="gray.900"
          variant="filled"
          _hover={{bgColor: "gray.600"}}
          ref={ref}
          {...rest}
        />
        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    )
  }

  if(label?.toLowerCase().includes('cpf')){

    return (
      <FormControl isInvalid={!!error}>
        { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
        <ChakraInput
          name={name}
          onKeyUp={(e) => label?.toLowerCase().includes('cpf') && FormatCPF(e)}
          id={name}
          placeholder={placeholder}
          _placeholder={{opacity:"0.4"}}
          bg="gray.900"
          variant="filled"
          maxLength={14}
          _hover={{bgColor: "gray.600"}}
          ref={ref}
          {...rest}
        />
        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    )
  }else{
    return (
      <FormControl isInvalid={!!error}>
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
        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    )
  }
}

export const Input = forwardRef(InputBase)