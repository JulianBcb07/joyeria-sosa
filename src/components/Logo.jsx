import React from 'react'

const Logo = () => {
    return (
        <div className="flex items-center cursor-pointer group">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-300 shadow-inner border border-yellow-200 group-hover:shadow-lg group-hover:from-gray-600 group-hover:to-gray-400 group-hover:border-gray-300 transition-all duration-500 relative">
                <div className="absolute top-1 left-1 w-2 h-2 bg-white/90 rounded-full blur-[1px] group-hover:scale-110 group-hover:blur-[1.5px] transition-all duration-300"></div>
            </div>
            <span className="ml-2 text-sm tracking-widest text-gray-600 group-hover:text-gray-800">
                SOSA JOYERIA
            </span>
        </div>
    )
}

export default Logo;