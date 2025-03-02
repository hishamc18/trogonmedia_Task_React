import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Subjects from "./pages/Subjects";
import Modules from "./pages/Modules";
import Video from "./pages/Video";
import ModuleVideos from "./pages/ModuleVideos";

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Subjects />} />
                    <Route path="/modules/:subjectId" element={<Modules />} />
                    <Route path="/module-videos/:subjectId" element={<ModuleVideos />} />
                    <Route path="/video/:subjectId/:moduleId" element={<Video />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;