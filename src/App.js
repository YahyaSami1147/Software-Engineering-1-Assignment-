import { useState, useMemo } from "react";

const COURSES = [
  { code: "SE3542", name: "Web Engineering", instructor: "Qazi Shuja Ud Din", room: "SE3542", days: ["Tue"], slots: ["12:30–13:10", "13:40–14:20"] },
  { code: "SE3541", name: "Web Engineering Lab", instructor: "Qazi Shuja Ud Din", room: "SE3541", days: ["Mon"], slots: ["08:00–08:40", "08:45–09:25", "09:30–10:10"] },
  { code: "SE3812", name: "Artificial Intelligence", instructor: "Dr. Aamer Nadeem", room: "SE3812", days: ["Mon"], slots: ["12:30–13:10", "13:40–14:20"] },
  { code: "SE3811", name: "Artificial Intelligence Lab", instructor: "Fareeha Ashraf", room: "SE3811", days: ["Tue"], slots: ["08:00–08:40", "08:45–09:25", "09:30–10:10"] },
  { code: "SE3343", name: "Automated Software Testing", instructor: "Syeda Hafsa Ali", room: "SE3343", days: ["Mon", "Wed"], slots: { Mon: ["14:25–15:05"], Wed: ["12:30–13:10", "13:40–14:20"] } },
  { code: "SE3572", name: "Software Construction and Development", instructor: "Nadia Ashfaq", room: "SE3572", days: ["Tue", "Thu"], slots: { Tue: ["14:25–15:05"], Thu: ["09:30–10:10", "12:30–13:10", "13:40–14:20", "14:25–15:05"] } },
  { code: "SE2723", name: "Software Engineering", instructor: "Dr. Rizwan Bin Faiz", room: "SE2723", days: ["Wed", "Fri"], slots: { Wed: ["09:30–10:10"], Fri: ["10:15–10:55", "11:00–11:40"] } },
  { code: "SE3612", name: "Software Quality Engineering", instructor: "Dr. Rizwan Bin Faiz", room: "SE3612", days: ["Fri"], slots: ["08:00–08:40", "08:45–09:25"] },
  { code: "SE3611", name: "Software Quality Engineering Lab", instructor: "Nadim Zia", room: "SE3611", days: ["Fri"], slots: ["11:45–12:25", "13:40–14:20", "14:25–15:05"] },
];

const ALL_COURSE_CODES = COURSES.map(c => c.code);

const TIMETABLE = {
  Mon: [
    { time: "08:00–08:40", instructor: "Qazi Shuja Ud Din", course: "Web Engineering Lab", code: "SE3541" },
    { time: "08:45–09:25", instructor: "Qazi Shuja Ud Din", course: "Web Engineering Lab", code: "SE3541" },
    { time: "09:30–10:10", instructor: "Qazi Shuja Ud Din", course: "Web Engineering Lab", code: "SE3541" },
    { time: "12:30–13:10", instructor: "Dr. Aamer Nadeem", course: "Artificial Intelligence", code: "SE3812" },
    { time: "13:40–14:20", instructor: "Dr. Aamer Nadeem", course: "Artificial Intelligence", code: "SE3812" },
    { time: "14:25–15:05", instructor: "Syeda Hafsa Ali", course: "Automated Software Testing", code: "SE3343" },
  ],
  Tue: [
    { time: "08:00–08:40", instructor: "Fareeha Ashraf", course: "Artificial Intelligence Lab", code: "SE3811" },
    { time: "08:45–09:25", instructor: "Fareeha Ashraf", course: "Artificial Intelligence Lab", code: "SE3811" },
    { time: "09:30–10:10", instructor: "Fareeha Ashraf", course: "Artificial Intelligence Lab", code: "SE3811" },
    { time: "12:30–13:10", instructor: "Qazi Shuja Ud Din", course: "Web Engineering", code: "SE3542" },
    { time: "13:40–14:20", instructor: "Qazi Shuja Ud Din", course: "Web Engineering", code: "SE3542" },
    { time: "14:25–15:05", instructor: "Nadia Ashfaq", course: "Software Construction and Development", code: "SE3572" },
  ],
  Wed: [
    { time: "09:30–10:10", instructor: "Dr. Rizwan Bin Faiz", course: "Software Engineering", code: "SE2723" },
    { time: "12:30–13:10", instructor: "Syeda Hafsa Ali", course: "Automated Software Testing", code: "SE3343" },
    { time: "13:40–14:20", instructor: "Syeda Hafsa Ali", course: "Automated Software Testing", code: "SE3343" },
  ],
  Thu: [
    { time: "09:30–10:10", instructor: "Nadia Ashfaq", course: "Software Construction and Development", code: "SE3572" },
    { time: "12:30–13:10", instructor: "Nadia Ashfaq", course: "Software Construction and Development", code: "SE3572" },
    { time: "13:40–14:20", instructor: "Nadia Ashfaq", course: "Software Construction and Development", code: "SE3572" },
    { time: "14:25–15:05", instructor: "Nadia Ashfaq", course: "Software Construction and Development", code: "SE3572" },
  ],
  Fri: [
    { time: "08:00–08:40", instructor: "Dr. Rizwan Bin Faiz", course: "Software Quality Engineering", code: "SE3612" },
    { time: "08:45–09:25", instructor: "Dr. Rizwan Bin Faiz", course: "Software Quality Engineering", code: "SE3612" },
    { time: "10:15–10:55", instructor: "Dr. Rizwan Bin Faiz", course: "Software Engineering", code: "SE2723" },
    { time: "11:00–11:40", instructor: "Dr. Rizwan Bin Faiz", course: "Software Engineering", code: "SE2723" },
    { time: "11:45–12:25", instructor: "Nadim Zia", course: "Software Quality Engineering Lab", code: "SE3611" },
    { time: "13:40–14:20", instructor: "Nadim Zia", course: "Software Quality Engineering Lab", code: "SE3611" },
    { time: "14:25–15:05", instructor: "Nadim Zia", course: "Software Quality Engineering Lab", code: "SE3611" },
  ],
};

