import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Users, BookOpen, MessageCircle, Plus, Trash2, Edit,
  Search, LogOut, ArrowLeft, CheckCircle, XCircle, School, TrendingUp, DollarSign
} from 'lucide-react';

/* ============================================================
   🔐 ADMIN DASHBOARD COMPONENT
   ============================================================ */
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // --- MOCK DATA STATES ---
  const [students, setStudents] = useState([
    { id: 1, name: 'Aarav Sharma', email: 'aarav@gmail.com', phone: '9876543210', course: 'Python', status: 'Active', date: '2025-10-25' },
    { id: 2, name: 'Priya Singh', email: 'priya@gmail.com', phone: '9876543211', course: 'Robotics', status: 'Active', date: '2025-10-26' },
    { id: 3, name: 'Rohan Kumar', email: 'rohan@gmail.com', phone: '9876543212', course: 'Generative AI', status: 'Pending', date: '2025-10-27' },
  ]);

  const [courses, setCourses] = useState([
    { id: 1, title: 'Python Programming', price: '₹ 6,999', students: 120, status: 'Active' },
    { id: 2, title: 'Generative AI', price: '₹ 9,999', students: 85, status: 'Active' },
    { id: 3, title: 'Robotics', price: '₹ 12,999', students: 60, status: 'Active' },
    { id: 4, title: 'Drone Technology', price: '₹ 14,999', students: 45, status: 'Active' },
  ]);

  const [enquiries, setEnquiries] = useState([
    { id: 1, name: 'Karan Patel', phone: '9876543210', type: 'Student', course: 'Drone Tech', date: 'Today, 10:30 AM', status: 'New' },
    { id: 2, name: 'Neha Gupta', phone: '9988776655', type: 'Student', course: 'Machine Learning', date: 'Yesterday, 4:15 PM', status: 'Contacted' },
    { id: 3, name: 'Delhi Public School', phone: '011-2345678', type: 'School', course: 'STEM Lab Setup', date: 'Yesterday, 11:00 AM', status: 'New' },
    { id: 4, name: 'Greenwood High', phone: '080-9876543', type: 'School', course: 'Teacher Training', date: '2 days ago', status: 'Proposal Sent' },
  ]);

  // --- FORM STATES ---
  const [newStudent, setNewStudent] = useState({ name: '', email: '', phone: '', course: 'Python Programming' });
  const [editStudent, setEditStudent] = useState(null);

  // --- HANDLERS ---
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (editStudent) {
      setStudents(students.map(s => s.id === editStudent.id ? { ...editStudent, ...newStudent } : s));
      setEditStudent(null);
    } else {
      setStudents([...students, { id: Date.now(), ...newStudent, status: 'Active', date: new Date().toISOString().split('T')[0] }]);
    }
    setNewStudent({ name: '', email: '', phone: '', course: 'Python Programming' });
    setActiveTab('students'); // Redirect back to list
  };

  const handleDeleteStudent = (id) => {
    if(window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const startEdit = (student) => {
    setEditStudent(student);
    setNewStudent({ name: student.name, email: student.email, phone: student.phone, course: student.course });
    setActiveTab('add-student');
  };

  return (
    <div className="bg-[#0B1120] min-h-screen flex flex-col md:flex-row text-white font-sans">
      
      {/* ================= SIDEBAR ================= */}
      <div className="w-full md:w-64 bg-[#0F172A] border-r border-white/10 md:min-h-screen p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1E40AF] to-[#7C3AED] flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <div>
            <p className="text-white font-bold text-sm">Admin Panel</p>
            <p className="text-[10px] text-white/50 mono uppercase">EduRatnam</p>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'students', label: 'Students', icon: Users },
            { id: 'add-student', label: editStudent ? 'Edit Student' : 'Add Student', icon: Plus },
            { id: 'courses', label: 'Manage Courses', icon: BookOpen },
            { id: 'enquiries', label: 'Enquiries & Leads', icon: MessageCircle },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); if(item.id !== 'add-student') setEditStudent(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === item.id ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20' : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-white/10">
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition">
            <LogOut size={18} /> Back to Website
          </Link>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        
        {/* --- OVERVIEW TAB --- */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold font-display mb-8">Dashboard Overview</h1>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <div className="bg-[#0F172A] border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-[#1E40AF]/50 transition">
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <p className="text-white/50 text-sm mb-1">Total Students</p>
                    <h2 className="text-3xl font-bold text-white">{students.length}</h2>
                  </div>
                  <div className="p-2 bg-[#1E40AF]/20 rounded-lg text-[#00E5FF]"><Users size={20} /></div>
                </div>
                <p className="text-xs text-[#10B981] flex items-center gap-1 relative z-10"><TrendingUp size={12}/> +12% this month</p>
              </div>

              <div className="bg-[#0F172A] border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-[#7C3AED]/50 transition">
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <p className="text-white/50 text-sm mb-1">Active Courses</p>
                    <h2 className="text-3xl font-bold text-white">{courses.length}</h2>
                  </div>
                  <div className="p-2 bg-[#7C3AED]/20 rounded-lg text-[#A855F7]"><BookOpen size={20} /></div>
                </div>
                <p className="text-xs text-[#10B981] flex items-center gap-1 relative z-10"><TrendingUp size={12}/> +2 new courses</p>
              </div>

              <div className="bg-[#0F172A] border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-[#F59E0B]/50 transition">
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <p className="text-white/50 text-sm mb-1">Total Enquiries</p>
                    <h2 className="text-3xl font-bold text-white">{enquiries.length}</h2>
                  </div>
                  <div className="p-2 bg-[#F59E0B]/20 rounded-lg text-[#F59E0B]"><MessageCircle size={20} /></div>
                </div>
                <p className="text-xs text-[#EF4444] flex items-center gap-1 relative z-10"><TrendingUp size={12}/> 3 pending replies</p>
              </div>

              <div className="bg-[#0F172A] border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-[#10B981]/50 transition">
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <p className="text-white/50 text-sm mb-1">Estimated Revenue</p>
                    <h2 className="text-3xl font-bold text-white">₹ 4.5L</h2>
                  </div>
                  <div className="p-2 bg-[#10B981]/20 rounded-lg text-[#10B981]"><DollarSign size={20} /></div>
                </div>
                <p className="text-xs text-[#10B981] flex items-center gap-1 relative z-10"><TrendingUp size={12}/> +18% vs last month</p>
              </div>
            </div>

            {/* Simple CSS Bar Chart */}
            <div className="bg-[#0F172A] border border-white/10 p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-6">Enrollment Trends (Last 6 Months)</h3>
              <div className="flex items-end gap-4 h-48">
                {[40, 65, 50, 80, 95, 75].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-white/5 rounded-t-md relative flex items-end justify-center h-full">
                      <div 
                        className="w-full bg-gradient-to-t from-[#1E40AF] to-[#00E5FF] rounded-t-md group-hover:opacity-80 transition" 
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-white/50">{['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- STUDENTS TAB --- */}
        {activeTab === 'students' && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold font-display">Student Management</h1>
              <button onClick={() => setActiveTab('add-student')} className="bg-[#00E5FF] text-[#0B1120] px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-white transition">
                <Plus size={16}/> Add Student
              </button>
            </div>
            
            <div className="bg-[#0F172A] border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-white/70">
                  <thead className="bg-white/5 text-white font-bold">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Contact</th>
                      <th className="px-6 py-4">Course</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Joined Date</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {students.map(s => (
                      <tr key={s.id} className="hover:bg-white/5 transition">
                        <td className="px-6 py-4 text-white font-medium">{s.name}</td>
                        <td className="px-6 py-4">
                          <p>{s.email}</p>
                          <p className="text-xs text-white/40">{s.phone}</p>
                        </td>
                        <td className="px-6 py-4"><span className="px-2.5 py-1 rounded bg-[#00E5FF]/10 text-[#00E5FF]">{s.course}</span></td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs ${s.status === 'Active' ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-yellow-500/20 text-yellow-500'}`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs mono">{s.date}</td>
                        <td className="px-6 py-4 flex justify-end gap-2">
                          <button onClick={() => startEdit(s)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-blue-400 transition" title="Edit"><Edit size={16} /></button>
                          <button onClick={() => handleDeleteStudent(s.id)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-red-400 transition" title="Delete"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- ADD/EDIT STUDENT TAB --- */}
        {activeTab === 'add-student' && (
          <div className="max-w-2xl animate-fade-in">
            <button onClick={() => { setActiveTab('students'); setEditStudent(null); setNewStudent({ name: '', email: '', phone: '', course: 'Python Programming' }); }} className="text-white/50 hover:text-white flex items-center gap-2 mb-6 text-sm transition">
              <ArrowLeft size={16} /> Back to Students
            </button>
            <h1 className="text-3xl font-bold font-display mb-8">{editStudent ? 'Edit Student' : 'Add New Student'}</h1>
            
            <form onSubmit={handleAddStudent} className="bg-[#0F172A] border border-white/10 p-8 rounded-2xl space-y-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Full Name</label>
                  <input type="text" value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00E5FF] outline-none" />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Email Address</label>
                  <input type="email" value={newStudent.email} onChange={(e) => setNewStudent({...newStudent, email: e.target.value})} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00E5FF] outline-none" />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Phone Number</label>
                  <input type="tel" value={newStudent.phone} onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00E5FF] outline-none" />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Course</label>
                  <select value={newStudent.course} onChange={(e) => setNewStudent({...newStudent, course: e.target.value})} className="w-full bg-[#0B1120] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00E5FF] outline-none">
                    {courses.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] text-white font-bold py-3.5 rounded-xl hover:shadow-lg transition">
                {editStudent ? 'Save Changes' : 'Add Student'}
              </button>
            </form>
          </div>
        )}

        {/* --- COURSES TAB --- */}
        {activeTab === 'courses' && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold font-display">Manage Courses</h1>
              <button className="bg-[#00E5FF] text-[#0B1120] px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-white transition"><Plus size={16}/> Add New Course</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(c => (
                <div key={c.id} className="bg-[#0F172A] border border-white/10 p-6 rounded-2xl flex flex-col justify-between group hover:border-[#00E5FF]/30 transition">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-white/5 rounded-xl"><BookOpen className="text-[#00E5FF]" size={24} /></div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-blue-400"><Edit size={14} /></button>
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-red-400"><Trash2 size={14} /></button>
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1">{c.title}</h3>
                    <p className="text-[#F59E0B] font-bold mb-3">{c.price}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="text-white/50 text-sm flex items-center gap-2"><Users size={14}/> {c.students} Enrolled</span>
                    <span className="px-2.5 py-1 rounded text-xs bg-[#10B981]/20 text-[#10B981]">{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ENQUIRIES TAB --- */}
        {activeTab === 'enquiries' && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold font-display mb-8">Enquiries & Leads</h1>
            
            <div className="flex gap-4 mb-6">
              <button className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium">All Leads ({enquiries.length})</button>
              <button className="px-4 py-2 text-white/50 hover:text-white rounded-lg text-sm font-medium transition flex items-center gap-2"><School size={16}/> Schools</button>
              <button className="px-4 py-2 text-white/50 hover:text-white rounded-lg text-sm font-medium transition flex items-center gap-2"><Users size={16}/> Students</button>
            </div>

            <div className="space-y-4">
              {enquiries.map(enq => (
                <div key={enq.id} className="bg-[#0F172A] border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-white/20 transition">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl mt-1 ${enq.type === 'School' ? 'bg-[#7C3AED]/20 text-[#A855F7]' : 'bg-[#00E5FF]/20 text-[#00E5FF]'}`}>
                      {enq.type === 'School' ? <School size={20} /> : <Users size={20} />}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg flex items-center gap-2">
                        {enq.name} 
                        <span className="text-[10px] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-white/60 font-normal">{enq.type}</span>
                      </h3>
                      <p className="text-white/60 text-sm mt-1">{enq.phone} • <span className="text-[#00E5FF]">{enq.course}</span></p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end gap-2">
                    <span className="text-white/40 text-xs mono">{enq.date}</span>
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs ${enq.status === 'New' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/60'}`}>{enq.status}</span>
                      <button className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-lg text-white text-sm font-medium transition">Call Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}