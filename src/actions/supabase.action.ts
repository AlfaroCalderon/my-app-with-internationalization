'use server';
import { createComments } from '@/services/supabase.service';
import {z} from 'zod'
const commentSchema = z.object({
    name: z.string().min(2, ' Name must be at least 2 characters long').max(60, 'Name must be less than 50 characters long'),
    lastname: z.string().min(2, 'Lastname must be at least 2 character long').max(60, 'Lastname must be less than 50 characters long'),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
    comment: z.string().min(10, 'Comment must be at least 10 characters long').max(500, 'Comment must be less than 500 characters long'),
    gift: z.number().min(0, 'Gift amount must be at least 0').max(1000, 'Gift amount must be less than or equal to 1000').optional()
}) 


type CommentActionState = {
    success: boolean,
    error?: string,
    fieldErrors?: {
        name?: string[],
        lastname?: string[],
        comment?: string[],
        email?: string[],
        gift?: string[]
    }
}

export const insertNewComment = async (_prevState:CommentActionState, formData:FormData):Promise<CommentActionState> => {
        try{
            const rawData = {
                name: formData.get('name') as string,
                lastname: formData.get('lastname') as string,
                email: formData.get('email') as string,
                comment: formData.get('comment') as string,
                gift: formData.get('gift') ? parseFloat(formData.get('gift') as string) : undefined
            }
           
            const validatedFields = commentSchema.safeParse(rawData);

            if(!validatedFields.success){
                const errors = validatedFields.error.flatten().fieldErrors
                return{
                    success: false,
                    error: 'Comment validation failed',
                    fieldErrors: {
                        name: errors.name || [],
                        lastname: errors.lastname || [],
                        email: errors.email || [],
                        comment: errors.comment || [],
                        gift: errors.gift || []
                    }
                }
            }

            //We send the data
            const result = await createComments({comment: validatedFields.data});

            return ({
                success: true,
                error: undefined,
                fieldErrors: undefined
            })
        }catch (error) {
            return {
                success: false,
                error: 'Failed to insert comment',
                fieldErrors: undefined
            }
        }
}