const DAY_LABELS = { Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday" };
const DAY_ACCENTS = { Mon: "#6366f1", Tue: "#0ea5e9", Wed: "#10b981", Thu: "#f59e0b", Fri: "#ec4899" };

const getDayOfWeek = (dateStr) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date(dateStr + "T12:00:00").getDay()];
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #f7f5f2; }

  .edu-root {
    min-height: 100vh;
    background: #f7f5f2;
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
  }

  .header {
    background: #ffffff;
    border-bottom: 1px solid #ece9e3;
    padding: 0 48px;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 12px rgba(0,0,0,0.04);
  }
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1280px;
    margin: 0 auto;
    height: 68px;
  }
  .logo-area { display: flex; align-items: center; gap: 14px; }
  .logo-icon {
    width: 40px; height: 40px;
    background: #1a1a2e;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .logo-title {
    font-family: 'Lora', serif;
    font-size: 20px;
    font-weight: 700;
    color: #1a1a2e;
    letter-spacing: -0.3px;
  }
  .logo-sub { font-size: 11px; color: #9ca3af; font-weight: 400; margin-top: 1px; letter-spacing: 0.5px; }

  .nav { display: flex; gap: 2px; }
  .nav-btn {
    background: transparent;
    border: none;
    border-radius: 10px;
    padding: 8px 16px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    color: #6b7280;
    display: flex;
    align-items: center;
    gap: 7px;
    transition: all 0.18s ease;
  }
  .nav-btn:hover { background: #f3f0eb; color: #1a1a2e; }
  .nav-btn.active { background: #1a1a2e; color: #ffffff; font-weight: 600; }
  .nav-icon { font-size: 14px; }

  .page-wrap {
    max-width: 1280px;
    margin: 0 auto;
    padding: 44px 48px;
  }

  .page-header { margin-bottom: 36px; }
  .page-title {
    font-family: 'Lora', serif;
    font-size: 28px;
    font-weight: 700;
    color: #1a1a2e;
    letter-spacing: -0.5px;
    margin-bottom: 6px;
  }
  .page-sub { font-size: 14px; color: #9ca3af; font-weight: 400; }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
    margin-bottom: 36px;
  }
  .stat-card {
    background: #ffffff;
    border-radius: 18px;
    padding: 26px 24px;
    border: 1px solid #ece9e3;
    transition: box-shadow 0.2s;
  }
  .stat-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.07); }
  .stat-icon { font-size: 22px; margin-bottom: 14px; }
  .stat-value {
    font-family: 'Lora', serif;
    font-size: 32px;
    font-weight: 700;
    color: #1a1a2e;
    line-height: 1;
    margin-bottom: 6px;
  }
  .stat-label { font-size: 12px; color: #9ca3af; font-weight: 500; letter-spacing: 0.4px; text-transform: uppercase; }

  .card {
    background: #ffffff;
    border-radius: 18px;
    border: 1px solid #ece9e3;
    overflow: hidden;
  }
  .card-header {
    padding: 20px 28px;
    border-bottom: 1px solid #f3f0eb;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-title { font-size: 15px; font-weight: 600; color: #1a1a2e; }

  .table-wrap { overflow: hidden; }
  table { width: 100%; border-collapse: collapse; }
  thead tr { background: #faf9f7; }
  th {
    padding: 12px 28px;
    text-align: left;
    font-size: 10.5px;
    color: #9ca3af;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  td { padding: 16px 28px; }
  tbody tr { border-top: 1px solid #f3f0eb; transition: background 0.12s; }
  tbody tr:hover { background: #faf9f7; }

  .badge {
    display: inline-flex;
    align-items: center;
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 12.5px;
    font-weight: 600;
  }
  .badge-green { background: #ecfdf5; color: #059669; }
  .badge-amber { background: #fffbeb; color: #d97706; }
  .badge-red { background: #fef2f2; color: #dc2626; }
  .badge-gray { background: #f3f4f6; color: #6b7280; }

  .pill {
    background: #f3f0eb;
    color: #6b7280;
    border-radius: 7px;
    padding: 3px 10px;
    font-family: 'DM Mono', monospace;
    font-size: 11.5px;
  }

  .avatar {
    width: 40px; height: 40px;
    border-radius: 12px;
    background: #f3f0eb;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700;
    font-size: 14px;
    color: #6366f1;
    flex-shrink: 0;
  }

  .empty-state {
    padding: 72px 20px;
    text-align: center;
  }
  .empty-icon { font-size: 44px; margin-bottom: 16px; }
  .empty-title { font-family: 'Lora', serif; font-size: 20px; font-weight: 600; color: #1a1a2e; margin-bottom: 8px; }
  .empty-sub { font-size: 14px; color: #9ca3af; margin-bottom: 24px; }

  .btn-primary {
    background: #1a1a2e;
    color: #ffffff;
    border: none;
    border-radius: 11px;
    padding: 11px 24px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.18s;
  }
  .btn-primary:hover { background: #2d2d4e; transform: translateY(-1px); box-shadow: 0 4px 14px rgba(26,26,46,0.2); }

  .btn-success {
    background: #ecfdf5;
    color: #059669;
    border: 1.5px solid #6ee7b7;
    border-radius: 9px;
    padding: 8px 18px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.15s;
  }
  .btn-success.filled { background: #059669; color: #fff; border-color: #059669; }
  .btn-success:hover { background: #059669; color: #fff; border-color: #059669; }

  .btn-danger {
    background: #fef2f2;
    color: #dc2626;
    border: 1.5px solid #fca5a5;
    border-radius: 9px;
    padding: 8px 18px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.15s;
  }
  .btn-danger.filled { background: #dc2626; color: #fff; border-color: #dc2626; }
  .btn-danger:hover { background: #dc2626; color: #fff; border-color: #dc2626; }

  .btn-outline {
    background: transparent;
    color: #6366f1;
    border: 1.5px solid #c7d2fe;
    border-radius: 9px;
    padding: 7px 16px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.15s;
  }
  .btn-outline:hover { background: #eef2ff; }

  .form-section {
    background: #ffffff;
    border-radius: 18px;
    padding: 32px;
    border: 1px solid #ece9e3;
    margin-bottom: 28px;
  }
  .form-title { font-size: 15px; font-weight: 600; color: #1a1a2e; margin-bottom: 22px; display: flex; align-items: center; gap: 8px; }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 22px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-label { font-size: 11px; color: #9ca3af; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; }
  .form-input {
    background: #faf9f7;
    color: #1a1a2e;
    border: 1.5px solid #ece9e3;
    border-radius: 11px;
    padding: 11px 14px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.15s;
    width: 100%;
  }
  .form-input:focus { outline: none; border-color: #6366f1; background: #fff; }
  .form-input option { background: #fff; }

  .course-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
  .chip {
    background: #faf9f7;
    color: #6b7280;
    border: 1.5px solid #ece9e3;
    border-radius: 8px;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.15s;
  }
  .chip:hover { border-color: #6366f1; color: #6366f1; background: #eef2ff; }
  .chip.selected { background: #eef2ff; color: #6366f1; border-color: #6366f1; }

  .select-all-btn {
    background: transparent;
    color: #6366f1;
    border: none;
    padding: 0;
    cursor: pointer;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .toast {
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 9999;
    border-radius: 13px;
    padding: 14px 22px;
    font-weight: 600;
    font-size: 14px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.12);
    animation: slideIn 0.25s ease;
  }
  @keyframes slideIn { from { opacity:0; transform: translateX(20px); } to { opacity:1; transform: translateX(0); } }
  .toast-success { background: #1a1a2e; color: #ffffff; }
  .toast-error { background: #fef2f2; color: #dc2626; border: 1px solid #fca5a5; }

  .day-tabs { display: flex; gap: 8px; margin-bottom: 28px; }
  .day-tab {
    border-radius: 11px;
    padding: 9px 20px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 600;
    border: 1.5px solid #ece9e3;
    background: #ffffff;
    color: #6b7280;
    transition: all 0.18s;
  }
  .day-tab:hover { border-color: #1a1a2e; color: #1a1a2e; }
  .day-tab.active { background: #1a1a2e; color: #fff; border-color: #1a1a2e; }

  .mark-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 28px;
    transition: background 0.12s;
  }
  .mark-row:not(:first-child) { border-top: 1px solid #f3f0eb; }
  .mark-row:hover { background: #faf9f7; }

  .student-info { display: flex; align-items: center; gap: 14px; }
  .student-name { font-weight: 600; font-size: 14.5px; color: #1a1a2e; }
  .student-id { font-size: 12px; color: #9ca3af; font-family: monospace; margin-top: 2px; }

  .status-btns { display: flex; gap: 8px; }

  .bar-wrap { display: flex; align-items: center; gap: 10px; }
  .bar-bg { background: #f3f0eb; border-radius: 99px; height: 6px; width: 90px; overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 99px; transition: width 0.5s ease; }
  .bar-pct { font-size: 12px; color: #9ca3af; min-width: 32px; }

  .session-dots { display: flex; flex-wrap: wrap; gap: 5px; }
  .dot {
    width: 26px; height: 26px;
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px;
    cursor: pointer;
    transition: transform 0.1s;
    border: 1.5px solid transparent;
  }
  .dot:hover { transform: scale(1.15); }
  .dot-present { background: #ecfdf5; color: #059669; border-color: #6ee7b7; }
  .dot-absent { background: #fef2f2; color: #dc2626; border-color: #fca5a5; }
  .dot-none { background: #f3f0eb; color: #d1d5db; border-color: #e5e7eb; }

  .report-student-card {
    background: #ffffff;
    border-radius: 18px;
    border: 1px solid #ece9e3;
    padding: 26px 28px;
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 24px;
  }
  .report-avatar {
    width: 58px; height: 58px;
    border-radius: 16px;
    background: #eef2ff;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 22px; color: #6366f1;
    flex-shrink: 0;
  }

  .course-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 18px; }
  .course-card {
    background: #ffffff;
    border-radius: 18px;
    border: 1px solid #ece9e3;
    overflow: hidden;
    transition: box-shadow 0.2s;
  }
  .course-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.07); }
  .course-card-head { padding: 20px 22px; border-bottom: 1px solid #f3f0eb; }
  .course-card-name { font-weight: 700; font-size: 14.5px; color: #1a1a2e; margin-bottom: 3px; }
  .course-card-meta { font-size: 12px; color: #9ca3af; }
  .course-card-body { padding: 16px 22px; }
  .course-card-warn {
    padding: 10px 22px;
    background: #fff7ed;
    color: #c2410c;
    font-size: 12.5px;
    font-weight: 600;
    border-top: 1px solid #fed7aa;
  }

  .student-selector { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
  .student-pill {
    border-radius: 10px;
    padding: 8px 18px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    border: 1.5px solid #ece9e3;
    background: #ffffff;
    color: #6b7280;
    transition: all 0.15s;
  }
  .student-pill:hover { border-color: #1a1a2e; color: #1a1a2e; }
  .student-pill.active { background: #1a1a2e; color: #fff; border-color: #1a1a2e; font-weight: 600; }

  .mark-banner {
    padding: 10px 14px;
    border-radius: 10px;
    background: #fffbeb;
    border: 1px solid #fde68a;
    color: #92400e;
    font-size: 12.5px;
    font-weight: 500;
    margin-bottom: 16px;
  }

  .divider { height: 1px; background: #f3f0eb; margin: 2px 0; }
`;

export default function App() {
  const [attendance, setAttendance] = useState({});
  const [students, setStudents] = useState([]);
  const [view, setView] = useState("dashboard");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [markDate, setMarkDate] = useState(new Date().toISOString().split("T")[0]);
  const [newStudent, setNewStudent] = useState({ id: "", name: "", courses: [] });
  const [toast, setToast] = useState(null);
  const [timetableDay, setTimetableDay] = useState("Mon");

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const getCourseDates = (courseCode) => {
    const course = COURSES.find(c => c.code === courseCode);
    if (!course) return [];
    const dates = [];
    const today = new Date();
    for (let i = 60; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const day = getDayOfWeek(d.toISOString().split("T")[0]);
      if (course.days.includes(day)) dates.push(d.toISOString().split("T")[0]);
    }
    return dates;
  };

  const getAttendanceStats = (studentId, courseCode) => {
    const dates = getCourseDates(courseCode);
    const present = dates.filter(d => attendance[`${studentId}-${courseCode}-${d}`] === "present").length;
    const absent = dates.filter(d => attendance[`${studentId}-${courseCode}-${d}`] === "absent").length;
    const marked = present + absent;
    return { total: dates.length, present, absent, marked, percent: marked ? Math.round((present / marked) * 100) : 0 };
  };

  const toggleAttendance = (studentId, courseCode, date) => {
    const key = `${studentId}-${courseCode}-${date}`;
    setAttendance(prev => ({ ...prev, [key]: prev[key] === "present" ? "absent" : prev[key] === "absent" ? undefined : "present" }));
  };

  const setStatus = (studentId, courseCode, date, status) => {
    const key = `${studentId}-${courseCode}-${date}`;
    setAttendance(prev => ({ ...prev, [key]: status }));
  };

  const markAllForDate = (courseCode, date, status) => {
    const updates = {};
    students.filter(s => s.enrolled.includes(courseCode)).forEach(s => {
      updates[`${s.id}-${courseCode}-${date}`] = status;
    });
    setAttendance(prev => ({ ...prev, ...updates }));
    showToast(`All students marked as ${status}`);
  };

  const addStudent = () => {
    if (!newStudent.id.trim() || !newStudent.name.trim() || newStudent.courses.length === 0) {
      showToast("Fill all fields and select at least one course", "error"); return;
    }
    if (students.find(s => s.id === newStudent.id.trim())) {
      showToast("Student ID already exists", "error"); return;
    }
    setStudents(prev => [...prev, { id: newStudent.id.trim(), name: newStudent.name.trim(), enrolled: newStudent.courses }]);
    setNewStudent({ id: "", name: "", courses: [] });
    showToast(`"${newStudent.name}" added successfully`);
  };

  const overallStats = useMemo(() => students.map(s => {
    const allStats = s.enrolled.map(c => getAttendanceStats(s.id, c));
    const totalMarked = allStats.reduce((a, b) => a + b.marked, 0);
    const totalPresent = allStats.reduce((a, b) => a + b.present, 0);
    return { ...s, totalPresent, totalMarked, percent: totalMarked ? Math.round((totalPresent / totalMarked) * 100) : null };
  }), [attendance, students]);

  const PercentBadge = ({ pct }) => {
    if (pct === null) return <span className="badge badge-gray">No data</span>;
    if (pct >= 75) return <span className="badge badge-green">{pct}%</span>;
    if (pct >= 50) return <span className="badge badge-amber">{pct}%</span>;
    return <span className="badge badge-red">{pct}%</span>;
  };

  const MiniBar = ({ pct, total }) => {
    if (total === 0) return <span style={{ fontSize: 12, color: "#9ca3af" }}>Not started</span>;
    const color = pct >= 75 ? "#059669" : pct >= 50 ? "#d97706" : "#dc2626";
    return (
      <div className="bar-wrap">
        <div className="bar-bg">
          <div className="bar-fill" style={{ width: `${pct}%`, background: color }} />
        </div>
        <span className="bar-pct">{pct}%</span>
      </div>
    );
  };

  const initials = (name) => name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      <style>{styles}</style>
      <div className="edu-root">
        {toast && (
          <div className={`toast ${toast.type === "error" ? "toast-error" : "toast-success"}`}>
            {toast.type === "error" ? "⚠️ " : "✓ "}{toast.msg}
          </div>
        )}

        {/* Header */}
        <header className="header">
          <div className="header-inner">
            <div className="logo-area">
              <div className="logo-icon">🎓</div>
              <div>
                <div className="logo-title">Assignment 1</div>
                <div className="logo-sub">Attendance Management</div>
              </div>
            </div>
            <nav className="nav">
              {[
                { id: "dashboard", label: "Dashboard", icon: "◈" },
                { id: "mark", label: "Mark", icon: "✓" },
                { id: "report", label: "Reports", icon: "≡" },
                { id: "students", label: "Students", icon: "⊙" },
                { id: "timetable", label: "Timetable", icon: "▦" },
              ].map(n => (
                <button key={n.id} className={`nav-btn ${view === n.id ? "active" : ""}`} onClick={() => setView(n.id)}>
                  <span className="nav-icon">{n.icon}</span> {n.label}
                </button>
              ))}
            </nav>
          </div>
        </header>

        <div className="page-wrap">

          {/* ── DASHBOARD ── */}
          {view === "dashboard" && (
            <div>
              <div className="page-header">
                <div className="page-title">Overview</div>
                <div className="page-sub">Real-time attendance across all courses</div>
              </div>

              <div className="stats-grid">
                {[
                  { label: "Total Students", value: students.length, icon: "👥" },
                  { label: "Total Courses", value: COURSES.length, icon: "📚" },
                  {
                    label: "Avg Attendance",
                    value: overallStats.filter(s => s.percent !== null).length
                      ? `${Math.round(overallStats.filter(s => s.percent !== null).reduce((a, b) => a + b.percent, 0) / overallStats.filter(s => s.percent !== null).length)}%`
                      : "—",
                    icon: "📈"
                  },
                  { label: "At Risk (< 75%)", value: overallStats.filter(s => s.percent !== null && s.percent < 75).length, icon: "⚠️" },
                ].map(card => (
                  <div key={card.label} className="stat-card">
                    <div className="stat-icon">{card.icon}</div>
                    <div className="stat-value">{card.value}</div>
                    <div className="stat-label">{card.label}</div>
                  </div>
                ))}
              </div>

              {students.length === 0 ? (
                <div className="card">
                  <div className="empty-state">
                    <div className="empty-icon">👥</div>
                    <div className="empty-title">No students yet</div>
                    <div className="empty-sub">Head to the Students tab to register your first student.</div>
                    <button className="btn-primary" onClick={() => setView("students")}>+ Add Students</button>
                  </div>
                </div>
              ) : (
                <div className="card table-wrap">
                  <div className="card-header">
                    <div className="card-title">All Students</div>
                    <span style={{ fontSize: 13, color: "#9ca3af" }}>{students.length} registered</span>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        {["Student", "Courses", "Present", "Marked", "Attendance", "Status"].map(h => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {overallStats.map(s => (
                        <tr key={s.id} style={{ cursor: "pointer" }} onClick={() => { setSelectedStudent(s.id); setView("report"); }}>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <div className="avatar">{initials(s.name)}</div>
                              <div>
                                <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                                <div style={{ fontSize: 12, color: "#9ca3af", fontFamily: "monospace" }}>{s.id}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ color: "#9ca3af", fontSize: 13 }}>{s.enrolled.length} courses</td>
                          <td style={{ color: "#059669", fontWeight: 600 }}>{s.totalPresent}</td>
                          <td style={{ color: "#6b7280" }}>{s.totalMarked}</td>
                          <td><PercentBadge pct={s.percent} /></td>
                          <td style={{ fontSize: 13, color: "#6b7280" }}>
                            {s.percent === null ? "⏳ Pending" : s.percent >= 75 ? "✅ Good" : s.percent >= 50 ? "⚠️ Warning" : "❌ Critical"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── MARK ATTENDANCE ── */}
          {view === "mark" && (
            <div>
              <div className="page-header">
                <div className="page-title">Mark Attendance</div>
                <div className="page-sub">Select a course and date to record attendance</div>
              </div>

              {students.length === 0 ? (
                <div className="card">
                  <div className="empty-state">
                    <div className="empty-icon">👥</div>
                    <div className="empty-title">No students added yet</div>
                    <div className="empty-sub">Register students before marking attendance.</div>
                    <button className="btn-primary" onClick={() => setView("students")}>Go to Students</button>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", gap: 18, marginBottom: 28, flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 220 }}>
                      <div className="form-label" style={{ marginBottom: 8 }}>Course</div>
                      <select className="form-input" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
                        <option value="">— Select a course —</option>
                        {COURSES.map(c => <option key={c.code} value={c.code}>{c.code} · {c.name}</option>)}
                      </select>
                    </div>
                    <div style={{ flex: "0 0 200px" }}>
                      <div className="form-label" style={{ marginBottom: 8 }}>Date</div>
                      <input type="date" className="form-input" value={markDate} onChange={e => setMarkDate(e.target.value)} />
                    </div>
                  </div>

                  {selectedCourse && markDate && (() => {
                    const course = COURSES.find(c => c.code === selectedCourse);
                    const day = getDayOfWeek(markDate);
                    const isClassDay = course.days.includes(day);
                    const enrolledStudents = students.filter(s => s.enrolled.includes(selectedCourse));
                    const presentCount = enrolledStudents.filter(s => attendance[`${s.id}-${selectedCourse}-${markDate}`] === "present").length;
                    const absentCount = enrolledStudents.filter(s => attendance[`${s.id}-${selectedCourse}-${markDate}`] === "absent").length;

                    return (
                      <div className="card">
                        <div className="card-header">
                          <div>
                            <div className="card-title">{course.name}</div>
                            <div style={{ fontSize: 12.5, color: "#9ca3af", marginTop: 3 }}>
                              Room {course.room} · {course.instructor}
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            {!isClassDay && (
                              <div className="mark-banner" style={{ margin: 0 }}>
                                ⚠️ No class scheduled on {day}
                              </div>
                            )}
                            <span style={{ fontSize: 13, color: "#9ca3af" }}>✅ {presentCount}  ❌ {absentCount}</span>
                            <button className="btn-success" onClick={() => markAllForDate(selectedCourse, markDate, "present")}>All Present</button>
                            <button className="btn-danger" onClick={() => markAllForDate(selectedCourse, markDate, "absent")}>All Absent</button>
                          </div>
                        </div>

                        {enrolledStudents.length === 0 ? (
                          <div style={{ padding: "48px 28px", textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
                            No students enrolled in this course yet.
                          </div>
                        ) : (
                          enrolledStudents.map((s, i) => {
                            const key = `${s.id}-${selectedCourse}-${markDate}`;
                            const status = attendance[key];
                            return (
                              <div key={s.id} className="mark-row"
                                style={{ background: status === "present" ? "#f0fdf4" : status === "absent" ? "#fff5f5" : "transparent" }}>
                                <div className="student-info">
                                  <div className="avatar">{initials(s.name)}</div>
                                  <div>
                                    <div className="student-name">{s.name}</div>
                                    <div className="student-id">{s.id}</div>
                                  </div>
                                </div>
                                <div className="status-btns">
                                  <button
                                    className={`btn-success ${status === "present" ? "filled" : ""}`}
                                    onClick={() => setStatus(s.id, selectedCourse, markDate, "present")}>
                                    ✓ Present
                                  </button>
                                  <button
                                    className={`btn-danger ${status === "absent" ? "filled" : ""}`}
                                    onClick={() => setStatus(s.id, selectedCourse, markDate, "absent")}>
                                    ✗ Absent
                                  </button>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          )}

          {/* ── REPORTS ── */}
          {view === "report" && (
            <div>
              <div className="page-header">
                <div className="page-title">Attendance Reports</div>
                <div className="page-sub">Per-student breakdown across all courses</div>
              </div>

              {students.length === 0 ? (
                <div className="card">
                  <div className="empty-state">
                    <div className="empty-icon">📋</div>
                    <div className="empty-title">No data yet</div>
                    <div className="empty-sub">Add students and mark attendance to see reports.</div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="student-selector">
                    {students.map(s => (
                      <button key={s.id} className={`student-pill ${selectedStudent === s.id ? "active" : ""}`}
                        onClick={() => setSelectedStudent(selectedStudent === s.id ? null : s.id)}>
                        {s.name}
                      </button>
                    ))}
                  </div>

                  {selectedStudent && (() => {
                    const student = students.find(s => s.id === selectedStudent);
                    const stats = overallStats.find(s => s.id === selectedStudent);
                    return (
                      <div>
                        <div className="report-student-card">
                          <div className="report-avatar">{initials(student.name)}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: "'Lora', serif", fontSize: 20, fontWeight: 700, color: "#1a1a2e", marginBottom: 4 }}>{student.name}</div>
                            <div style={{ color: "#9ca3af", fontFamily: "monospace", fontSize: 13 }}>{student.id}</div>
                            <div style={{ color: "#9ca3af", fontSize: 13, marginTop: 2 }}>{student.enrolled.length} courses enrolled</div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <PercentBadge pct={stats.percent} />
                            <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>{stats.totalPresent} present of {stats.totalMarked} marked</div>
                          </div>
                        </div>

                        <div className="course-cards">
                          {student.enrolled.map(code => {
                            const course = COURSES.find(c => c.code === code);
                            const s = getAttendanceStats(student.id, code);
                            const recentDates = getCourseDates(code).slice(-20);
                            return (
                              <div key={code} className="course-card">
                                <div className="course-card-head">
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                                    <div>
                                      <div className="course-card-name">{course.name}</div>
                                      <div className="course-card-meta">{code} · {course.instructor}</div>
                                    </div>
                                    <PercentBadge pct={s.marked ? s.percent : null} />
                                  </div>
                                  <MiniBar pct={s.percent} total={s.marked} />
                                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>
                                    {s.present} present · {s.absent} absent · {s.marked} total
                                  </div>
                                </div>
                                <div className="course-card-body">
                                  <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>
                                    Last 20 sessions
                                  </div>
                                  <div className="session-dots">
                                    {recentDates.map(date => {
                                      const status = attendance[`${student.id}-${code}-${date}`];
                                      return (
                                        <div key={date}
                                          className={`dot ${status === "present" ? "dot-present" : status === "absent" ? "dot-absent" : "dot-none"}`}
                                          title={`${date}: ${status || "not marked"}`}
                                          onClick={() => toggleAttendance(student.id, code, date)}>
                                          {status === "present" ? "✓" : status === "absent" ? "✗" : "·"}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                                {s.marked > 0 && s.percent < 75 && (
                                  <div className="course-card-warn">⚠️ Attendance below 75% threshold</div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          )}

          {/* ── STUDENTS ── */}
          {view === "students" && (
            <div>
              <div className="page-header">
                <div className="page-title">Student Management</div>
                <div className="page-sub">Register students and assign course enrollments</div>
              </div>

              <div className="form-section">
                <div className="form-title">➕ Register New Student</div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Student ID</label>
                    <input className="form-input" placeholder="e.g. 2022-SE-001" value={newStudent.id}
                      onChange={e => setNewStudent(p => ({ ...p, id: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input className="form-input" placeholder="e.g. Ali Hassan" value={newStudent.name}
                      onChange={e => setNewStudent(p => ({ ...p, name: e.target.value }))} />
                  </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <label className="form-label">Enroll in Courses</label>
                    <button className="select-all-btn" onClick={() => setNewStudent(p => ({ ...p, courses: ALL_COURSE_CODES }))}>
                      Select all
                    </button>
                  </div>
                  <div className="course-chips">
                    {COURSES.map(c => {
                      const sel = newStudent.courses.includes(c.code);
                      return (
                        <button key={c.code} className={`chip ${sel ? "selected" : ""}`}
                          onClick={() => setNewStudent(p => ({ ...p, courses: sel ? p.courses.filter(x => x !== c.code) : [...p.courses, c.code] }))}>
                          {c.code}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <button className="btn-primary" onClick={addStudent}>+ Register Student</button>
              </div>

              {students.length === 0 ? (
                <div className="card">
                  <div style={{ padding: "48px 28px", textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
                    No students registered yet. Use the form above to get started.
                  </div>
                </div>
              ) : (
                <div className="card table-wrap">
                  <div className="card-header">
                    <div className="card-title">Registered Students</div>
                    <span style={{ fontSize: 13, color: "#9ca3af" }}>{students.length} total</span>
                  </div>
                  {students.map((s, i) => (
                    <div key={s.id} style={{ padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: i > 0 ? "1px solid #f3f0eb" : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div className="avatar">{initials(s.name)}</div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14.5, color: "#1a1a2e" }}>{s.name}</div>
                          <div style={{ fontSize: 12, color: "#9ca3af", fontFamily: "monospace", marginTop: 2 }}>{s.id} · {s.enrolled.length} courses</div>
                        </div>
                      </div>
                      <button className="btn-outline" onClick={() => { setSelectedStudent(s.id); setView("report"); }}>
                        View Report →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── TIMETABLE ── */}
          {view === "timetable" && (
            <div>
              <div className="page-header">
                <div className="page-title">Weekly Timetable</div>
                <div className="page-sub">SE Department — Current Semester Schedule</div>
              </div>

              <div className="day-tabs">
                {Object.keys(TIMETABLE).map(day => (
                  <button key={day} className={`day-tab ${timetableDay === day ? "active" : ""}`}
                    onClick={() => setTimetableDay(day)}>
                    {DAY_LABELS[day]}
                  </button>
                ))}
              </div>

              <div className="card table-wrap">
                <div className="card-header" style={{ borderLeft: `4px solid ${DAY_ACCENTS[timetableDay]}` }}>
                  <div>
                    <div className="card-title" style={{ color: DAY_ACCENTS[timetableDay] }}>{DAY_LABELS[timetableDay]}</div>
                    <div style={{ fontSize: 12.5, color: "#9ca3af", marginTop: 2 }}>{TIMETABLE[timetableDay].length} periods scheduled</div>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      {["Time", "Instructor", "Course", "Code"].map(h => <th key={h}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {TIMETABLE[timetableDay].map((row, i) => (
                      <tr key={i}>
                        <td style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 13, color: DAY_ACCENTS[timetableDay] }}>{row.time}</td>
                        <td style={{ fontSize: 14, color: "#374151" }}>{row.instructor}</td>
                        <td style={{ fontWeight: 600, fontSize: 14, color: "#1a1a2e" }}>{row.course}</td>
                        <td><span className="pill">{row.code}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}