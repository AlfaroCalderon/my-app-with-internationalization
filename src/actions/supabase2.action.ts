'use server';
import {z} from 'zod';

const validationSchema = z.object({
    name: z.string().min(2, 'Name field must be at least 2 characters long').max(60, 'Name field must be only 60 characters long'),
    lastname: z.string().min(2, 'Lastname field must be at least 2 characters long').max(60, 'Lastname field must be only 60 characters long'),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email format is incorrect' ),
    comment: z.string().min(10, 'Comment field must be at least 10 characters long').max(500, 'Comment field must be only 500 characters long'),
    gift: z.number().min(0, 'Gift amount must be at least 0').max(1000, 'Gift amount must be less than or equal to 1000').optional()
})


type CommentActionState = {
    success: boolean,
    error?: string,
    fieldErrors?: {
        name?: string[],
        lastname?: string[],
        email?: string[],
        comment?: string[],
        gift?: string[]
    }
}

export const insertNewComment = async (_prevState:CommentActionState, formData:FormData): Promise<CommentActionState> => {
try {

    const rawData = {
        name: formData.get('name') as string,
        lastname: formData.get('lastname') as string,
        email: formData.get('email') as string,
        comment: formData.get('comment') as string,
        gift: formData.get('gift') ? parseInt(formData.get('gift') as string): null
    }

    console.log(rawData);

    const validatedFields = validationSchema.safeParse(rawData);

    if (!validatedFields.success) {
        const errors = validatedFields.error.flatten().fieldErrors;

        return {
            success: false,
            error: 'Problems have arisen with the fields',
            fieldErrors: {
                name: errors.name || [],
                lastname: errors.lastname || [],
                email: errors.email || [],
                comment: errors.comment || [],
                gift: errors.gift || []
            }
        };
    }

    return {
        success: true,
        error: undefined,
        fieldErrors: undefined
    }
    
} catch (error) {
    return {
        success: false,
        error: 'The data could not be sent :'+error,
        fieldErrors: undefined
    };
}
}