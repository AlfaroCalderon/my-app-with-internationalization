'use client'
import { FormAction } from '@/app/components/FormAction/FormAction'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react'

const page = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider  client={queryClient}>
    <FormAction />
    </QueryClientProvider>
  )
}

export default page