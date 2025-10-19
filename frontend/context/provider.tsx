"use client"

import { wagmiAdapter, projectId } from "@/config"
import { createAppKit } from "@reown/appkit"
import { mainnet, base, baseSepolia } from '@reown/appkit/networks'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi"

/**
 * To show specific wallets (like MetaMask, Base Wallet, WalletConnect, etc.) initially in the modal,
 * use the `wallets` option in the createAppKit configuration. 
 * This list controls the order and visiblity of wallet options to display to users on first open.
 * 
 * For example, to prioritize MetaMask, Base, WalletConnect, and other specific wallets:
 * 
 * wallets: [
 *   'metamask',         // MetaMask browser extension
 *   'base',             // Base Wallet
 *   'walletConnect',    // WalletConnect option
 *   // ... any other wallet IDs supported by your integration
 * ]
 * 
 * Full list of wallet IDs available usually in your wallet kit's documentation. 
 */

if (!projectId) {
    throw new Error("Project ID is not defined.")
}
const metadata = {
    name: "keystone",
    description: "verifiy once, use everywhere",
    url: "https://keystone.xyz",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
}

export const modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [base, baseSepolia, mainnet],
    defaultNetwork: base,
    features: {
        analytics: true,
        email: false,
        socials: false,
        legalCheckbox: true,
        
    },
    themeMode: 'dark',
    featuredWalletIds: [
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',
        '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
        '163d2cf19babf05eb8962e9748f9ebe613ed52ebf9c8107c9a0f104bfcf161b3',
        "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369"
    ],
    metadata,
    termsConditionsUrl: "https://www.keystone.com/terms",
    privacyPolicyUrl: "https://www.keystone.com/privacy",
    coinbasePreference:'all'
})

function ContextProvider({ children, cookies = null }: { children: ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            {children}
        </WagmiProvider>
    )
}
export default ContextProvider