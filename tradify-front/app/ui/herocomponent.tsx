import { Fragment } from "react";
import React from "react";

export default function HeroComponent() {
  return (
    <div className='min-h-[55vh] sm:min-h-[90vh]'>
      <div className=' flex justify-center items-center p-5'>
        <h1 className=' text-[6vw] text-center md:text-[65px] leading-1 select-none tracking-tightest font-extrabold'>
          <span
            data-content='Trustworthy Vehicle History Tracking.'
            className='relative block before:content-[attr(data-content)] before:w-full before:z-0 before:block before:absolute before:top-0 before:px-2 before:bottom-0 before:left-0 before:text-center before:text-[#0f1624] before:animate-gradient-background-1'
          >
            <span className='px-2 text-transparent bg-clip-text bg-gradient-to-r from-gradient-1-start to-gradient-1-end animate-gradient-foreground-1'>
              Trustworthy Vehicle History Tracking.
            </span>
          </span>
          <span
            data-content='List, sell, buy cars without surprises.'
            className='relative block before:content-[attr(data-content)] before:w-full before:z-0 before:block before:absolute before:top-0 before:px-2 before:bottom-0 before:left-0 before:text-center before:text-[#0f1521] before:animate-gradient-background-2'
          >
            <span className='px-2 text-transparent bg-clip-text bg-gradient-to-r from-gradient-2-start to-gradient-2-end animate-gradient-foreground-2'>
              List, sell, buy cars without surprises.
            </span>
          </span>
          <span
            data-content='Get Paid.'
            className='relative block before:content-[attr(data-content)] before:w-full before:z-0 before:block before:absolute before:top-0 before:px-2 before:bottom-0 before:left-0 before:text-center before:text-[#0e1420] before:animate-gradient-background-3'
          >
            <span className='px-2 text-transparent bg-clip-text bg-gradient-to-r from-gradient-3-start to-gradient-3-end animate-gradient-foreground-3'>
              Get Paid.
            </span>
          </span>
        </h1>
      </div>
    </div>
  );
}
