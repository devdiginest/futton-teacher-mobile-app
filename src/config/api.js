export default {
    homeSlider: "mobile/sliders",
    courseDetails: (courseId) => `courses/${courseId}`,
    courseComments: (courseId) => `course-comments/${courseId}`,
    couseComment: "course-comments",
    testQuizz: "tandq",
    studentList: (teacherId) => `fullliststudents/${teacherId}`,
    studentTests: (studentId) => `studenttests/${studentId}`,
    dailyReports: (teacherId) => `teachersreport/${teacherId}`,
    subjects: "subjects",
    addDailyReport: "dailyreports/adddailyreport",
    updateDailyReport: "dailyreports/updatedailyreport",
    updateLessons: "updatelessons",
    adminList: "admins",
    teacherStudentCourse: (teacherId, studentId) => `mobile/getcourses/${teacherId}/${studentId}`
}