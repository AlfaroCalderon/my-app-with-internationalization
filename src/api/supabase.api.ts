import axios from "axios";

export const supabaseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers:{
    "Content-Type": "application/json",
    "apikey": process.env.NEXT_PUBLIC_API_KEY
  }
  
});