import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Subjects from "./pages/Subjects";
import SubjectDetails from "./pages/SubjectDetails";
import Modules from "./pages/Modules";
import ModuleVideos from "./pages/ModuleVideos";
import Video from "./pages/Video";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Subjects />} />
                <Route path="/subject-details/:subjectId" element={<SubjectDetails />} />
                <Route path="/modules/:subjectId" element={<Modules />} />
                <Route path="/module-videos/:subjectId" element={<ModuleVideos />} />
                <Route path="/video/:subjectId/:moduleId" element={<Video />} />
            </Routes>
        </Router>
    );
};

export default App;
