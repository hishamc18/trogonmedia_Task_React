import React from "react";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative w-16 h-16">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-3 h-3 bg-[#771EAE] rounded-full"
                        style={{
                            transform: `rotate(${i * 45}deg) translate(24px)`,
                            animation: `spin 1s linear infinite`,
                            animationDelay: `${i * 0.1}s`,
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Loader;
