'use client';
import { insertNewComment } from "@/actions/supabase.action";
import { getCommentsID } from "@/services/supabase.service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useActionState } from "react"

export const FormAction = ({id}: {id:string | number}) => {

     const action = (id)? 'edit': 'add'; 
     const [state, formAction, pending] = useActionState(insertNewComment, {success:false, action: action});

     // Always call useQuery, but only use the data if action is 'edit'
     const { data } = useQuery({ 
        queryKey: ['commentData', id], 
        queryFn: () => getCommentsID({id}),
        enabled: action === 'edit'
     });

     const comment = data && data.length > 0 ? data[0] : undefined;
     console.log('FormAction state:', state);

  return (
    <div className='bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4 text-center'>
            Form Action Component
        </h2>
        <form className=' space-y-6 ' action={formAction}>
            <div className='grid grid-cols-1 gap-4'>
               <div>
                <input type="hidden" name="id" value={id} />
                    <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-2'>
                        Name
                    </label>
                    <input
                        type="text"
                        id='name'
                        name="name"
                        className='w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400'
                        placeholder="Enter your name"
                        defaultValue={comment?.name? comment.name : ''}
                    />
                    {
                        state.fieldErrors?.name && state.fieldErrors?.name.length > 0 && (
                            <ul className='mt-2 text-sm text-red-600'>
                                {state.fieldErrors.name.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        )

                    }
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
                            defaultValue={comment?.lastname? comment.lastname : ''}
                        />
                        {
                            state.fieldErrors?.lastname && state.fieldErrors?.lastname.length > 0 && (
                                <ul className='mt-2 text-sm text-red-600'>
                                    {state.fieldErrors.lastname.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            )
                        }
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
                        defaultValue={comment?.email? comment.email : ''}
                    />
                    {
                        state.fieldErrors?.email && state.fieldErrors?.email.length > 0 && (
                            <ul className='mt-2 text-sm text-red-600'>
                                {state.fieldErrors.email.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        )
                    }
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
                        defaultValue={comment?.comment? comment.comment : ''}
                    />
                    {
                        state.fieldErrors?.comment && state.fieldErrors?.comment.length > 0 && (
                            <ul className='mt-2 text-sm text-red-600'>
                                {state.fieldErrors.comment.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        )
                    }
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
                        defaultValue={comment?.gift? comment.gift : ''}
                    />
                </div>
                <div className=' flex  justify-center items-center'>
                    <button type='submit' className='bg-blue-800 text-white rounded-lg py-1.5 px-6' disabled={pending}>
                        { 
                            pending? (
                                <span className='ml-2 animate-spin'>Loading...</span>
                            ) : (
                                "Submit"
                            )
                        }
                    </button>
                    <Link
                        className={`bg-red-700 text-white rounded-lg py-1.5 px-6 ml-1.5  ${action !== 'edit' ? ' hidden' : ''}`}
                        href='/comments'
                    >
                       Cancel
                    </Link>
                </div>
            </div>
        </form>
    </div>
  )
}
