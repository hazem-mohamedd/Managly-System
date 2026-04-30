import React, { useState, useEffect } from 'react'
import { Download } from 'lucide-react'
import { api } from '../../api/api'
import './Pages.css'

const SupervisorEmployees = () => {

  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  // =========================
  // FETCH TEAM
  // =========================
  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    try {
      setLoading(true)

      const res = await api.get('/team/members')

      // 🔥 handle كل أشكال الريسبونس
      if (Array.isArray(res)) {
        setEmployees(res)
      } else if (Array.isArray(res.data)) {
        setEmployees(res.data)
      } else if (Array.isArray(res.data?.data)) {
        setEmployees(res.data.data)
      } else {
        setEmployees([])
      }

    } catch (err) {
      console.error("Error fetching team:", err)
      setEmployees([])
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // STATUS COLOR
  // =========================
  const getStatusClass = (status) => {
    if (status === 'present') return 'badge success'
    if (status === 'late') return 'badge warning'
    if (status === 'leave') return 'badge info'
    return 'badge danger' // absent
  }

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        Loading team...
      </div>
    )
  }

  return (
    <div>

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Team Directory</h1>
          <p style={{ fontSize: '0.9rem' }}>
            Manage your team members and their performance
          </p>
        </div>

        
      </div>

      {/* TABLE */}
      <div className="glass-panel" style={{ marginTop: 20 }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Job / Dept</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Tasks</th>
            </tr>
          </thead>

          <tbody>
            {employees.map(emp => (
              <tr key={emp.user_id}>

                {/* ID */}
                <td>
                  <strong>#{emp.user_id}</strong>
                </td>

                {/* EMPLOYEE */}
                <td>
                  <div>
                    <div style={{ fontWeight: 600 }}>
                      {emp.first_name} {emp.last_name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {emp.email}
                    </div>
                  </div>
                </td>

                {/* JOB */}
                <td>
                  <div style={{ fontWeight: 500 }}>
                    {emp.job_title || 'N/A'}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {emp.dep_name}
                  </div>
                </td>

                {/* CONTACT */}
                <td>
                  {emp.phone || '—'}
                </td>

                {/* STATUS */}
                <td>
                  <span className={getStatusClass(emp.attendance_status)}>
                    {emp.attendance_status}
                  </span>
                </td>

                {/* TASKS */}
                <td>
                  <div style={{ fontSize: 13 }}>
                    <div>Pending: {emp.pending_tasks}</div>
                    <div>Progress: {emp.in_progress_tasks}</div>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default SupervisorEmployees