"use client";
import React, { useEffect, useState } from 'react';

const CountdownTimer = () => {
    const targetDate = new Date('2023-10-21T17:00:00');
console.log(new Date(new Date('2023-10-21T17:00:00').toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })));

    const getTimeRemaining = (targetDate: any) => {
        const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })).getTime();
        console.log(new Date());

        const time = targetDate - now;

        if (time <= 0) {
            return {
                total: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);

        return {
            total: time,
            days,
            hours,
            minutes,
            seconds,
        };
    };

    const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

    useEffect(() => {
        const intervalId = setInterval(() => {
            const updatedTimeLeft = getTimeRemaining(targetDate);
            setTimeLeft(updatedTimeLeft);

            if (updatedTimeLeft.total <= 0) {
                clearInterval(intervalId);
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [targetDate]);



    return (
        <div>
            <h1 className='lg:text-[2rem] text-[1rem]'>GRAND RESULTS IN</h1>
            <div suppressHydrationWarning className='flex flex-col'>
                <p suppressHydrationWarning className='lg:text-[10rem] text-[4rem]'>{timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</p>
                <div className="flex items-center justify-center gap-2 lg:gap-10">

                <p suppressHydrationWarning className='lg:text-[2rem] text-[1rem]'>Days </p>
                <p suppressHydrationWarning className='lg:text-[2rem] text-[1rem]'> Hours</p>
                <p suppressHydrationWarning className='lg:text-[2rem] text-[1rem]'> Minutes </p>
                <p suppressHydrationWarning className='lg:text-[2rem] text-[1rem]'>Seconds</p>
                </div>
                {/* <p suppressHydrationWarning >Hours: {timeLeft.hours}</p>
                <p suppressHydrationWarning >Minutes: {timeLeft.minutes}</p>
                <p suppressHydrationWarning >Seconds: {timeLeft.seconds}</p> */}
            </div>
        </div>
    );
};

export default CountdownTimer;
