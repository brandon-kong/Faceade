import { selectAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

import { Select } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys)

const brandPrimary = definePartsStyle({
 field: {
    background: "purple.100",
    border: "1px dashed",
    borderColor: "purple.200",
    borderRadius: "full"
  },
  icon: {
    color: "purple.400"
  }
})

export const selectTheme = defineMultiStyleConfig({
  variants: { brandPrimary },
})