import React, { useState } from "react";

// ============================================
// DUMMY DATA
// ============================================
const dashboardKPIs = [
  { id: 1, label: "Total Schools", value: 218, change: "+12", trend: "up", color: "#4f46e5" },
  { id: 2, label: "Active Schools", value: 196, change: "+8", trend: "up", color: "#059669" },
  { id: 3, label: "Enrolled Students", value: 24850, change: "+1240", trend: "up", color: "#0891b2" },
  { id: 4, label: "Active Trainers", value: 342, change: "+18", trend: "up", color: "#7c3aed" },
  { id: 5, label: "Sessions Delivered", value: 12480, change: "+340", trend: "up", color: "#dc2626" },
  { id: 6, label: "Avg. Attendance", value: "87.4%", change: "+2.1%", trend: "up", color: "#ea580c" },
  { id: 7, label: "Pending Grading", value: 156, change: "-24", trend: "down", color: "#ca8a04" },
  { id: 8, label: "Schools At Risk", value: 22, change: "+3", trend: "up", color: "#b91c1c" },
];

const schoolsData = [
  { id: "SCH001", name: "Delhi Public School", district: "New Delhi", students: 420, trainers: 8, attendance: 92, progress: 78, status: "Active", program: "AI & Robotics" },
  { id: "SCH002", name: "St. Xavier's High School", district: "Mumbai", students: 380, trainers: 6, attendance: 88, progress: 72, status: "Active", program: "Drone Tech" },
  { id: "SCH003", name: "Kendriya Vidyalaya", district: "Bengaluru", students: 510, trainers: 10, attendance: 85, progress: 68, status: "Active", program: "Digital Marketing" },
  { id: "SCH004", name: "Ryan International", district: "Pune", students: 290, trainers: 5, attendance: 79, progress: 54, status: "At Risk", program: "AI" },
  { id: "SCH005", name: "DAV Public School", district: "Chennai", students: 340, trainers: 7, attendance: 91, progress: 81, status: "Active", program: "Robotics" },
  { id: "SCH006", name: "Podar International", district: "Jaipur", students: 265, trainers: 4, attendance: 76, progress: 49, status: "At Risk", program: "Drone Tech" },
];

const sessionsData = [
  { id: 1, school: "Delhi Public School", trainer: "Rajesh Kumar", program: "AI & Robotics", date: "2026-10-22", time: "10:00 AM", status: "Delivered", students: 32 },
  { id: 2, school: "St. Xavier's High School", trainer: "Priya Sharma", program: "Drone Tech", date: "2026-10-22", time: "11:30 AM", status: "Delivered", students: 28 },
  { id: 3, school: "Kendriya Vidyalaya", trainer: "Amit Patel", program: "Digital Marketing", date: "2026-10-22", time: "02:00 PM", status: "Upcoming", students: 35 },
  { id: 4, school: "Ryan International", trainer: "Sneha Reddy", program: "AI", date: "2026-10-22", time: "03:30 PM", status: "Missed", students: 0 },
  { id: 5, school: "DAV Public School", trainer: "Vikram Singh", program: "Robotics", date: "2026-10-23", time: "09:00 AM", status: "Upcoming", students: 30 },
];

const alertsData = [
  { id: 1, type: "critical", message: "Ryan International - Attendance below 80% for 3 consecutive sessions", time: "2h ago" },
  { id: 2, type: "warning", message: "Podar International - Curriculum 51% behind schedule", time: "4h ago" },
  { id: 3, type: "warning", message: "156 assignments pending grading across 12 schools", time: "6h ago" },
  { id: 4, type: "info", message: "New school onboarding: Greenwood High School initiated", time: "8h ago" },
  { id: 5, type: "critical", message: "Trainer unassigned: 4 batches in Mumbai district need trainer", time: "12h ago" },
];

const attendanceTrend = [
  { month: "May", student: 82, trainer: 88 },
  { month: "Jun", student: 85, trainer: 90 },
  { month: "Jul", student: 84, trainer: 89 },
  { month: "Aug", student: 87, trainer: 91 },
  { month: "Sep", student: 86, trainer: 92 },
  { month: "Oct", student: 87, trainer: 93 },
];

const programDistribution = [
  { name: "AI", value: 32, color: "#4f46e5" },
  { name: "Robotics", value: 28, color: "#0891b2" },
  { name: "Drone Tech", value: 22, color: "#059669" },
  { name: "Digital Marketing", value: 18, color: "#dc2626" },
];

