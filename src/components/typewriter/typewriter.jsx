import Typewriter from 'typewriter-effect';
import supabase from '../../config/supabaseClients';
import { useEffect, useState } from 'react';



const typewriter = () => {
 const [bio,setBio]=useState(null);
  useEffect(() => {
    const fetchDatas = async () => {
      const { data: paragraphs, error } = await supabase
        .from("paragraphs")
        .select("*");
      if (error) {
        console.log(error);
      }
      if (paragraphs) {
       setBio(paragraphs[0].bio)
      }
      
    }
    fetchDatas()
  }, []);
  return (
    <>
    {bio && ( 
      <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString(`<strong>${bio}</strong>`)
            .start()
            .changeDelay(9000000);
        }}
      />
    )}
  </>
  )
}

export default typewriter
