import {create} from 'zustand';
import { persist } from 'zustand/middleware';

interface CommentsStore {
  liked: number[];
  toggleLike: (id: number) => void;
}


export const useLikedComments =  create( persist<CommentsStore>((set) => ({
    liked: [],
    toggleLike: (id) => set((state) => ({
        liked: state.liked.includes(id)? state.liked.filter((list) => list !== id) : [...state.liked, id] , 
    }))
}),{
    name: 'liked-comments',
}))