// ============================================
// SALARY DATA
// ============================================
const salaryData = [
  { id: "TRN-001", name: "Rajesh Kumar", schools: ["Delhi Public School", "DAV Public School"], program: "AI & Robotics", sessionsDelivered: 48, sessionsPlanned: 52, ratePerSession: 1200, travelAllowance: 3000, deductions: 500, bonus: 2000, status: "Paid", payMonth: "October 2026", bankAccount: "XXXX4521" },
  { id: "TRN-002", name: "Priya Sharma", schools: ["St. Xavier's High School"], program: "Drone Tech", sessionsDelivered: 42, sessionsPlanned: 45, ratePerSession: 1500, travelAllowance: 2500, deductions: 0, bonus: 3000, status: "Pending", payMonth: "October 2026", bankAccount: "XXXX8832" },
  { id: "TRN-003", name: "Amit Patel", schools: ["Kendriya Vidyalaya", "Ryan International"], program: "Digital Marketing", sessionsDelivered: 50, sessionsPlanned: 50, ratePerSession: 1000, travelAllowance: 2000, deductions: 1000, bonus: 1500, status: "Paid", payMonth: "October 2026", bankAccount: "XXXX1104" },
  { id: "TRN-004", name: "Sneha Reddy", schools: ["Ryan International"], program: "AI", sessionsDelivered: 28, sessionsPlanned: 40, ratePerSession: 1100, travelAllowance: 1800, deductions: 2500, bonus: 0, status: "On Hold", payMonth: "October 2026", bankAccount: "XXXX6677" },
  { id: "TRN-005", name: "Vikram Singh", schools: ["DAV Public School", "Podar International"], program: "Robotics", sessionsDelivered: 46, sessionsPlanned: 48, ratePerSession: 1300, travelAllowance: 2800, deductions: 0, bonus: 2500, status: "Pending", payMonth: "October 2026", bankAccount: "XXXX3345" },
];

const calculateSalary = (t) =>
  t.sessionsDelivered * t.ratePerSession + t.travelAllowance + t.bonus - t.deductions;

const navItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "schools", label: "Schools" },
  { id: "students", label: "Students" },
  { id: "trainers", label: "Trainers" },
  { id: "programs", label: "Programs & Curriculum" },
  { id: "sessions", label: "Sessions & Timetable" },
  { id: "attendance", label: "Attendance" },
  { id: "assignments", label: "Assignments" },
  { id: "quizzes", label: "Quizzes & Assessments" },
  { id: "reports", label: "Reports Center" },
  { id: "certificates", label: "Certificates" },
  { id: "inventory", label: "Equipment Inventory" },
  { id: "salary", label: "Salary & Payroll" },
  { id: "audit", label: "Audit Logs" },
  { id: "settings", label: "Settings" },
];

