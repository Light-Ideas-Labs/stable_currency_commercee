import { http, createConfig } from '@wagmi/core'
import { celo } from '@wagmi/core/chains'
import { injected } from '@wagmi/connectors'

export const config = createConfig({
  chains: [celo],
  connectors: [injected()],
  transports: {
    [celo.id]: http(),
  },
  ssr: true, 
})
