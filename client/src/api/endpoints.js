const BASE_URL = "https://trogon.info/interview/php/api";

export const ENDPOINTS = {
  SUBJECTS: `${BASE_URL}/subjects.php`,
  MODULES: (subjectId) => `${BASE_URL}/modules.php?subject_id=${subjectId}`,
  VIDEOS: (moduleId) => `${BASE_URL}/videos.php?module_id=${moduleId}`,
};
