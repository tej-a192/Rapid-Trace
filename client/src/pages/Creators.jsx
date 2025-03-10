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
      <p className='text-md md:text-xl'>
        We are a team of <b>five</b> dedicated individuals who came together to create RapidTrace, 
        a platform designed to make travel smarter and safer. With a shared passion for innovation, 
        we’ve worked hard to bring this idea to life.
      </p>

      <div className='w-4xl'>
        <Accordion type="single" collapsible>
          {teamMembers.map((member, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{member.Name}</AccordionTrigger>
              <AccordionContent>
                <div className='flex items-start space-x-4'>
                  <img 
                    src={member.Image}
                    alt={member.Name} 
                    className='w-60 h-60 rounded-full object-cover' 
                  />
                  <div>
                    <h1 className='text-center text-blue-500 font-bold text-lg'>{member.Name}</h1>
                    <p className='text-slate-500 text-lg'>{member.About}</p>

                    <div className='flex text-2xl items-center justify-center gap-6 mt-2'>
                        <a href={member.Portfolio}><CiUser/></a>
                        <CiLinkedin/>
                        <CiMail/>
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
