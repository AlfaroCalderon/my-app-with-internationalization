import { deleteComment, getComments } from '@/services/supabase.service';
import { useMutation, useQuery } from '@tanstack/react-query'
import { FaHeart } from "react-icons/fa";
import Link from 'next/link';
import { useLikedComments } from '@/stores/comments.store';

export const Comments = () => {

const { data, isError, isLoading, error} =  useQuery({ queryKey: ['comments'], queryFn: () => getComments(), refetchInterval: 5000 });
const mutation = useMutation({mutationKey: ['deleteComment'], mutationFn: ({id}: { id: string | number}) => deleteComment({id})});

const toggleLike = useLikedComments((state) => state.toggleLike);
const liked = useLikedComments((state) => state.liked);

const handleDeleteButton = (id: string | number) => {
  mutation.mutate({id});
}

const handleLike = (id:number) => {
  toggleLike(id);
}
 
return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-gray-200 shadow-xl rounded-xl p-8 max-w-2xl mx-auto border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-2m12-8V6a2 2 0 00-2-2H7a2 2 0 00-2 2v8a2 2 0 002 2h8" />
        </svg>
        Comments in real time
      </h2>
      {isLoading && (
        <div className="flex items-center gap-2 text-gray-500">
          <svg className="animate-spin h-5 w-5 text-blue-400" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span>Loading comments...</span>
        </div>
      )}
      {isError && (
        <p className="text-red-500 bg-red-50 rounded p-2 border border-red-200">
          Error loading comments: {error.message}
        </p>
      )}
      {data && (
        <ul className="space-y-4 mt-4">
          {data.length === 0 ? (
            <li className="text-gray-500 italic">No comments yet.</li>
          ) : (
            data.map((comment) => (
            <li key={comment.id} className="bg-white rounded-lg shadow p-4 border border-gray-100">
                <div className="flex flex-col gap-1 mb-2">
                  <div className='flex justify-between items-center'>  
                    <div>
                       <span className="font-semibold text-gray-800">{comment.name} {comment.lastname}</span>
                    </div>
                    <div className="flex items-center">
                       <button
                          onClick={() => handleDeleteButton(comment.id!)}
                          className="text-red-500 hover:text-red-700 p-1 rounded transition-colors cursor-pointer"
                          title="Delete comment"
                          disabled={mutation.isPending}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" />
                          </svg>
                        </button>
                        <Link
                          href={`/comments/${comment.id}/edit`}
                          className="text-blue-500 hover:text-blue-700 p-1 rounded transition-colors cursor-pointer"
                          title="Edit comment"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232a3 3 0 114.243 4.243L7.5 21H3v-4.5l12.232-12.268z" />
                          </svg>
                        </Link>
                        <FaHeart className=' cursor-pointer' color={liked.includes(comment.id!) ? 'red' : 'gray'} size={20} onClick={() => handleLike(comment.id!)} />
                        </div>
                  </div>
                    <span className="text-sm text-gray-500">{comment.email}</span>
                </div>
                <p className="text-gray-700 mb-2">{comment.comment}</p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Gift: {comment.gift}</span>
                    <span>{comment.created_at}</span>
                </div>
            </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
