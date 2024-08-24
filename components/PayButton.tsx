"use client";

import { useConnect, useAccount, useWriteContract } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { useState } from 'react';
import { celo } from 'viem/chains';
import { ethers } from 'ethers'

import erc20Abi from './ABI/ERC-20.json'


export const PayButton = ({ price }: { price: number }) => {
  const { connectAsync } = useConnect()
  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const [started, setStarted] = useState(false)
  const [errors, setErrors] = useState()
  const [completed, setCompleted] = useState(false)

  const handlePayment = async () => {
    try {
      setErrors('')
      setStarted(true)
      if(!address) {
        await connectAsync({ chainId: celo.id, connector: injected()})
      }

      const data = await writeContractAsync({
        chainId: celo.id,
        address: '0x456a3d042c0dbd3db53d5489e98dfb038553b0d0', // cKES Main Contract Address
        functionName: 'transfer',
        abi: erc20Abi,
        args: [
          '0x63a471Bd2464d0dbb16ab5600a4002E0A159A1f2', // recipient address
          ethers.parseEther(price.toString()), // converted amount
        ],
      })
  
      console.log('Transaction Data:', data)

      setCompleted(true)
      console.log(data)
    } catch(err) {
      console.log(err)
      setStarted(false)
      setErrors("Payment failed. Please try again.")
    }
  }

  return (
    <>
      {!completed && (
        <button 
          disabled={started}
          className="mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
          onClick={handlePayment}
        >
          {started ? "Confirming..." : "Pay Now"}
        </button>
      )}
      {completed && <p className='text-stone-800 mt-2 bg-green-200 rounded-md text-sm py-2 px-4'>Thank you for your payment.</p>}
      {errors && <p className='text-stone-800 mt-2 bg-red-200 rounded-md text-sm py-2 px-4'>{errors}</p>}
    </>
  )
}