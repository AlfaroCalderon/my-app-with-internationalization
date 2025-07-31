'use client'
import { FormAction } from "@/app/components/FormAction/FormAction";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const page = async ({params}: {params: Promise<{id:string| number}>}) => {

    const {id} = await params;
    const queryClient = new QueryClient();

  return (
   <QueryClientProvider  client={queryClient}>
    <FormAction id={id} />
    </QueryClientProvider>
  )
}

export default page;