import React from 'react';
import Image from 'next/image';
const Banner = () => {
    return (
        <div>
            <div>
                <p className=' text-lime-500 font-medium text-xs'>WORKOUT LIBRARY</p>
              <h2>TRAIN WITH INTENT. LOG
EVERY SET.</h2>
<p>FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
into todays plan, and watch the weeks work add up.</p>
            </div>
            <div>
                <Image  src='./banner.png' />
            </div>
            
        </div>
    );
};

export default Banner;