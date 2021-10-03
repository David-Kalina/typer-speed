import { keyframes } from '@chakra-ui/react'

const bounce = keyframes`
   0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 
   40% {transform: translateY(-15px);} 
   60% {transform: translateY(-5px);} 
 `

export const bounceAnimation = `${bounce} 1s linear`