// ============================================
// STYLES
// ============================================
const styles = {
  app: { display: "flex", minHeight: "100vh", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", background: "#f1f5f9", color: "#1e293b" },
  sidebar: { width: "260px", background: "#0f172a", color: "#cbd5e1", display: "flex", flexDirection: "column", position: "fixed", height: "100vh", overflowY: "auto", zIndex: 100 },
  logo: { padding: "20px 24px", borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", gap: "12px" },
  logoIcon: { width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "bold", color: "#fff" },
  logoText: { fontSize: "18px", fontWeight: "700", color: "#fff", lineHeight: "1.2" },
  logoSub: { fontSize: "11px", color: "#64748b", fontWeight: "400" },
  nav: { flex: 1, padding: "12px 8px", overflowY: "auto" },
  navItem: { display: "flex", alignItems: "center", padding: "10px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "500", marginBottom: "2px", transition: "all 0.15s ease", color: "#94a3b8", border: "none", background: "transparent", width: "100%", textAlign: "left" },
  navItemActive: { background: "#1e293b", color: "#fff", fontWeight: "600" },
  main: { flex: 1, marginLeft: "260px", display: "flex", flexDirection: "column", minHeight: "100vh" },
  header: { background: "#fff", padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 50 },
  headerTitle: { fontSize: "20px", fontWeight: "700", color: "#0f172a" },
  headerSub: { fontSize: "13px", color: "#64748b", marginTop: "2px" },
  headerRight: { display: "flex", alignItems: "center", gap: "16px" },
  searchBox: { padding: "8px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", width: "260px", outline: "none", background: "#f8fafc" },
  iconBtn: { width: "38px", height: "38px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: "11px", fontWeight: "700", color: "#475569", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" },
  badge: { position: "absolute", top: "-4px", right: "-4px", background: "#dc2626", color: "#fff", fontSize: "10px", fontWeight: "700", width: "18px", height: "18px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
  avatar: { width: "38px", height: "38px", borderRadius: "10px", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "14px" },
  content: { padding: "24px 28px", flex: 1 },
  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" },
  kpiCard: { background: "#fff", borderRadius: "12px", padding: "18px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "8px", transition: "box-shadow 0.2s" },
  kpiTop: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  kpiIcon: { width: "40px", height: "40px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", color: "#fff" },
  kpiValue: { fontSize: "26px", fontWeight: "800", color: "#0f172a", lineHeight: "1" },
  kpiLabel: { fontSize: "12px", color: "#64748b", fontWeight: "500" },
  kpiChange: { fontSize: "11px", fontWeight: "600", padding: "2px 8px", borderRadius: "20px", display: "inline-block" },
  section: { background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "24px", overflow: "hidden" },
  sectionHeader: { padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" },
  sectionTitle: { fontSize: "15px", fontWeight: "700", color: "#0f172a" },
  sectionAction: { fontSize: "12px", color: "#4f46e5", fontWeight: "600", cursor: "pointer", background: "none", border: "none" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: { textAlign: "left", padding: "10px 16px", background: "#f8fafc", color: "#64748b", fontWeight: "600", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap" },
  td: { padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#334155" },
  statusBadge: { padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", display: "inline-block", whiteSpace: "nowrap" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" },
  alertItem: { display: "flex", gap: "12px", padding: "12px 20px", borderBottom: "1px solid #f1f5f9", alignItems: "flex-start" },
  alertDot: { width: "8px", height: "8px", borderRadius: "50%", marginTop: "6px", flexShrink: 0 },
  alertText: { fontSize: "13px", color: "#334155", lineHeight: "1.4" },
  alertTime: { fontSize: "11px", color: "#94a3b8", marginTop: "4px" },
  chartContainer: { padding: "20px" },
  barTrack: { flex: 1, height: "24px", background: "#f1f5f9", borderRadius: "6px", overflow: "hidden", position: "relative" },
  barFill: { height: "100%", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "8px", fontSize: "11px", fontWeight: "700", color: "#fff", transition: "width 0.8s ease" },
  donutContainer: { display: "flex", alignItems: "center", gap: "24px", padding: "20px" },
  legendItem: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", fontSize: "12px", color: "#475569" },
  legendDot: { width: "10px", height: "10px", borderRadius: "3px" },
  emptyState: { padding: "60px 20px", textAlign: "center", color: "#94a3b8" },
  emptyTitle: { fontSize: "16px", fontWeight: "600", color: "#64748b", marginBottom: "4px" },
  emptyText: { fontSize: "13px" },
};

// ============================================
// HELPER COMPONENTS
// ============================================
const StatusBadge = ({ status }) => {
  const colors = {
    Active: { bg: "#dcfce7", color: "#166534" },
    "At Risk": { bg: "#fee2e2", color: "#991b1b" },
    Delivered: { bg: "#dcfce7", color: "#166534" },
    Upcoming: { bg: "#dbeafe", color: "#1e40af" },
    Missed: { bg: "#fee2e2", color: "#991b1b" },
    Inactive: { bg: "#f1f5f9", color: "#475569" },
    Paid: { bg: "#dcfce7", color: "#166534" },
    Pending: { bg: "#fef3c7", color: "#92400e" },
    "On Hold": { bg: "#fee2e2", color: "#991b1b" },
  };
  const c = colors[status] || colors.Inactive;
  return <span style={{ ...styles.statusBadge, background: c.bg, color: c.color }}>{status}</span>;
};

const KpiCard = ({ kpi }) => (
  <div style={styles.kpiCard}>
    <div style={styles.kpiTop}>
      <div style={{ ...styles.kpiIcon, background: kpi.color }}>
        {kpi.label.split(" ").map((w) => w[0]).join("").slice(0, 2)}
      </div>
      <span style={{ ...styles.kpiChange, background: kpi.trend === "up" ? "#dcfce7" : "#fee2e2", color: kpi.trend === "up" ? "#166534" : "#991b1b" }}>
        {kpi.trend === "up" ? "▲" : "▼"} {kpi.change}
      </span>
    </div>
    <div style={styles.kpiValue}>{typeof kpi.value === "number" ? kpi.value.toLocaleString() : kpi.value}</div>
    <div style={styles.kpiLabel}>{kpi.label}</div>
  </div>
);

const DonutChart = ({ data }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;
  const segments = data.map((d) => {
    const start = (cumulative / total) * 100;
    cumulative += d.value;
    const end = (cumulative / total) * 100;
    return { ...d, start, end };
  });
  const gradient = segments.map((s) => `${s.color} ${s.start}% ${s.end}%`).join(", ");
  return (
    <div style={styles.donutContainer}>
      <div style={{ width: "140px", height: "140px", borderRadius: "50%", background: `conic-gradient(${gradient})`, position: "relative", flexShrink: 0 }}>
        <div style={{ position: "absolute", inset: "28px", borderRadius: "50%", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a" }}>{total}</span>
          <span style={{ fontSize: "10px", color: "#64748b" }}>schools</span>
        </div>
      </div>
      <div>
        {data.map((d) => (
          <div key={d.name} style={styles.legendItem}>
            <div style={{ ...styles.legendDot, background: d.color }} />
            <span style={{ flex: 1 }}>{d.name}</span>
            <span style={{ fontWeight: "700", color: "#0f172a" }}>{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// DASHBOARD VIEW
// ============================================
const DashboardView = () => (
  <div>
    <div style={styles.kpiGrid}>
      {dashboardKPIs.map((kpi) => <KpiCard key={kpi.id} kpi={kpi} />)}
    </div>

    <div style={styles.grid2}>
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTitle}>Attendance Trend (Last 6 Months)</span>
          <button style={styles.sectionAction}>View Report →</button>
        </div>
        <div style={styles.chartContainer}>
          {attendanceTrend.map((t) => (
            <div key={t.month} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "12px", fontWeight: "600", color: "#475569" }}>{t.month}</span>
                <span style={{ fontSize: "11px", color: "#64748b" }}>Students {t.student}% · Trainers {t.trainer}%</span>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ ...styles.barTrack, height: "10px" }}>
                  <div style={{ ...styles.barFill, width: `${t.student}%`, background: "#4f46e5" }} />
                </div>
                <div style={{ ...styles.barTrack, height: "10px" }}>
                  <div style={{ ...styles.barFill, width: `${t.trainer}%`, background: "#0891b2" }} />
                </div>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: "20px", marginTop: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#64748b" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#4f46e5" }} /> Student Attendance
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#64748b" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#0891b2" }} /> Trainer Attendance
            </div>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTitle}>Program Distribution</span>
          <button style={styles.sectionAction}>Manage Programs →</button>
        </div>
        <DonutChart data={programDistribution} />
      </div>
    </div>

    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <span style={styles.sectionTitle}>Recent & Upcoming Sessions</span>
        <button style={styles.sectionAction}>View All →</button>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>School</th>
              <th style={styles.th}>Trainer</th>
              <th style={styles.th}>Program</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Students</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {sessionsData.map((s) => (
              <tr key={s.id}>
                <td style={styles.td}><strong>{s.school}</strong></td>
                <td style={styles.td}>{s.trainer}</td>
                <td style={styles.td}>{s.program}</td>
                <td style={styles.td}>{s.date}</td>
                <td style={styles.td}>{s.time}</td>
                <td style={styles.td}>{s.students}</td>
                <td style={styles.td}><StatusBadge status={s.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <span style={styles.sectionTitle}>Operational Alerts & Task Queue</span>
        <button style={styles.sectionAction}>View All →</button>
      </div>
      <div>
        {alertsData.map((a) => {
          const colors = { critical: "#dc2626", warning: "#ea580c", info: "#0891b2" };
          return (
            <div key={a.id} style={styles.alertItem}>
              <div style={{ ...styles.alertDot, background: colors[a.type] }} />
              <div style={{ flex: 1 }}>
                <div style={styles.alertText}>{a.message}</div>
                <div style={styles.alertTime}>{a.time}</div>
              </div>
              <span style={{ ...styles.statusBadge, background: colors[a.type] + "15", color: colors[a.type], textTransform: "capitalize" }}>{a.type}</span>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

// ============================================
// SCHOOLS VIEW
// ============================================
const SchoolsView = () => (
  <div style={styles.section}>
    <div style={styles.sectionHeader}>
      <span style={styles.sectionTitle}>School Directory ({schoolsData.length} shown)</span>
      <div style={{ display: "flex", gap: "8px" }}>
        <button style={{ ...styles.sectionAction, background: "#4f46e5", color: "#fff", padding: "8px 16px", borderRadius: "8px" }}>+ Add School</button>
        <button style={{ ...styles.sectionAction, border: "1px solid #e2e8f0", padding: "8px 16px", borderRadius: "8px" }}>Bulk Import</button>
      </div>
    </div>
    <div style={{ overflowX: "auto" }}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>School Code</th>
            <th style={styles.th}>School Name</th>
            <th style={styles.th}>District</th>
            <th style={styles.th}>Program</th>
            <th style={styles.th}>Students</th>
            <th style={styles.th}>Trainers</th>
            <th style={styles.th}>Attendance</th>
            <th style={styles.th}>Progress</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {schoolsData.map((s) => (
            <tr key={s.id}>
              <td style={styles.td}><strong>{s.id}</strong></td>
              <td style={styles.td}>{s.name}</td>
              <td style={styles.td}>{s.district}</td>
              <td style={styles.td}>{s.program}</td>
              <td style={styles.td}>{s.students}</td>
              <td style={styles.td}>{s.trainers}</td>
              <td style={styles.td}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ ...styles.barTrack, width: "60px", height: "6px" }}>
                    <div style={{ ...styles.barFill, width: `${s.attendance}%`, background: s.attendance >= 85 ? "#059669" : "#dc2626" }} />
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: "600" }}>{s.attendance}%</span>
                </div>
              </td>
              <td style={styles.td}>{s.progress}%</td>
              <td style={styles.td}><StatusBadge status={s.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ============================================
// SALARY / PAYROLL VIEW
// ============================================
const SalaryView = () => {
  const [filter, setFilter] = useState("All");
  const filteredData = filter === "All" ? salaryData : salaryData.filter((s) => s.status === filter);

  const totalPayroll = salaryData.reduce((sum, t) => sum + calculateSalary(t), 0);
  const totalPaid = salaryData.filter((t) => t.status === "Paid").reduce((sum, t) => sum + calculateSalary(t), 0);
  const totalPending = salaryData.filter((t) => t.status === "Pending").reduce((sum, t) => sum + calculateSalary(t), 0);
  const totalOnHold = salaryData.filter((t) => t.status === "On Hold").reduce((sum, t) => sum + calculateSalary(t), 0);

  const salaryKPIs = [
    { label: "Total Payroll", value: `₹${totalPayroll.toLocaleString("en-IN")}`, color: "#4f46e5", tag: "TP" },
    { label: "Paid", value: `₹${totalPaid.toLocaleString("en-IN")}`, color: "#059669", tag: "PD" },
    { label: "Pending", value: `₹${totalPending.toLocaleString("en-IN")}`, color: "#ea580c", tag: "PN" },
    { label: "On Hold", value: `₹${totalOnHold.toLocaleString("en-IN")}`, color: "#dc2626", tag: "OH" },
  ];

  const filters = ["All", "Paid", "Pending", "On Hold"];

  return (
    <div>
      <div style={styles.kpiGrid}>
        {salaryKPIs.map((kpi, i) => (
          <div key={i} style={styles.kpiCard}>
            <div style={styles.kpiTop}>
              <div style={{ ...styles.kpiIcon, background: kpi.color }}>{kpi.tag}</div>
              <span style={{ ...styles.kpiChange, background: `${kpi.color}15`, color: kpi.color }}>{kpi.label}</span>
            </div>
            <div style={{ ...styles.kpiValue, fontSize: "22px" }}>{kpi.value}</div>
            <div style={styles.kpiLabel}>October 2026</div>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span style={styles.sectionTitle}>Trainer Payroll — October 2026</span>
            <div style={{ display: "flex", gap: "6px" }}>
              {filters.map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  style={{
                    padding: "5px 14px", borderRadius: "20px", border: "1px solid", fontSize: "12px",
                    fontWeight: "600", cursor: "pointer",
                    background: filter === f ? "#4f46e5" : "#fff",
                    color: filter === f ? "#fff" : "#475569",
                    borderColor: filter === f ? "#4f46e5" : "#e2e8f0",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button style={{ ...styles.sectionAction, border: "1px solid #e2e8f0", padding: "8px 14px", borderRadius: "8px" }}>Export XLSX</button>
            <button style={{ ...styles.sectionAction, background: "#059669", color: "#fff", padding: "8px 16px", borderRadius: "8px" }}>Process All Pending</button>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Trainer</th>
                <th style={styles.th}>Program</th>
                <th style={styles.th}>Schools</th>
                <th style={styles.th}>Sessions</th>
                <th style={styles.th}>Rate</th>
                <th style={styles.th}>Travel</th>
                <th style={styles.th}>Bonus</th>
                <th style={styles.th}>Deductions</th>
                <th style={styles.th}>Net Salary</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="11" style={{ ...styles.td, textAlign: "center", padding: "40px" }}>
                    No trainers found for this filter.
                  </td>
                </tr>
              ) : (
                filteredData.map((t) => {
                  const net = calculateSalary
                                    return (
                    <tr key={t.id}>
                      <td style={styles.td}>
                        <div style={{ fontWeight: "700", color: "#0f172a" }}>{t.name}</div>
                        <div style={{ fontSize: "11px", color: "#64748b" }}>{t.id} · {t.bankAccount}</div>
                      </td>
                      <td style={styles.td}>{t.program}</td>
                      <td style={styles.td}>
                        <div style={{ fontSize: "12px", color: "#475569" }}>{t.schools.join(", ")}</div>
                      </td>
                      <td style={styles.td}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <div style={{ ...styles.barTrack, width: "50px", height: "6px" }}>
                            <div style={{ ...styles.barFill, width: `${(t.sessionsDelivered / t.sessionsPlanned) * 100}%`, background: "#4f46e5" }} />
                          </div>
                          <span style={{ fontSize: "12px", fontWeight: "600" }}>{t.sessionsDelivered}/{t.sessionsPlanned}</span>
                        </div>
                      </td>
                      <td style={styles.td}>₹{t.ratePerSession.toLocaleString("en-IN")}</td>
                      <td style={styles.td}>₹{t.travelAllowance.toLocaleString("en-IN")}</td>
                      <td style={{ ...styles.td, color: "#059669", fontWeight: "600" }}>+₹{t.bonus.toLocaleString("en-IN")}</td>
                      <td style={{ ...styles.td, color: "#dc2626", fontWeight: "600" }}>-₹{t.deductions.toLocaleString("en-IN")}</td>
                      <td style={{ ...styles.td, fontWeight: "800", color: "#0f172a", fontSize: "14px" }}>₹{net.toLocaleString("en-IN")}</td>
                      <td style={styles.td}><StatusBadge status={t.status} /></td>
                      <td style={styles.td}>
                        {t.status !== "Paid" ? (
                          <button style={{ padding: "5px 12px", borderRadius: "6px", border: "none", background: "#4f46e5", color: "#fff", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>
                            Pay Now
                          </button>
                        ) : (
                          <button style={{ padding: "5px 12px", borderRadius: "6px", border: "1px solid #e2e8f0", background: "#fff", color: "#475569", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>
                            Slip
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            <tfoot>
              <tr style={{ background: "#f8fafc" }}>
                <td style={{ ...styles.td, fontWeight: "700" }} colSpan="8">
                  Total ({filteredData.length} trainers)
                </td>
                <td style={{ ...styles.td, fontWeight: "800", color: "#4f46e5", fontSize: "14px" }}>
                  ₹{filteredData.reduce((s, t) => s + calculateSalary(t), 0).toLocaleString("en-IN")}
                </td>
                <td style={styles.td} colSpan="2"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

// ============================================
// PLACEHOLDER VIEW
// ============================================
const PlaceholderView = ({ title, description }) => (
  <div style={styles.section}>
    <div style={styles.sectionHeader}>
      <span style={styles.sectionTitle}>{title}</span>
    </div>
    <div style={styles.emptyState}>
      <div style={styles.emptyTitle}>{title} Module</div>
      <div style={styles.emptyText}>
        {description || "This module is under development. As per SRS, it will include full CRUD operations, filters, and export capabilities."}
      </div>
    </div>
  </div>
);

// ============================================
// MAIN APP COMPONENT
// ============================================
export default function App() {
  const [activeNav, setActiveNav] = useState("dashboard");

  const renderView = () => {
    switch (activeNav) {
      case "dashboard":
        return <DashboardView />;
      case "schools":
        return <SchoolsView />;
      case "salary":
        return <SalaryView />;
      case "students":
        return <PlaceholderView title="Student Lifecycle & Records" description="Manage 24,850+ enrolled students across 218 schools with individual progress tracking, bulk imports, and historical records." />;
      case "trainers":
        return <PlaceholderView title="Trainer & Staff Management" description="Manage 342 active trainers, their allocations, schedules, attendance, and performance metrics." />;
      case "programs":
        return <PlaceholderView title="Programs & Curriculum" description="AI, Robotics, Drone Technology & Digital Marketing curriculum management with versioning." />;
      case "sessions":
        return <PlaceholderView title="Sessions & Timetable" description="Schedule, reschedule, and track 12,480+ delivered sessions with trainer conflict detection." />;
      case "attendance":
        return <PlaceholderView title="Attendance Management" description="Roster-based quick marking, correction workflow, and low-attendance alerts." />;
      case "assignments":
        return <PlaceholderView title="Assignments & Project Work" description="Create assignments, track submissions, grade with rubrics, and manage practical projects." />;
      case "quizzes":
        return <PlaceholderView title="Quiz & Assessment Engine" description="Question bank, MCQ/auto-grading, manual evaluation, and question-level analytics." />;
      case "reports":
        return <PlaceholderView title="Reports & Export Center" description="Standardized reports with filters, PDF/XLSX/CSV exports, and asynchronous large reports." />;
      case "certificates":
        return <PlaceholderView title="Certificates & Achievements" description="Template-based certificate generation with QR verification and bulk issuance." />;
      case "inventory":
        return <PlaceholderView title="Equipment & Lab Inventory" description="Track robotics kits, drones, and lab equipment with allocation and maintenance logs." />;
      case "audit":
        return <PlaceholderView title="Audit Logs" description="Searchable audit trail for sensitive actions: role changes, exports, mark edits, and transfers." />;
      case "settings":
        return <PlaceholderView title="Settings & Configuration" description="Academic years, grading scales, alert thresholds, notification preferences, and role management." />;
      default:
        return <DashboardView />;
    }
  };

  const activeItem = navItems.find((n) => n.id === activeNav);

  return (
    <div style={styles.app}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>E</div>
          <div>
            <div style={styles.logoText}>Eduratnam</div>
            <div style={styles.logoSub}>School-Tech Platform</div>
          </div>
        </div>
        <nav style={styles.nav}>
          {navItems.map((item) => (
            <button
              key={item.id}
              style={{
                ...styles.navItem,
                ...(activeNav === item.id ? styles.navItemActive : {}),
              }}
              onClick={() => setActiveNav(item.id)}
              onMouseEnter={(e) => {
                if (activeNav !== item.id) e.currentTarget.style.background = "#1e293b55";
              }}
              onMouseLeave={(e) => {
                if (activeNav !== item.id) e.currentTarget.style.background = "transparent";
              }}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div style={{ padding: "16px 20px", borderTop: "1px solid #1e293b", fontSize: "11px", color: "#475569" }}>
          v1.0 · 22 Oct 2026
          <br />
          <span style={{ color: "#334155" }}>Draft for discovery</span>
        </div>
      </aside>

      {/* MAIN */}
      <div style={styles.main}>
        {/* HEADER */}
        <header style={styles.header}>
          <div>
            <div style={styles.headerTitle}>{activeItem?.label || "Dashboard"}</div>
            <div style={styles.headerSub}>
              Eduratnam School Management Platform · Super Admin Dashboard
            </div>
          </div>
          <div style={styles.headerRight}>
            <input
              style={styles.searchBox}
              placeholder="Search schools, students, trainers..."
            />
            <button style={styles.iconBtn} title="Notifications">
              Bell
              <span style={styles.badge}>5</span>
            </button>
            <button style={styles.iconBtn} title="Help">
              Help
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={styles.avatar}>SA</div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>
                  Super Admin
                </div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>
                  Eduratnam Innovation
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main style={styles.content}>{renderView()}</main>

        {/* FOOTER */}
        <footer
          style={{
            padding: "16px 28px",
            borderTop: "1px solid #e2e8f0",
            background: "#fff",
            fontSize: "12px",
            color: "#64748b",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <span>© 2026 Eduratnam Innovation (OPC) Pvt. Ltd. · All rights reserved</span>
          <span>One reliable source of truth · 218 Schools · 24,850 Students · 342 Trainers</span>
        </footer>
      </div>
    </div>
  );
}