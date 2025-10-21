import {cookieStorage, createStorage} from "wagmi"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import {mainnet, base} from "@reown/appkit/networks"

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if(!projectId){
    throw new Error("Project ID is not defined.")
}
export const networks = [mainnet, base]

export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage
    }),
    ssr: true,
    networks,
    projectId
})

export const config = wagmiAdapter.wagmiConfig

// Backend API base URL
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"