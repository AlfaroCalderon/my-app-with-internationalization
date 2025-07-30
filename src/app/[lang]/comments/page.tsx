'use client';
import { Comments } from "@/app/components/Comments/Comments";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const page = () => {
  
 const queryClient = new QueryClient();

return (
    <QueryClientProvider client= {queryClient} >
    <Comments />
    </QueryClientProvider>
  )
}

export default page;