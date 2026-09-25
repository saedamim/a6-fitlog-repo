import Image from 'next/image';
import React from 'react';

const FooterPage = () => {
    return (
        <div className='w-full border border-t border-gray-600 bg-black'>

        <div className='flex items-center min-h-20 max-w-7xl flex-col mx-auto px-6 my-6 h-20 max-w-7xl justify-between sm:flex-row sm:justify-between sm:px-6'>
            <div className='flex items-center gap-2'>
            <Image src="/logo.png"
            alt="FitLog"
            width={28}
            height={28}
            className="object-contain"/>
           <h2 className='font-mono'>FITLOG</h2>
            </div>
           <div className=' text-xs text-gray-500'>

            <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
           </div>
        </div>
        </div>
    );
};

export default FooterPage;