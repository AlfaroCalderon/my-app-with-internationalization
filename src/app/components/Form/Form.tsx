'use client'
import {useForm} from 'react-hook-form'

type TextProps = {
    formTitle: string,
    name: string,
    namePlaceholder: string,
    lastName: string,
    lastNamePlaceholder: string,
    email: string,
    emailPlaceholder: string,
    comment: string,
    commentPlaceholder: string,
    gift: string,
    giftPlaceholder: string,
    submitButton: string
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
                        {...register("name", {required: "Please enter your name", minLength: {value: 2, message: "Name must be at least 2 characters long"}, maxLength: {value: 60, message: "Name must be less than 60 characters long"}})}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400'
                        placeholder={TextProps.namePlaceholder}
                    />
                    {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
                </div>
                <div>
                        <label htmlFor="apellido" className='block text-sm font-medium text-gray-700 mb-2'>
                            {TextProps.lastName}
                        </label>
                        <input
                            type="text"
                            id="apellido"
                            {...register("apellido", {required: "Please enter your last name", minLength: {value:2, message: 'Lastname must be at least 2 characters long'}, maxLength: {value: 60, message: "Lastname must be less than 60 characters long"} })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                            placeholder={TextProps.lastNamePlaceholder}
                        />
                        {errors.apellido && <span className='text-red-500'>{errors.apellido.message}</span>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        {TextProps.email}
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", {required: "Please enter your email", pattern: {value: /^\S+@\S+$/i, message: "Please enter a valid email address"}})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                        placeholder={TextProps.emailPlaceholder}
                    />
                    {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
                </div>
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        {TextProps.comment}
                    </label>
                    <textarea
                        id="comment"
                        {...register("comment", {required: "Please enter your comment", minLength: {value: 10, message: "Comment must be at least 10 characters long"}, maxLength: {value: 500, message: "Comment must be less than 500 characters long"}})}
                        rows={4}
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                        placeholder={TextProps.commentPlaceholder}
                    />
                    {errors.comment && <span className='text-red-500'>{errors.comment.message}</span>}
                </div>
                <div>
                    <label htmlFor="gift" className="block text-sm font-medium text-gray-700 mb-2">
                        {TextProps.gift}
                    </label>
                    <input
                        type="number"
                        id="gift"
                        {...register("gift", {required: false, min: {value: 0, message: "Gift amount must be at least 0"}, max: {value: 1000, message: "Gift amount must be less than or equal to 1000"}})}
                        min={0}
                        step="0.01"
                        className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                        placeholder={TextProps.giftPlaceholder}
                    />
                </div>
                <div className=' flex  justify-center items-center'>
                    <button type='submit' className='bg-blue-800 text-white rounded-lg py-1.5 px-6'>
                        {TextProps.submitButton}
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}