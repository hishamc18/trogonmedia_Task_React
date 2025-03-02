import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubjects } from "../redux/slices/subjectSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { IoIosArrowForward } from "react-icons/io";

const Subjects = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { subjects, loading, error } = useSelector((state) => state.subjects);

    useEffect(() => {
        dispatch(fetchSubjects());
    }, [dispatch]);

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div className="relative min-h-screen bg-[url('/subjectBg.png')] bg-cover h-full bg-fixed bg-center">
            {/* Page Title */}
            <div className="bg-[#771EAE] py-4 fixed top-0 left-0 w-full shadow-md z-10">
                <h2 className="text-white text-2xl font-semibold text-center">Subjects</h2>
            </div>

            <div className="pt-28 p-6">
                {/* Subjects List */}
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {subjects.map((subject) => (
                        <div
                            key={subject.id}
                            className="relative bg-[#F2DFFB] shadow-lg rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-100 flex items-center p-2"
                            onClick={() => navigate(`/modules/${subject.id}`)}
                        >
                            {/* Next Icon */}
                            <span className="absolute top-3 right-2 text-[13px] text-gray-600 hover:text-purple-700 transition-colors duration-200">
                                <IoIosArrowForward />
                            </span>

                            {/* Subject Image */}
                            <img
                                src={subject.image}
                                alt={subject.title}
                                className="h-[100px] object-cover rounded-md mr-4"
                            />

                            {/* Subject Details */}
                            <div className="flex-1">
                                <h3 className="text-[16px] font-bold text-purple-700">{subject.title}</h3>
                                <p className="text-black text-[13px] mt-1">{subject.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Subjects;
