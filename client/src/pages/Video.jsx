import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSubjects, fetchModules, fetchVideos } from "../redux/slices/subjectSlice";
import Loader from "../components/Loader";
import { MdFileDownload } from "react-icons/md";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";

const Video = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { subjectId, moduleId } = useParams();
    const { subjects, modules, videos, loading, error } = useSelector((state) => state.subjects);

    useEffect(() => {
        if (!subjects.length) dispatch(fetchSubjects());
    }, [dispatch, subjects.length]);

    useEffect(() => {
        if (subjectId && !modules.length) dispatch(fetchModules(subjectId));
    }, [dispatch, subjectId, modules.length]);

    useEffect(() => {
        if (moduleId) dispatch(fetchVideos(moduleId));
    }, [dispatch, moduleId]);

    // helper funtion to get vimeo
    const getVimeoId = (url) => {
        const match = url.match(/vimeo\.com\/(\d+)/);
        return match ? match[1] : null;
    };

    const selectedSubject = subjects.find((subject) => subject.id === Number(subjectId));
    const selectedModule = modules.find((module) => module.id === Number(moduleId));
    const selectedVideo = videos.find((video) => video.id === Number(moduleId));

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
    if (!selectedSubject) return <p className="text-gray-500 text-center">Subject not found.</p>;
    if (!selectedModule) return <p className="text-gray-500 text-center">Module not found.</p>;
    if (!selectedVideo) return <p className="text-gray-500 text-center">Video not found.</p>;

    return (
        <div>
            {/* Back Button */}
            <button
                className="flex items-center gap-2 text-gray-700 hover:text-black px-4 py-4"
                onClick={() => navigate(-1)}
            >
                <IoArrowBack className="text-2xl" />
            </button>

            {/* Video Player */}
            <div className="flex justify-center mb-2">
                {selectedVideo.video_type === "YouTube" ? (
                    <iframe
                        width="100%"
                        height="315"
                        className="shadow-lg"
                        src={selectedVideo.video_url.replace("watch?v=", "embed/")}
                        title={selectedModule.title}
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <iframe
                        src={`https://player.vimeo.com/video/${getVimeoId(selectedVideo.video_url)}`}
                        width="100%"
                        height="315"
                        className="rounded-lg shadow-lg"
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                        title={selectedModule.title}
                    />
                )}
            </div>

            <p className="text-[#9FBFD7] font-bold text-center text-[12px] mb-4">
                Unlock the next lesson by watching 75% of this video!
            </p>

            <div className="px-4">
                <h2 className="text-[15px] font-extrabold mb-2">{selectedModule.title}</h2>
                <p className="text-gray-600 text-[14px]">{selectedModule.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex px-2 gap-1 justify-center mt-4">
                <button
                    className="flex w-full items-center justify-center bg-white px-4 py-4 rounded-lg shadow-md shadow-gray-700/60 hover:bg-gray-300"
                    onClick={() => alert("Doubts? Feature coming soon!")}
                >
                    <MdFileDownload className="mr-1 text-xl" /> Download
                </button>
                <button
                    className="flex w-full items-center justify-center bg-white px-4 py-4 rounded-lg shadow-md shadow-gray-700/50 hover:bg-yellow-200"
                    onClick={() => alert("Doubts? Feature coming soon!")}
                >
                    <BsFillQuestionCircleFill className="mr-1 text-xl text-amber-400" /> Doubts
                </button>
            </div>
        </div>
    );
};

export default Video;
