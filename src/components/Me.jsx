import { useEffect, useState } from "react";
import supabase from "../config/supabaseClients";
import LoadingIndicator from "./indicators/LoadingIndicator";
import Typewriter from "./typewriter/typewriter"
import {
  FaHackerrank,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import pp from "../assets/images/pp.webp"
import ang from "../assets/images/tech/angular.svg"
import rect from "../assets/images/tech/react.svg"
import js from "../assets/images/tech/js.svg"
import netcore from "../assets/images/tech/netcore.svg"
import nodejs from "../assets/images/tech/nodejs.svg"
import { Helmet } from "react-helmet";



const Me = () => {
  const [fetchErr, setFetchErr] = useState(null);
  const [datasP, setDatasP] = useState([]);
  const [socialUrlData, setSocialUrlData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDatas = async () => {
      setLoading(true);
      let { data: personal_info, error } = await supabase
        .from("personal_info")
        .select("*");
      if (error) {
        setFetchErr(error);
        setDatasP(null);
        console.log(error);
      }
      if (personal_info) {
        setDatasP(personal_info[0]);
        setFetchErr(null);
      }

      let { data: social_url, err } = await supabase
        .from("social_url")
        .select("*");
      if (err) {
        setFetchErr(err);
        setSocialUrlData(null);
        console.log(err);
      }
      if (social_url) {
        setFetchErr(null);
        setSocialUrlData(social_url);
      }
      setLoading(false);
      
    };
    fetchDatas();
    
    
  }, []);

  const getSocialIcon = (socialName) => {
    if (socialName.toUpperCase() == "INSTAGRAM")
      return <FaInstagram className="text-3xl" />;
    else if (socialName.toUpperCase() == "LINKEDIN")
      return <FaLinkedinIn className="text-3xl" />;
    else if (socialName.toUpperCase() == "HACKERRANK")
      return <FaHackerrank className="text-3xl" />;
    else if (socialName.toUpperCase() == "GITHUB")
      return <FaGithub className="text-3xl" />;
  };

  return (
    <div className="main container mx-auto my-10 px-8 text-white">
      <Helmet>
        <title>HÜSEYİN ÇORAKLI</title>
        <meta name="description" content="Main page/Hüseyin ÇORAKLI" />
      </Helmet>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className="p-3 flex flex-col sm:flex-row">
          <div className="flex flex-col w-full sm:w-1/4 h-auto mr-3 mb-4 mt-2">
            <div className="grid justify-items-center p-3">
              <img
                className="photo rounded-full p-2"
                src={pp}
                alt=""
              />
            </div>
            {datasP && (
              <div key={3} className="grid justify-items-center p-4">
                <h3>{datasP.fullname}</h3>
              </div>
            )}
            {datasP && (
              <div key={1} className="grid justify-items-center p-4">
                <h3>{datasP.university_name}</h3>
              </div>
            )}
            {datasP && (
              <div key={2} className="grid justify-items-center p-4">
                <h3>{datasP.department_name}</h3>
              </div>
            )}
            {socialUrlData && (
              <div className="flex justify-center mt-4 ">
                {socialUrlData.map((item) => (
                  <a
                    href={item.social_url}
                    key={item.id}
                    className="flex flex-col items-center mx-2 socialBtn"
                    target="_blank"
                  >
                    {getSocialIcon(item.social_name)}
                    <span className="text-center text-xs">
                      {item.social_name}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col items-center w-full sm:w-3/4 mb-4 mt-5 my-8 p-3 bLeft flex-grow">
            <h1 className="text-4xl mb-6">ABOUT ME</h1>
              <Typewriter/>
              <div className="flex-grow"></div>
            <div className="flex flex-col">
              <strong className="text-xl mb-5 ">Tech stack I'm currently working with:</strong>
              <div  className="flex flex-row lg:space-x-10">
              <div id="techImg" className="w-14 "><img src={netcore} alt="" /></div>
              <div id="techImg" className="w-14"><img src={rect} alt="" /></div>
              <div id="techImg" className="w-14"><img src={js} alt="" /></div>
              <div id="techImg" className="w-14"><img src={nodejs} alt="" /></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Me;
