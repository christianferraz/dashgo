import { Select as ChakraSelect, FormControl, FormLabel, SelectProps as ChakraSelectProps, Box, Input} from "@chakra-ui/react"
import Script from "next/script"
import { useRef } from "react"

interface SelectProps extends ChakraSelectProps {
  name: string
  label?: string
  placeholder?: string
  options: string[]
}

export const Select = ({ name, options, label, placeholder, ...rest }: SelectProps) => {
  const ref = useRef(null)
  function Aciona(e: any) {
    console.log(e)
  }
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Input list={name} placeholder={placeholder} role="listbox" />


      <datalist
        id={name}
        role="listbox"
        style={{
          position: "absolute",
          background: "white",
          border: "1px solid blue",
          borderRadius: "0 0 5px 5px",
          borderTop: "none",
          width: "120px",
          maxHeight: "10rem",
          overflowY: "auto"
        }}

      >

        {options.map((opt, indice) => {
          console.log(opt)
          return <option value={opt} style={{background: "var(--chakra-colors-gray-900)"}}  key={indice} />
        })}

        </datalist>
    </FormControl>
  )
}

