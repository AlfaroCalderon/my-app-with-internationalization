'use client';
import { insertNewComment } from "@/actions/supabase.action";
import { useActionState } from "react"

export const FormAction = () => {

     const [state, formAction, pending] = useActionState(insertNewComment, {success:false});
     console.log('FormAction state:', state);

  return (
    <div className='bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4 text-center'>
            Form Action Component
        </h2>
        <form className=' space-y-6 ' action={formAction}>
            <div className='grid grid-cols-1 gap-4'>
               <div>
                    <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-2'>
                        Name
                    </label>
                    <input
                        type="text"
                        id='name'
                        name="name"
                        className='w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400'
                        placeholder="Enter your name"
                    />
                </div>
                <div>
                        <label htmlFor="lastname" className='block text-sm font-medium text-gray-700 mb-2'>
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                            placeholder="Enter your last name"
                        />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Comment
                    </label>
                    <textarea
                        id="comment"
                        name="comment"
                        rows={4}
                        className="w-full px-3 py-2 text-black border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                        placeholder="Enter your comment"
                    />
                </div>
                <div>
                    <label htmlFor="gift" className="block text-sm font-medium text-gray-700 mb-2">
                        Gift Amount
                    </label>
                    <input
                        type="number"
                        id="gift"
                        name="gift"
                        min={0}
                        step="0.01"
                        className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                        placeholder="Enter gift amount"
                    />
                </div>
                <div className=' flex  justify-center items-center'>
                    <button type='submit' className='bg-blue-800 text-white rounded-lg py-1.5 px-6'>
                        Submit
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}
