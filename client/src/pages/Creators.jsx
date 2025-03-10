import React from 'react';
import { teamMembers } from '@/assets/assets';
import { CiLinkedin } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Creators = () => {
  return (
    <div className='flex flex-col justify-center items-center mx-1 md:mx-4 lg:mx-6 my-6 space-y-3 md:space-y-6'>
      <h1 className='text-blue-500 text-lg md:text-4xl lg:text-5xl font-bold'>
        Meet the Minds Behind RapidTrace
      </h1>
      <p className='text-md md:text-xl text-center'>
        We are a team of <b>five</b> dedicated individuals who came together to create RapidTrace, 
        a platform designed to make travel smarter and safer. With a shared passion for innovation, 
        we’ve worked hard to bring this idea to life.
      </p>

      <div className='w-full lg:w-4xl'>
        <Accordion type="single" collapsible>
          {teamMembers.map((member, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{member.Name}</AccordionTrigger>
              <AccordionContent>
              <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:gap-4">

              <img
                src={member.Image}
                alt={member.Name}
                className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full object-cover"
              />

              <div>
                <h1 className="mt-2 text-blue-500 font-bold text-base sm:text-lg text-center">{member.Name}</h1>
                <p className="text-slate-500 text-sm sm:text-base md:text-lg">{member.About}</p>


                <div className="flex items-center justify-center gap-4 sm:gap-6 mt-2 md:justify-center text-2xl">
                  <a href={member.Portfolio} target="_blank"><CiUser /></a>
                  <a href={member.Linkedin} target="_blank"><CiLinkedin /></a>
                  <a href={member.Mail} target="_blank"><CiMail /></a>
                </div>
              </div>

              </div>

              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Creators;
