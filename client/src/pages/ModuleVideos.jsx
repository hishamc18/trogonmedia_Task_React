import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchModules, fetchSubjects } from "../redux/slices/subjectSlice";
import Loader from "../components/Loader";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { GoCheckCircleFill } from "react-icons/go";

const ModuleVideos = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { subjectId } = useParams();
    const { modules, loading, error, subjects } = useSelector((state) => state.subjects);

    useEffect(() => {
        if (subjectId) {
            dispatch(fetchModules(subjectId));
        }
    }, [dispatch, subjectId]);

    useEffect(() => {
        dispatch(fetchSubjects());
    }, [dispatch]);

    const selectedSubject = subjects.find((subject) => subject.id === Number(subjectId));

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#E8CBF9] to-white">
            {/* Back Button */}
            <div className="relative flex items-center justify-between py-4 px-5">
                <button className="text-black text-[28px]" onClick={() => navigate(-1)}>
                    <IoIosArrowBack />
                </button>
                <img src="/logoEye.png" alt="Logo" className="w-15 h-15 mx-auto" />
            </div>

            {/* Title Section */}
            <div className="flex flex-col items-center">
                <div className="px-6 w-full mb-6 mt-10 flex flex-col items-start md:items-center">
                    <h3 className="text-gray-500 font-semibold text-[15px]">Level I</h3>
                    <h2 className="text-[22px] ml-2 font-extrabold text-black">
                        {selectedSubject?.title || "Subject Name"}
                    </h2>
                </div>

                {/* Modules List */}
                <div className="flex flex-col px-6 mt-6 mb-20">
                    {modules.length > 0 ? (
                        modules.map((module, index) => (
                            <div
                                key={module.id}
                                className="flex items-center gap-4 cursor-pointer"
                                onClick={() => navigate(`/video/${subjectId}/${module.id}`)}
                            >
                                {/* Steps */}
                                <div className="flex flex-col items-center">
                                    <GoCheckCircleFill className="text-[#950CE0] text-[40px] border-[3px] border-[#E4B5F9] rounded-4xl" />
                                    {index !== modules.length - 1 && (
                                        <div className="w-[3px] flex-grow h-[45px] -mt-[1px] bg-purple-600"></div>
                                    )}
                                </div>
                                {/* Module Info */}
                                <div className="flex-1 -mt-[30px] px-2 rounded-lg flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <p className="text-xs text-gray-900">Step {index + 1}</p>
                                        <h4 className="text-[14px] font-extrabold">{module.title}</h4>
                                    </div>
                                    <IoIosArrowForward className="text-gray-500 text-[18px]" />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No modules available.</p>
                    )}
                </div>
                {/* Continue Button */}
                <div className="w-full px-6 py-2 bottom-0 left-0 fixed">
                    <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold text-[15px]">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModuleVideos;
