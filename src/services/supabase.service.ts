import { supabaseApi } from '@/api/supabase.api'
import { type Comments } from '@/types/comments.type'

export const createComments = async ({ comment }: { comment: Comments }): Promise<Comments | never> => {
    try {
        const respose = await supabaseApi.post('/comments', comment, {
            headers: {
                "Prefer": "return-representation"
            }
        });
        return respose.data;
    } catch (error) {
        console.log('An error has arisen: ' + error);
        throw new Error('An error has arisen: ' + error);
    }

}

export const getComments = async (): Promise<Comments[] | never> => {
    try {

        const response = await supabaseApi.get('/comments', {
            headers: {
                "Prefer": "return-representation"
            }
        })

        return response.data;

    } catch (error) {
        console.log(error);
        throw new Error('An error has arisen: ' + error);
    }
}