'use client'
import { FormAction } from "@/app/components/FormAction/FormAction";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { use } from "react";

const Page = ({params}: {params: Promise<{id:string| number}>}) => {

    const {id} = use(params);
    const queryClient = new QueryClient();

  return (
     <QueryClientProvider client={queryClient}>
    <FormAction id={id} />
    </QueryClientProvider>
  )
}

export default Page;