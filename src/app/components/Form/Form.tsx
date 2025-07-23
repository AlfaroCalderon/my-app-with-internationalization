'use client'
import {useForm} from 'react-hook-form'

type TextProps = {
    formTitle: string,
    name: string,
    namePlaceholder: string,
    lastName: string,
    lastNamePlaceholder: string
}

type Inputs = {
    name: string;
    apellido: string;
    email: string;
    comment: string;
    gift: number;
}

export const Form = (TextProps:TextProps) => {
 
const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>(); 
 
const onSubmit = (data:Inputs) => {
    console.log('Send form data:', data);
}

 return (
   <div className='bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4 text-center'>
            {TextProps.formTitle}
        </h2>
        <form action="" className=' space-y-6 ' onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-4'>
               <div>
                    <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-2'>
                        {TextProps.name}
                    </label>
                    <input
                        type="text"
                        id='name'
                        {...register("name", {required: "Please enter your name"})}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400'
                        placeholder={TextProps.namePlaceholder}
                    />
                </div>
                <div>
                        <label htmlFor="apellido" className='block text-sm font-medium text-gray-700 mb-2'>
                            {TextProps.lastName}
                        </label>
                        <input
                            type="text"
                            id="apellido"
                            {...register("apellido")}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                            placeholder={TextProps.lastNamePlaceholder}
                        />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Comment
                    </label>
                    <textarea
                        id="comment"
                        {...register("comment")}
                        rows={4}
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                        placeholder="Leave your comment here"
                    />
                </div>
                <div>
                    <label htmlFor="gift" className="block text-sm font-medium text-gray-700 mb-2">
                        Gift
                    </label>
                    <input
                        type="number"
                        id="gift"
                        {...register("gift")}
                        min={0}
                        step="0.01"
                        className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                        placeholder="Enter a monetary gift"
                    />
                </div>
                <div className=' flex  justify-center items-center'>
                    <button type='submit' className='bg-blue-800 text-white rounded-lg py-1.5 px-6'>
                        Save comment
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}