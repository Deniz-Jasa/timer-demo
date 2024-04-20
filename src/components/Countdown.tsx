import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface CountdownProps {
    startingMinutes: number;
    extraTimeMinutes: number;
    startDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ startingMinutes, extraTimeMinutes, startDate }) => {
    const [mainTime, setMainTime] = useState(startingMinutes * 60);
    const [extraTime, setExtraTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isExtraTimeActive, setIsExtraTimeActive] = useState(false);
    const [currentDay, setCurrentDay] = useState<number>(1);
    const [displayStartDate, setDisplayStartDate] = useState<Date>(startDate);

    useEffect(() => {
        setDisplayStartDate(startDate);
        setCurrentDay(1);
    }, [startDate]);

    const handleDayIncrement = (event: React.MouseEvent<HTMLDivElement>) => {
        const divRect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - divRect.left; // Calculate the click position relative to the div
        const divWidth = divRect.width;

        if (clickX < divWidth / 2 && currentDay > 1) {
            setCurrentDay((prevDay) => prevDay - 1);
            // Decrement the startDate by one day
            const newStartDate = new Date(displayStartDate);
            newStartDate.setDate(displayStartDate.getDate() - 1);
            setDisplayStartDate(newStartDate);
        }
        else {
            setCurrentDay((prevDay) => prevDay + 1);
            // Increment the startDate by one day
            const newStartDate = new Date(displayStartDate);
            newStartDate.setDate(displayStartDate.getDate() + 1);
            setDisplayStartDate(newStartDate);
        }
    };    


    useEffect(() => {
        let intervalId: string | number | NodeJS.Timeout | undefined;

        if (isActive) {
            if (mainTime > 0) {
                intervalId = setInterval(() => {
                    setMainTime((prevTime) => prevTime - 1);
                }, 1000);
            } else if (!isExtraTimeActive) {
                setIsExtraTimeActive(true);
            }
        }

        if (isExtraTimeActive) {
            if (extraTime < extraTimeMinutes * 60) {
                intervalId = setInterval(() => {
                    setExtraTime((prevTime) => prevTime + 1);
                }, 1000);
            }
            else {
                setIsActive(false); // Optionally, also stop the active state to prevent restarting
            }
        }

        return () => clearInterval(intervalId); // This will clear the interval when the component unmounts or the dependencies change
    }, [isActive, mainTime, isExtraTimeActive, extraTime, extraTimeMinutes]);

    useEffect(() => {
        const reset = () => {
            handleReset();
        };
    
        reset();
    }, [startingMinutes]);
    

    const toggleStartStop = () => {

        if (mainTime > 0) {
            setIsActive(!isActive);
        }

        else if (isExtraTimeActive) {
            setIsExtraTimeActive(false);
            console.log("HERE");

        }
    };

    const handleReset = () => {
        setIsActive(false);
        setIsExtraTimeActive(false);
        setMainTime(startingMinutes * 60);
        setExtraTime(0);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div>
            {(!isExtraTimeActive || extraTime <= 0) && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '1rem',
                        userSelect: 'none',
                    }}

                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'right',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            marginRight: '20px',
                            backgroundColor: '#E2F038',
                            color: '#0F0F0F',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                        }}
                        onClick={handleDayIncrement}
                    >
                        Day {currentDay}
                    </div>
                    <div style={{ fontSize: '1.5rem' }}>
                        {displayStartDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            )}


            {(isExtraTimeActive && extraTime > 0) && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
                        {displayStartDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'right',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            marginLeft: '20px',
                            backgroundColor: '#E2F038',
                            color: '#0F0F0F',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                            borderRadius: '6px'
                        }}>
                            {formatTime(extraTime)}
                            <div style={{ width: '1px', height: '55%', backgroundColor: '#0F0F0F', margin: '0 8px' }}></div>
                            <span>{extraTimeMinutes}&rsquo;</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="leading-none" style={{ textAlign: 'center', fontSize: '10rem' }}>
                {formatTime(mainTime)}
            </div>


            <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', justifyContent: 'space-between', width: '25%' }}>
                <Button onClick={toggleStartStop} style={{ marginRight: '30px', width: '300px' }}>
                    {isActive ? 'Stop' : 'Start'}
                </Button>
                <Button onClick={handleReset} style={{ width: '300px' }} variant="outline">
                    Reset
                </Button>
            </div>


        </div>
    );
};

export default Countdown;
