import { useState, useMemo } from "react";

const COURSES = [
  { code: "SE3542", name: "Web Engineering", instructor: "Qazi Shuja Ud Din", room: "SE3542", days: ["Tue"], slots: ["12:30–13:10", "13:40–14:20"], creditHours: 2 },
  { code: "SE3541", name: "Web Engineering Lab", instructor: "Qazi Shuja Ud Din", room: "SE3541", days: ["Mon"], slots: ["08:00–08:40", "08:45–09:25", "09:30–10:10"], creditHours: 1 },
  { code: "SE3812", name: "Artificial Intelligence", instructor: "Dr. Aamer Nadeem", room: "SE3812", days: ["Mon"], slots: ["12:30–13:10", "13:40–14:20"], creditHours: 2 },
  { code: "SE3811", name: "Artificial Intelligence Lab", instructor: "Fareeha Ashraf", room: "SE3811", days: ["Tue"], slots: ["08:00–08:40", "08:45–09:25", "09:30–10:10"], creditHours: 1 },
  { code: "SE3343", name: "Automated Software Testing", instructor: "Syeda Hafsa Ali", room: "SE3343", days: ["Mon", "Wed"], slots: { Mon: ["14:25–15:05"], Wed: ["12:30–13:10", "13:40–14:20"] }, creditHours: 3 },
  { code: "SE3572", name: "Software Construction and Development", instructor: "Nadia Ashfaq", room: "SE3572", days: ["Tue", "Thu"], slots: { Tue: ["14:25–15:05"], Thu: ["09:30–10:10", "12:30–13:10", "13:40–14:20", "14:25–15:05"] }, creditHours: 2 },
  { code: "SE3571", name: "Software Construction and Development Lab", instructor: "Nadia Ashfaq", room: "SE3572", days: ["Tue", "Thu"], slots: { Thu: ["12:30–13:10", "13:40–14:20", "14:25–15:05"] }, creditHours: 1 },
  { code: "SE2723", name: "Software Engineering", instructor: "Dr. Rizwan Bin Faiz", room: "SE2723", days: ["Wed", "Fri"], slots: { Wed: ["09:30–10:10"], Fri: ["10:15–10:55", "11:00–11:40"] }, creditHours: 3 },
  { code: "SE3612", name: "Software Quality Engineering", instructor: "Dr. Rizwan Bin Faiz", room: "SE3612", days: ["Fri"], slots: ["08:00–08:40", "08:45–09:25"], creditHours: 2 },
  { code: "SE3611", name: "Software Quality Engineering Lab", instructor: "Nadim Zia", room: "SE3611", days: ["Fri"], slots: ["11:45–12:25", "13:40–14:20", "14:25–15:05"], creditHours: 1 },
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
    { time: "12:30–13:10", instructor: "Nadia Ashfaq", course: "Software Construction and Development Lab", code: "SE3571" },
    { time: "13:40–14:20", instructor: "Nadia Ashfaq", course: "Software Construction and Development Lab", code: "SE3571" },
    { time: "14:25–15:05", instructor: "Nadia Ashfaq", course: "Software Construction and Development Lab", code: "SE3571" },
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

const GRADE_SCALE = [
  { letter: "A+", minScore: 95, points: 4.0 },
  { letter: "A", minScore: 90, points: 4.0 },
  { letter: "A-", minScore: 85, points: 3.7 },
  { letter: "B+", minScore: 80, points: 3.3 },
  { letter: "B", minScore: 75, points: 3.0 },
  { letter: "B-", minScore: 70, points: 2.7 },
  { letter: "C+", minScore: 65, points: 2.3 },
  { letter: "C", minScore: 60, points: 2.0 },
  { letter: "C-", minScore: 55, points: 1.7 },
  { letter: "D+", minScore: 50, points: 1.3 },
  { letter: "D", minScore: 45, points: 1.0 },
  { letter: "F", minScore: 0, points: 0.0 },
];

const scoreToGrade = (score) => {
  if (score === null || score === undefined || score === "") return null;
  const s = parseFloat(score);
  if (isNaN(s)) return null;
  return GRADE_SCALE.find(g => s >= g.minScore) || GRADE_SCALE[GRADE_SCALE.length - 1];
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
  td { padding: 14px 28px; }
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
  .badge-blue { background: #eff6ff; color: #2563eb; }
  .badge-purple { background: #f5f3ff; color: #7c3aed; }
  .pill {
    background: #f3f0eb;
    color: #6b7280;
    border-radius: 7px;
    padding: 3px 10px;
    font-family: 'DM Mono', monospace;
    font-size: 11.5px;
  }
  .cr-pill {
    background: #f0fdf4;
    color: #059669;
    border: 1px solid #bbf7d0;
    border-radius: 6px;
    padding: 2px 8px;
    font-size: 11px;
    font-weight: 700;
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
  .course-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 18px; }
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
  .gpa-banner {
    background: linear-gradient(135deg, #1a1a2e 0%, #2d2d4e 100%);
    border-radius: 20px;
    padding: 28px 32px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 32px;
    color: #fff;
  }
  .gpa-main {
    flex-shrink: 0;
    text-align: center;
    background: rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 20px 28px;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .gpa-number {
    font-family: 'Lora', serif;
    font-size: 48px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 4px;
  }
  .gpa-label { font-size: 11px; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
  .gpa-details { flex: 1; display: flex; flex-direction: column; gap: 12px; }
  .gpa-row { display: flex; justify-content: space-between; align-items: center; }
  .gpa-row-label { font-size: 13px; opacity: 0.7; }
  .gpa-row-val { font-size: 14px; font-weight: 700; }
  .grade-input-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .grade-input {
    width: 100px;
    background: #faf9f7;
    color: #1a1a2e;
    border: 1.5px solid #ece9e3;
    border-radius: 9px;
    padding: 11px 14px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    text-align: center;
    transition: border-color 0.15s;
  }
  .grade-input:focus { outline: none; border-color: #6366f1; background: #fff; }
  .grade-letter-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px; height: 28px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: -0.5px;
  }
  .grade-A { background: #ecfdf5; color: #059669; }
  .grade-B { background: #eff6ff; color: #2563eb; }
  .grade-C { background: #fffbeb; color: #d97706; }
  .grade-D { background: #fff7ed; color: #ea580c; }
  .grade-F { background: #fef2f2; color: #dc2626; }
  .grade-points-badge {
    font-size: 12px;
    color: #9ca3af;
    font-weight: 600;
    min-width: 30px;
    text-align: center;
  }
  .cr-tag {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    background: #f0fdf4;
    color: #059669;
    border: 1px solid #bbf7d0;
    border-radius: 7px;
    padding: 3px 9px;
    font-size: 11.5px;
    font-weight: 700;
  }
  .gpa-course-row {
    display: grid;
    grid-template-columns: 1fr auto auto auto auto;
    align-items: center;
    gap: 16px;
    padding: 14px 22px;
    border-bottom: 1px solid #f3f0eb;
  }
  .gpa-course-row:last-child { border-bottom: none; }
  .gpa-course-row:hover { background: #faf9f7; }
  .gpa-summary-table {
    background: #ffffff;
    border-radius: 18px;
    border: 1px solid #ece9e3;
    overflow: hidden;
    margin-bottom: 24px;
  }
  .gpa-summary-header {
    padding: 18px 22px;
    border-bottom: 1px solid #f3f0eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .grade-scale-section {
    background: #ffffff;
    border-radius: 18px;
    border: 1px solid #ece9e3;
    padding: 24px 28px;
    margin-bottom: 28px;
  }
  .grade-scale-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    margin-top: 16px;
  }
  .grade-scale-item {
    background: #faf9f7;
    border-radius: 12px;
    padding: 12px;
    text-align: center;
    border: 1px solid #ece9e3;
  }
  .grade-scale-letter { font-size: 18px; font-weight: 800; color: #1a1a2e; margin-bottom: 2px; }
  .grade-scale-range { font-size: 11px; color: #9ca3af; margin-bottom: 2px; }
  .grade-scale-pts { font-size: 12px; font-weight: 700; color: #6366f1; }
  .divider { height: 1px; background: #f3f0eb; margin: 2px 0; }
  .mode-toggle {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }
  .toggle-btn {
    background: #f3f0eb;
    color: #6b7280;
    border: 1.5px solid #ece9e3;
    border-radius: 9px;
    padding: 7px 16px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.15s;
  }
  .toggle-btn.active { background: #6366f1; color: #fff; border-color: #6366f1; }
  .toggle-btn:hover { border-color: #6366f1; color: #6366f1; }
  .grade-letters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(45px, 1fr));
    gap: 8px;
    margin-bottom: 16px;
  }
  .grade-btn {
    background: #f3f0eb;
    color: #6b7280;
    border: 1.5px solid #ece9e3;
    border-radius: 9px;
    padding: 10px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 700;
    transition: all 0.15s;
    text-align: center;
  }
  .grade-btn:hover { border-color: #6366f1; }
  .grade-btn.selected { background: #6366f1; color: #fff; border-color: #6366f1; }
  .course-classes {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
  }
  .class-card {
    background: #faf9f7;
    border: 1.5px solid #ece9e3;
    border-radius: 11px;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.15s;
    cursor: pointer;
  }
  .class-card:hover { border-color: #6366f1; background: #f3f0eb; }
  .class-card.selected { background: #eef2ff; border-color: #6366f1; }
  .class-info { display: flex; flex-direction: column; gap: 2px; }
  .class-name { font-weight: 600; font-size: 13px; color: #1a1a2e; }
  .class-time { font-size: 11.5px; color: #9ca3af; }
  .class-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: #faf9f7;
    border: 1.5px solid #ece9e3;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.18s;
    margin-bottom: 12px;
  }
  .class-tag:hover { border-color: #6366f1; background: #f3f0eb; }
  .class-tag.active { background: #eef2ff; border-color: #6366f1; }
  .class-tag-content { flex: 1; }
  .class-tag-title { font-weight: 600; font-size: 14px; color: #1a1a2e; margin-bottom: 2px; }
  .class-tag-meta { font-size: 12px; color: #9ca3af; }
  .class-tag-arrow { font-size: 18px; transition: transform 0.2s; }
  .class-tag.active .class-tag-arrow { transform: rotate(90deg); }
  .collapsible-section { margin-bottom: 24px; }
  .collapsible-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }
  .collapsible-content.open {
    max-height: 2000px;
  }
`;

export default function App() {
  const [attendance, setAttendance] = useState({});
  const [grades, setGrades] = useState({});
  const [gradeMode, setGradeMode] = useState("score");
  const [gradeLetters, setGradeLetters] = useState({});
  const [students, setStudents] = useState([
    { id: "BSE233096", name: "Zia Ur Rehman", enrolled: ALL_COURSE_CODES },
    { id: "BSE233080", name: "Anna Zainab", enrolled: ALL_COURSE_CODES },
    { id: "BSE233118", name: "Wajeeha Naeem", enrolled: ALL_COURSE_CODES },
    { id: "BSE233117", name: "Saad Imran", enrolled: ALL_COURSE_CODES },
    { id: "BSE233094", name: "Mansoor Ur Rehman", enrolled: ALL_COURSE_CODES },
    { id: "BSE233113", name: "Maheen Gul", enrolled: ALL_COURSE_CODES },
    { id: "BSE233114", name: "Yahya Sami", enrolled: ALL_COURSE_CODES },
    { id: "BSE233154", name: "Hijaab Sagheer", enrolled: ALL_COURSE_CODES },
    { id: "BSE233222", name: "Abdul Hadi", enrolled: ALL_COURSE_CODES },
    { id: "BSE233218", name: "Afeefa Khalid", enrolled: ALL_COURSE_CODES },
    { id: "BSE233031", name: "Maryam Fraz", enrolled: ALL_COURSE_CODES },
  ]);
  const [view, setView] = useState("dashboard");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [markDate, setMarkDate] = useState(new Date().toISOString().split("T")[0]);
  const [newStudent, setNewStudent] = useState({ id: "", name: "", courses: [] });
  const [toast, setToast] = useState(null);
  const [timetableDay, setTimetableDay] = useState("Mon");
  const [expandedClass, setExpandedClass] = useState(null);

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

  const setGradeScore = (studentId, courseCode, score) => {
    const key = `${studentId}-${courseCode}`;
    setGrades(prev => ({ ...prev, [key]: score }));
  };

  const setGradeLetter = (studentId, courseCode, letter) => {
    const key = `${studentId}-${courseCode}`;
    setGradeLetters(prev => ({ ...prev, [key]: letter }));
  };

  const getGradeInfo = (studentId, courseCode) => {
    const key = `${studentId}-${courseCode}`;
    if (gradeMode === "letter") {
      const letter = gradeLetters[key];
      if (!letter) return { score: "", grade: null };
      const grade = GRADE_SCALE.find(g => g.letter === letter);
      return { score: "", grade, letter };
    } else {
      const score = grades[key];
      if (score === undefined || score === "") return { score: "", grade: null };
      return { score, grade: scoreToGrade(score) };
    }
  };

  const calculateGPA = (studentId, enrolledCourses) => {
    let totalGradePoints = 0;
    let totalCreditHours = 0;
    const breakdown = [];
    enrolledCourses.forEach(code => {
      const course = COURSES.find(c => c.code === code);
      if (!course) return;
      const { score, grade } = getGradeInfo(studentId, code);
      const hasGrade = grade !== null;
      breakdown.push({
        code,
        name: course.name,
        creditHours: course.creditHours,
        score: hasGrade ? (score ? parseFloat(score) : null) : null,
        grade: grade,
        gradePoints: hasGrade ? grade.points : null,
        qualityPoints: hasGrade ? grade.points * course.creditHours : null,
      });
      if (hasGrade) {
        totalGradePoints += grade.points * course.creditHours;
        totalCreditHours += course.creditHours;
      }
    });
    const gpa = totalCreditHours > 0 ? (totalGradePoints / totalCreditHours) : null;
    return { gpa, totalCreditHours, totalGradePoints, breakdown };
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
    const { gpa } = calculateGPA(s.id, s.enrolled);
    return { ...s, totalPresent, totalMarked, percent: totalMarked ? Math.round((totalPresent / totalMarked) * 100) : null, gpa };
  }), [attendance, students, grades, gradeLetters]);

  const getGradeClass = (letter) => {
    if (!letter) return "";
    if (letter.startsWith("A")) return "grade-A";
    if (letter.startsWith("B")) return "grade-B";
    if (letter.startsWith("C")) return "grade-C";
    if (letter.startsWith("D")) return "grade-D";
    return "grade-F";
  };

  const getGpaColor = (gpa) => {
    if (gpa === null) return "#9ca3af";
    if (gpa >= 3.5) return "#059669";
    if (gpa >= 2.5) return "#2563eb";
    if (gpa >= 2.0) return "#d97706";
    return "#dc2626";
  };

  const PercentBadge = ({ pct }) => {
    if (pct === null) return <span className="badge badge-gray">No data</span>;
    if (pct >= 75) return <span className="badge badge-green">{pct}%</span>;
    if (pct >= 50) return <span className="badge badge-amber">{pct}%</span>;
    return <span className="badge badge-red">{pct}%</span>;
  };

  const GpaBadge = ({ gpa }) => {
    if (gpa === null) return <span className="badge badge-gray">No grades</span>;
    if (gpa >= 3.5) return <span className="badge badge-green">GPA {gpa.toFixed(2)}</span>;
    if (gpa >= 2.5) return <span className="badge badge-blue">GPA {gpa.toFixed(2)}</span>;
    if (gpa >= 2.0) return <span className="badge badge-amber">GPA {gpa.toFixed(2)}</span>;
    return <span className="badge badge-red">GPA {gpa.toFixed(2)}</span>;
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
                <div className="logo-sub">Attendance & Grade Management</div>
              </div>
            </div>
            <nav className="nav">
              {[
                { id: "dashboard", label: "Dashboard", icon: "◈" },
                { id: "mark", label: "Mark", icon: "✓" },
                { id: "grades", label: "Grades & GPA", icon: "★" },
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
          {/* All other sections remain exactly the same as in your original code */}
          {/* ── DASHBOARD ── */}
          {view === "dashboard" && (
            <div>
              <div className="page-header">
                <div className="page-title">Overview</div>
                <div className="page-sub">Real-time attendance and GPA across all courses</div>
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
                  {
                    label: "Avg GPA",
                    value: overallStats.filter(s => s.gpa !== null).length
                      ? (overallStats.filter(s => s.gpa !== null).reduce((a, b) => a + b.gpa, 0) / overallStats.filter(s => s.gpa !== null).length).toFixed(2)
                      : "—",
                    icon: "🏆"
                  },
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
                        {["Student", "Courses / CR Hrs", "Present", "Attendance", "GPA", "Status"].map(h => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {overallStats.map(s => {
                        const totalCR = s.enrolled.reduce((sum, code) => {
                          const c = COURSES.find(x => x.code === code);
                          return sum + (c ? c.creditHours : 0);
                        }, 0);
                        return (
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
                            <td>
                              <span style={{ fontSize: 13, color: "#6b7280" }}>{s.enrolled.length} courses</span>
                              <span className="cr-tag" style={{ marginLeft: 8 }}>{totalCR} CR</span>
                            </td>
                            <td style={{ color: "#059669", fontWeight: 600 }}>{s.totalPresent}</td>
                            <td><PercentBadge pct={s.percent} /></td>
                            <td><GpaBadge gpa={s.gpa} /></td>
                            <td style={{ fontSize: 13, color: "#6b7280" }}>
                              {s.percent === null ? "⏳ Pending" : s.percent >= 75 ? "✅ Good" : s.percent >= 50 ? "⚠️ Warning" : "❌ Critical"}
                            </td>
                          </tr>
                        );
                      })}
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
                <div className="page-sub">Click a class tag to expand and mark students</div>
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
                    <div style={{ flex: "0 0 200px" }}>
                      <div className="form-label" style={{ marginBottom: 8 }}>Date</div>
                      <input type="date" className="form-input" value={markDate} onChange={e => setMarkDate(e.target.value)} />
                    </div>
                  </div>
                  {markDate && (() => {
                    const day = getDayOfWeek(markDate);
                    const classesForDay = TIMETABLE[day] || [];
                    const uniqueCourses = [...new Set(classesForDay.map(c => c.code))];
                    if (classesForDay.length === 0) {
                      return (
                        <div className="card">
                          <div style={{ padding: "48px 28px", textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
                            <div style={{ fontSize: 32, marginBottom: 12 }}>📅</div>
                            No classes scheduled on {DAY_LABELS[day]}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div>
                        {uniqueCourses.map(courseCode => {
                          const course = COURSES.find(c => c.code === courseCode);
                          const classesForCourse = classesForDay.filter(c => c.code === courseCode);
                          const enrolledStudents = students.filter(s => s.enrolled.includes(courseCode));
                          const isExpanded = expandedClass === courseCode;
                          const presentCount = enrolledStudents.filter(s => attendance[`${s.id}-${courseCode}-${markDate}`] === "present").length;
                          const absentCount = enrolledStudents.filter(s => attendance[`${s.id}-${courseCode}-${markDate}`] === "absent").length;
                          return (
                            <div key={courseCode} className="collapsible-section">
                              <button
                                className={`class-tag ${isExpanded ? "active" : ""}`}
                                onClick={() => setExpandedClass(isExpanded ? null : courseCode)}
                                style={{ width: "100%", textAlign: "left" }}
                              >
                                <div className="class-tag-content">
                                  <div className="class-tag-title">{course.name}</div>
                                  <div className="class-tag-meta">
                                    {course.code} · {classesForCourse.map(c => c.time).join(" • ")} · {enrolledStudents.length} students
                                  </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                  <span style={{ fontSize: 12.5, color: "#6b7280", minWidth: 80 }}>
                                    ✅ {presentCount} ❌ {absentCount}
                                  </span>
                                  <span className="class-tag-arrow">›</span>
                                </div>
                              </button>
                              <div className={`collapsible-content ${isExpanded ? "open" : ""}`}>
                                <div className="card" style={{ marginTop: 8, marginBottom: 16 }}>
                                  <div className="card-header" style={{ borderBottom: "1px solid #f3f0eb", paddingBottom: 14 }}>
                                    <div>
                                      <div className="card-title" style={{ marginBottom: 4 }}>Mark Attendance</div>
                                      <div style={{ fontSize: 12.5, color: "#9ca3af" }}>Room {course.room} · {course.instructor}</div>
                                    </div>
                                    <div style={{ display: "flex", gap: 8 }}>
                                      <button className="btn-success" onClick={() => markAllForDate(courseCode, markDate, "present")}>✓ All Present</button>
                                      <button className="btn-danger" onClick={() => markAllForDate(courseCode, markDate, "absent")}>✗ All Absent</button>
                                    </div>
                                  </div>
                                  {enrolledStudents.length === 0 ? (
                                    <div style={{ padding: "32px 28px", textAlign: "center", color: "#9ca3af", fontSize: 13 }}>
                                      No students enrolled in this course.
                                    </div>
                                  ) : (
                                    enrolledStudents.map((s) => {
                                      const key = `${s.id}-${courseCode}-${markDate}`;
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
                                            <button className={`btn-success ${status === "present" ? "filled" : ""}`}
                                              onClick={() => setStatus(s.id, courseCode, markDate, "present")}>✓ Present</button>
                                            <button className={`btn-danger ${status === "absent" ? "filled" : ""}`}
                                              onClick={() => setStatus(s.id, courseCode, markDate, "absent")}>✗ Absent</button>
                                          </div>
                                        </div>
                                      );
                                    })
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          )}

          {/* ── GRADES & GPA ── */}
          {view === "grades" && (
            <div>
              <div className="page-header">
                <div className="page-title">Grades & GPA</div>
                <div className="page-sub">Switch between score or letter grade input method</div>
              </div>
              <div className="form-section">
                <div className="form-title">⚙️ Grading Mode</div>
                <div className="mode-toggle">
                  <button className={`toggle-btn ${gradeMode === "score" ? "active" : ""}`} onClick={() => setGradeMode("score")}>
                    📊 Score (0–100)
                  </button>
                  <button className={`toggle-btn ${gradeMode === "letter" ? "active" : ""}`} onClick={() => setGradeMode("letter")}>
                    🔤 Letter Grade
                  </button>
                </div>
                <div style={{ fontSize: 13, color: "#9ca3af" }}>
                  {gradeMode === "score"
                    ? "Enter numerical scores (0–100). Grades will be calculated automatically."
                    : "Enter letter grades (A+, A, A-, B+, B, B-, C+, C, C-, D+, D, F). Points will be assigned based on the scale."}
                </div>
              </div>
              <div className="grade-scale-section">
                <div style={{ fontWeight: 600, fontSize: 14, color: "#1a1a2e", display: "flex", alignItems: "center", gap: 8 }}>
                  📊 Grade Scale Reference
                </div>
                <div className="grade-scale-grid">
                  {GRADE_SCALE.map(g => (
                    <div key={g.letter} className="grade-scale-item">
                      <div className="grade-scale-letter">{g.letter}</div>
                      <div className="grade-scale-range">≥ {g.minScore}%</div>
                      <div className="grade-scale-pts">{g.points.toFixed(1)} pts</div>
                    </div>
                  ))}
                </div>
              </div>
              {students.length === 0 ? (
                <div className="card">
                  <div className="empty-state">
                    <div className="empty-icon">📊</div>
                    <div className="empty-title">No students yet</div>
                    <div className="empty-sub">Register students first to enter grades.</div>
                    <button className="btn-primary" onClick={() => setView("students")}>Go to Students</button>
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
                    const { gpa, totalCreditHours, totalGradePoints, breakdown } = calculateGPA(selectedStudent, student.enrolled);
                    const totalEnrolledCR = student.enrolled.reduce((sum, code) => {
                      const c = COURSES.find(x => x.code === code);
                      return sum + (c ? c.creditHours : 0);
                    }, 0);
                    return (
                      <div>
                        <div className="gpa-banner">
                          <div className="gpa-main">
                            <div className="gpa-number" style={{ color: gpa !== null ? getGpaColor(gpa) : "#ffffff" }}>
                              {gpa !== null ? gpa.toFixed(2) : "—"}
                            </div>
                            <div className="gpa-label">Cumulative GPA</div>
                          </div>
                          <div className="gpa-details">
                            <div style={{ fontFamily: "'Lora', serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{student.name}</div>
                            <div style={{ opacity: 0.6, fontSize: 12, fontFamily: "monospace", marginBottom: 16 }}>{student.id}</div>
                            <div className="gpa-row">
                              <span className="gpa-row-label">Total Enrolled CR Hours</span>
                              <span className="gpa-row-val">{totalEnrolledCR}</span>
                            </div>
                            <div className="gpa-row">
                              <span className="gpa-row-label">CR Hours Graded</span>
                              <span className="gpa-row-val">{totalCreditHours}</span>
                            </div>
                            <div className="gpa-row">
                              <span className="gpa-row-label">Total Quality Points</span>
                              <span className="gpa-row-val">{totalGradePoints.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="gpa-summary-table">
                          <div className="gpa-summary-header">
                            <div style={{ fontWeight: 600, fontSize: 15, color: "#1a1a2e" }}>Course Grades</div>
                            <div style={{ fontSize: 12, color: "#9ca3af" }}>
                              {gradeMode === "score" ? "Enter score (0–100)" : "Enter letter grade"}
                            </div>
                          </div>
                          <div style={{ padding: "0" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto auto", gap: 16, padding: "10px 22px", background: "#faf9f7", borderBottom: "1px solid #f3f0eb" }}>
                              <div style={{ fontSize: 10.5, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Course</div>
                              <div style={{ fontSize: 10.5, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, textAlign: "center" }}>CR Hrs</div>
                              <div style={{ fontSize: 10.5, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, textAlign: "center" }}>Grade Entry</div>
                              <div style={{ fontSize: 10.5, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, textAlign: "center" }}>Grade</div>
                              <div style={{ fontSize: 10.5, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, textAlign: "center" }}>Quality Pts</div>
                            </div>
                            {breakdown.map(item => {
                              const course = COURSES.find(c => c.code === item.code);
                              const key = `${selectedStudent}-${item.code}`;
                              return (
                                <div key={item.code}>
                                  <div className="gpa-course-row">
                                    <div>
                                      <div style={{ fontWeight: 600, fontSize: 13.5, color: "#1a1a2e" }}>{item.name}</div>
                                      <div style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 2 }}>{item.code} · {course.instructor}</div>
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                      <span className="cr-tag">{item.creditHours} CR</span>
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                      {gradeMode === "score" ? (
                                        <input
                                          type="number"
                                          className="grade-input"
                                          min="0"
                                          max="100"
                                          placeholder="0–100"
                                          value={grades[key] ?? ""}
                                          onChange={e => setGradeScore(selectedStudent, item.code, e.target.value)}
                                        />
                                      ) : (
                                        <input
                                          type="text"
                                          className="grade-input"
                                          placeholder="e.g. A+"
                                          maxLength="2"
                                          value={gradeLetters[key] ?? ""}
                                          onChange={e => setGradeLetter(selectedStudent, item.code, e.target.value.toUpperCase())}
                                          style={{ textAlign: "center", fontWeight: 700 }}
                                        />
                                      )}
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                      {item.grade ? (
                                        <span className={`grade-letter-badge ${getGradeClass(item.grade.letter)}`}>
                                          {item.grade.letter}
                                        </span>
                                      ) : (
                                        <span style={{ fontSize: 13, color: "#d1d5db" }}>—</span>
                                      )}
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                      {item.qualityPoints !== null ? (
                                        <span style={{ fontWeight: 700, fontSize: 14, color: "#6366f1" }}>
                                          {item.qualityPoints.toFixed(2)}
                                        </span>
                                      ) : (
                                        <span style={{ fontSize: 13, color: "#d1d5db" }}>—</span>
                                      )}
                                      {item.grade && (
                                        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
                                          {item.grade.points.toFixed(1)} × {item.creditHours}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          {gpa !== null && (
                            <div style={{ padding: "16px 22px", background: "#faf9f7", borderTop: "2px solid #ece9e3", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 24 }}>
                              <div style={{ fontSize: 13, color: "#6b7280" }}>
                                Total Quality Points: <strong style={{ color: "#1a1a2e" }}>{totalGradePoints.toFixed(2)}</strong>
                              </div>
                              <div style={{ fontSize: 13, color: "#6b7280" }}>
                                Total CR Hours Graded: <strong style={{ color: "#1a1a2e" }}>{totalCreditHours}</strong>
                              </div>
                              <div style={{ fontSize: 15, fontWeight: 700, color: getGpaColor(gpa) }}>
                                GPA = {totalGradePoints.toFixed(2)} ÷ {totalCreditHours} = {gpa.toFixed(2)}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                  {!selectedStudent && (
                    <div className="card table-wrap">
                      <div className="card-header">
                        <div className="card-title">GPA Summary — All Students</div>
                      </div>
                      <table>
                        <thead>
                          <tr>
                            {["Student", "Enrolled CR Hrs", "Graded CR Hrs", "Quality Points", "GPA", "Standing"].map(h => <th key={h}>{h}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {students.map(s => {
                            const { gpa, totalCreditHours, totalGradePoints } = calculateGPA(s.id, s.enrolled);
                            const totalEnrolledCR = s.enrolled.reduce((sum, code) => {
                              const c = COURSES.find(x => x.code === code);
                              return sum + (c ? c.creditHours : 0);
                            }, 0);
                            return (
                              <tr key={s.id} style={{ cursor: "pointer" }} onClick={() => setSelectedStudent(s.id)}>
                                <td>
                                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <div className="avatar">{initials(s.name)}</div>
                                    <div>
                                      <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                                      <div style={{ fontSize: 12, color: "#9ca3af", fontFamily: "monospace" }}>{s.id}</div>
                                    </div>
                                  </div>
                                </td>
                                <td><span className="cr-tag">{totalEnrolledCR} CR</span></td>
                                <td style={{ fontSize: 13, color: "#6b7280" }}>{totalCreditHours} CR</td>
                                <td style={{ fontWeight: 600, color: "#6366f1" }}>{totalGradePoints.toFixed(2)}</td>
                                <td><GpaBadge gpa={gpa} /></td>
                                <td style={{ fontSize: 13, color: "#6b7280" }}>
                                  {gpa === null ? "⏳ Pending" : gpa >= 3.5 ? "🏆 Dean's List" : gpa >= 3.0 ? "✅ Good Standing" : gpa >= 2.0 ? "⚠️ Satisfactory" : "❌ Probation"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
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
                    const { gpa } = calculateGPA(selectedStudent, student.enrolled);
                    const totalCR = student.enrolled.reduce((sum, code) => {
                      const c = COURSES.find(x => x.code === code);
                      return sum + (c ? c.creditHours : 0);
                    }, 0);
                    return (
                      <div>
                        <div className="report-student-card">
                          <div className="report-avatar">{initials(student.name)}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: "'Lora', serif", fontSize: 20, fontWeight: 700, color: "#1a1a2e", marginBottom: 4 }}>{student.name}</div>
                            <div style={{ color: "#9ca3af", fontFamily: "monospace", fontSize: 13 }}>{student.id}</div>
                            <div style={{ color: "#9ca3af", fontSize: 13, marginTop: 2 }}>{student.enrolled.length} courses · {totalCR} total CR hours</div>
                          </div>
                          <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                            <PercentBadge pct={stats.percent} />
                            <GpaBadge gpa={gpa} />
                            <div style={{ fontSize: 12, color: "#9ca3af" }}>{stats.totalPresent} present of {stats.totalMarked} marked</div>
                          </div>
                        </div>
                        <div className="course-cards">
                          {student.enrolled.map(code => {
                            const course = COURSES.find(c => c.code === code);
                            const s = getAttendanceStats(student.id, code);
                            const { grade } = getGradeInfo(student.id, code);
                            const recentDates = getCourseDates(code).slice(-20);
                            return (
                              <div key={code} className="course-card">
                                <div className="course-card-head">
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                                    <div>
                                      <div className="course-card-name">{course.name}</div>
                                      <div className="course-card-meta" style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                                        {code} · {course.instructor}
                                        <span className="cr-tag">{course.creditHours} CR</span>
                                      </div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                                      <PercentBadge pct={s.marked ? s.percent : null} />
                                      {grade && (
                                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                          <span className={`grade-letter-badge ${getGradeClass(grade.letter)}`}>{grade.letter}</span>
                                          <span style={{ fontSize: 11.5, color: "#9ca3af" }}>{grade.points.toFixed(1)} pts</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <MiniBar pct={s.percent} total={s.marked} />
                                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>
                                    {s.present} present · {s.absent} absent · {s.marked} total sessions
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
                          {c.code} <span style={{ opacity: 0.6, fontWeight: 400, marginLeft: 4 }}>{c.creditHours}CR</span>
                        </button>
                      );
                    })}
                  </div>
                  {newStudent.courses.length > 0 && (
                    <div style={{ fontSize: 12.5, color: "#6366f1", marginTop: 8, fontWeight: 600 }}>
                      {newStudent.courses.length} courses selected · {newStudent.courses.reduce((sum, code) => {
                        const c = COURSES.find(x => x.code === code);
                        return sum + (c ? c.creditHours : 0);
                      }, 0)} total credit hours
                    </div>
                  )}
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
                  {students.map((s, i) => {
                    const totalCR = s.enrolled.reduce((sum, code) => {
                      const c = COURSES.find(x => x.code === code);
                      return sum + (c ? c.creditHours : 0);
                    }, 0);
                    return (
                      <div key={s.id} style={{ padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: i > 0 ? "1px solid #f3f0eb" : "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <div className="avatar">{initials(s.name)}</div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 14.5, color: "#1a1a2e" }}>{s.name}</div>
                            <div style={{ fontSize: 12, color: "#9ca3af", fontFamily: "monospace", marginTop: 2 }}>
                              {s.id} · {s.enrolled.length} courses
                              <span className="cr-tag" style={{ marginLeft: 8 }}>{totalCR} CR</span>
                            </div>
                          </div>
                        </div>
                        <button className="btn-outline" onClick={() => { setSelectedStudent(s.id); setView("report"); }}>
                          View Report →
                        </button>
                      </div>
                    );
                  })}
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
                      {["Time", "Instructor", "Course", "Code", "CR Hrs"].map(h => <th key={h}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {TIMETABLE[timetableDay].map((row, i) => {
                      const course = COURSES.find(c => c.code === row.code);
                      return (
                        <tr key={i}>
                          <td style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 13, color: DAY_ACCENTS[timetableDay] }}>{row.time}</td>
                          <td style={{ fontSize: 14, color: "#374151" }}>{row.instructor}</td>
                          <td style={{ fontWeight: 600, fontSize: 14, color: "#1a1a2e" }}>{row.course}</td>
                          <td><span className="pill">{row.code}</span></td>
                          <td><span className="cr-tag">{course ? course.creditHours : "—"} CR</span></td>
                        </tr>
                      );
                    })}
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