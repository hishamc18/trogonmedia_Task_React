import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSubjects, fetchModules } from "../redux/slices/subjectSlice";
import { IoCheckmarkSharp, IoChevronBackCircleOutline } from "react-icons/io5";
import Loader from "../components/Loader";

const Modules = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { subjectId } = useParams();
    const { subjects, modules, loading, error } = useSelector((state) => state.subjects);

    useEffect(() => {
        if (subjects.length === 0) {
            dispatch(fetchSubjects());
        }
    }, [dispatch, subjects.length]);

    useEffect(() => {
        if (subjectId) {
            dispatch(fetchModules(subjectId));
        }
    }, [dispatch, subjectId]);

    const selectedSubject = subjects.find((subject) => subject.id === Number(subjectId));

    if (loading || !modules.length) return <Loader />;
    if (error) return <p>Error: {error}</p>;
    if (!selectedSubject) return <p>Subject not found.</p>;

    return (
        <div className="relative min-h-screen bg-[url('/modulesBG.png')] bg-cover h-full bg-fixed bg-center text-white flex flex-col items-center px-4">
            {/* Back Button and Title */}
            <div className="w-full sticky top-0 z-10 flex flex-col items-center mb-14 py-4">
                <button className="absolute top-4 left-0 p-2 rounded-full" onClick={() => navigate(-1)}>
                    <IoChevronBackCircleOutline className="text-white text-[30px]" />
                </button>
                <h2 className="text-xl font-bold mt-2">{selectedSubject.title}</h2>
            </div>

            <div className="flex-1 w-full overflow-y-auto mt-2 px-4">
                <div className="relative w-full flex flex-col items-center gap-24 pb-10">
                    {modules.map((module, index) => {
                        const isLeftToRight = index % 2 !== 0;

                        return (
                            <div key={module.id} className="relative flex w-full items-center">
                                {/* Mobile: Curved Arrow */}
                                {/* Arrow Connector */}
                                {index !== 0 && modules.length > 0 && (
                                    <>
                                        {/* Mobile: Curved Arrow */}
                                        <svg
                                            className="absolute -top-24 left-1/2 transform scale-x-55 -translate-x-1/2 block lg:hidden"
                                            width="350"
                                            height="150"
                                            viewBox="0 0 220 130"
                                        >
                                            <path
                                                d={
                                                    isLeftToRight
                                                        ? "M0,10 C0,100 90,100 180,110"
                                                        : "M210,10 C210,100 110,100 20,110"
                                                }
                                                stroke="yellow"
                                                strokeWidth="2"
                                                strokeDasharray="13,13"
                                                fill="none"
                                            />
                                            <polygon
                                                points={isLeftToRight ? "176,108 184,110 176,114" : "24,108 16,110 24,114"}
                                                fill="yellow"
                                            />
                                        </svg>

                                        {/* Large Screens: Inclined Arrow */}
                                        <svg
                                            className="absolute -top-15 left-1/2 transform -translate-x-1/2 hidden lg:block"
                                            width="350"
                                            height="330"
                                            viewBox="0 0 170 160"
                                        >
                                            <path
                                                d={!isLeftToRight ? "M10,40 L190,10" : "M190,40 L10,10"}
                                                stroke="yellow"
                                                strokeWidth="2"
                                                strokeDasharray="10,10"
                                                fill="none"
                                            />
                                        </svg>
                                    </>
                                )}

                                <div
                                    className={`relative flex flex-col items-center w-1/2 ${
                                        isLeftToRight ? "justify-end ml-auto" : "justify-start mr-auto"
                                    }`}
                                >
                                    {/* Title */}
                                    <p className="text-[12px] font-bold text-center mb-2">{module.title}</p>

                                    {/* Check Box */}
                                    <div className="w-12 h-12 bg-white flex items-center justify-center border-[3px] border-[#E4B5F9] rounded-full shadow-md">
                                        <IoCheckmarkSharp className="text-[#950DDB] text-[22px] font-extrabold" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Continue Button */}
            {modules.length > 0 && (
                <div className="w-full p-4 sticky bottom-0 flex justify-center">
                    <button
                        className="px-10 py-3 bg-[#F2DFFB] text-[#950CE0] text-[15px] font-bold rounded-lg shadow-md"
                        onClick={() => navigate(`/module-videos/${subjectId}`)}
                    >
                        Continue
                    </button>
                </div>
            )}
        </div>
    );
};

export default Modules;
