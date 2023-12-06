import axios from "axios";
import React from 'react'
import UserGallery from "@/components/admin/gallery/UserGallery";

const page =async () => {
    
  const result = await axios.get(`https://result-gen.vercel.app/gallery?${Date.now()}`, {
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
  
  return (
    <div>
        <UserGallery result={result.data} />
    </div>
  )
}

export default page