import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubjects, fetchModules } from "../redux/slices/subjectSlice";
import Loader from "../components/Loader";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

const SubjectDetails = () => {
    const { subjectId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { subjects, modules, loading, error } = useSelector((state) => state.subjects);
    const [bgLoaded, setBgLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = "/subjectBg.png";
        img.onload = () => setBgLoaded(true);
    }, []);

    useEffect(() => {
        if (bgLoaded && subjects.length === 0) {
            dispatch(fetchSubjects());
        }
    }, [dispatch, bgLoaded, subjects.length]);

    useEffect(() => {
        if (subjectId) {
            dispatch(fetchModules(subjectId));
        }
    }, [dispatch, subjectId]);

    const subject = subjects.find((sub) => sub.id === Number(subjectId));

    if (!bgLoaded || loading) return <Loader />;
    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!subject) return <p className="text-red-500 text-center">Subject not found.</p>;

    return (
        <div
            className="relative min-h-screen bg-cover bg-fixed bg-center px-4"
            style={{ backgroundImage: `url('/subjectBg.png')` }}
        >
            {/* Header */}
            <div className="bg-[#950DDB] py-4 fixed top-0 left-0 w-full shadow-md z-10 flex px-4">
                <button onClick={() => navigate(-1)} className="text-gray-300 text-[33px]">
                    <IoChevronBackCircleOutline />
                </button>
                <h2 className="text-white text-[22px] text-center -ml-6 font-semibold flex-grow">Modules</h2>
            </div>

            <div className="pt-28">
                {/* Current Course */}
                <div className="p-4 bg-[#F2DFFB] rounded-2xl shadow-md text-center">
                    <p className="text-gray-600 text-left text-[14px] font-bold">Current Course :</p>
                    <h3 className="font-semibold text-left text-[15px]">{subject.title} - Beginner</h3>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-[#950DDB] text-[14px] font-bold text-gray-200 px-20 py-2 rounded-4xl mt-5"
                    >
                        Browse Other Course
                    </button>
                </div>

                {/* Modules List */}
                <h3 className="text-white text-[22px] font-bold mt-10 mb-6">{subject.title}</h3>
                <div className="relative">
                    {modules.map((module, index) => (
                        <div
                            onClick={() => navigate(`/modules/${subject.id}`)}
                            key={module.id}
                            className="relative flex items-center space-x-4 my-4"
                        >
                            {/* Steps */}
                            <div className="relative py-3 flex flex-col items-center">
                                <div className="flex text-[22px] items-center justify-center w-14 h-14 border-[4px] border-[#E4B5F9] bg-white text-black font-bold rounded-full shadow-md">
                                    {index + 1}
                                </div>
                                {/* Connecting Line */}
                                {index !== modules.length - 1 && (
                                    <div className="absolute w-[2px] top-17 h-20 bg-[#E4B5F9]"></div>
                                )}
                            </div>

                            {/* Module Details */}
                            <div className="flex-1 ml-1">
                                <h4 className="text-[#F2DFFB] text-[17px] font-bold">{module.title}</h4>
                                <p className="text-[#FDB9B8] text-[14px] font-semibold">6 Lessons</p>
                            </div>

                            <IoIosArrowForward className="text-white text-[24px]" />
                        </div>
                    ))}
                </div>

                {/* Continue Button */}
                <button
                    onClick={() => navigate(`/modules/${subject.id}`)}
                    className="w-full bg-[#F2DFFB] text-purple-600 font-bold py-3 rounded-lg mt-6 mb-4"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default SubjectDetails;
