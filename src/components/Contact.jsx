import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import * as alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";

const Contact = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [sendLoading,setSendLoading]= useState(false)
  const service_id = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const template_id = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const key = import.meta.env.VITE_EMAILJS_API_KEY;
  const password = import.meta.env.VITE_PASSWORD;
  const url = import.meta.env.VITE_MESSAGE_WP;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendEmail =async (data, e) => {
    e.preventDefault();

    if (!emailSent) {
      setSendLoading(true)
      emailjs
        .sendForm(
          service_id,
          template_id,
          e.target, // Form elementine referans veriyoruz
          key
        )
        .then(
          (result) => {
            if (result.text == "OK") {
              alertify.set("notifier", "position", "top-center");
              alertify.success("Message sent successfully!");
              setEmailSent(true);
              setSendLoading(false)
            }
          },
          (error) => {
            alertify.set("notifier", "position", "top-center");
            alertify.error("There was an error sending the message, try later.");
            setSendLoading(false)
          }
        );
    } else {
      alertify.set("notifier", "position", "top-center");
      alertify.error("Message has already been sent.");
      setSendLoading(false)
    }
  };
  useEffect(() => {
    let timer;
    if (emailSent) {
      timer = setTimeout(() => {
        setEmailSent(false);
      }, 5 * 60 * 1000); // 5 dakika (ms cinsinden)
    }
    // console.log(timer);
    return () => clearTimeout(timer);

    
  }, [emailSent]);

  const onSubmit = async (data, e) => {
    
    const wpMessage=`${data.from_name} : ${data.message} email : ${data.from_email}`
    sendEmail(data, e)
    WpMessageSender(wpMessage)
  };

  const WpMessageSender= async(data)=>{
    if (emailSent==false) {
      const fullUrl= `${url}/${password}/${data}`
    await fetch(fullUrl).catch(err=>{'hata'})
    }
  }
  

  return (
    <div className="main container mx-auto my-10 px-8 text-white">
      <Helmet>
        <title>CONTACT ME!</title>
        <meta name="description" content="İletişim sayfası" />
      </Helmet>
      <div className="items-center text-center p-2">
        <h2 className="text-2xl font-bold">CONTACT ME</h2>
      </div>
      <form className="max-w-md mx-auto p-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="from_name"
          >
            Your Name
          </label>
          <input
            {...register("from_name", { required: "Name is required" })}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            id="from_name"
            type="text"
            name="from_name"
            placeholder="Your Name"
          />
          {errors.from_name && (
            <p className="text-red-500 text-sm ">{errors.from_name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="from_email"
          >
            Your Email
          </label>
          <input
            {...register("from_email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            id="from_email"
            type="email"
            name="from_email"
            placeholder="Your Email"
          />
          {errors.from_email && (
            <p className="text-red-500 text-sm ">{errors.from_email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            {...register("message", { required: "Message is required" })}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            id="message"
            name="message"
            placeholder="Message"
            rows="4"
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm ">{errors.message.message}</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit" disabled={sendLoading} 
          >
             {sendLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
