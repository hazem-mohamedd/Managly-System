import React, { useState, useEffect } from 'react';
import { Check, X, Eye, Loader2, Calendar, User, FileText, Info } from 'lucide-react';
import { api } from '../../api/api'; 
import CustomSelect from '../data/CustomSelect';
import './Pages.css';

const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 12px',
  border: '1px solid #e5e7eb',
  borderRadius: '10px',
  background: '#f9fafb'
};

const leaveTypeLabel = { 
    annual: 'Annual', sick: 'Sick', casual: 'Casual', emergency: 'Emergency' 
};

const SupervisorLeaveRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const response = await api.get('/supervisor/leave-requests');
            const fetchedData = response.data.data || response.data || [];
            setRequests(fetchedData);
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, status) => {
        try {
            if (status === 'approved') {
                await api.put(`/leave/${id}/approve`);
            }

            if (status === 'rejected') {
                await api.put(`/leave/${id}/reject`);
            }

            setRequests(prev =>
                prev.map(req =>
                    req.id === id ? { ...req, status } : req
                )
            );

            if (selectedRequest?.id === id) {
                setSelectedRequest(prev => ({ ...prev, status }));
            }

        } catch (err) {
            console.error(err);
            alert('Action failed');
        }
    };

    const truncateText = (text, limit = 20) => {
        if (!text) return '---';
        return text.length > limit ? text.substring(0, limit) + "..." : text;
    };

    if (loading) {
        return (
            <div className="loader-container">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="fade-in">
            <div className="page-header">
                <h1 className="page-title">Team Leaves Control</h1>
            </div>

            <div className="glass-panel" style={{ overflow: 'visible' }}>
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(req => (
                            <tr key={req.id}>
                                <td style={{ fontWeight: 600 }}>
                                    <div className="emp-info">
                                        <span>{req.first_name} {req.last_name}</span>
                                        <small>{req.dep_name}</small>
                                    </div>
                                </td>

                                <td>
                                    <span className="badge-lite info-lite">
                                        {leaveTypeLabel[req.leave_type] || req.leave_type}
                                    </span>
                                </td>

                                <td className="date-cell">{req.start_date}</td>
                                <td className="date-cell">{req.end_date}</td>
                                <td className="reason-cell">{truncateText(req.reason)}</td>

                                <td>
                                    <div 
                                        className={`status-pill ${req.status}`}
                                        style={{
                                            textTransform: 'capitalize',
                                            padding: '4px 10px',
                                            borderRadius: '999px',
                                            fontSize: '12px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {req.status}
                                    </div>
                                </td>

                                <td>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '10px'
                                        }}
                                    >
                                        {/* View */}
                                        <button
                                            onClick={() => setSelectedRequest(req)}
                                            style={{
                                                background: '#f1f5f9',
                                                border: 'none',
                                                borderRadius: '8px',
                                                padding: '6px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Eye size={16} />
                                        </button>

                                        {/* Actions */}
                                        {req.status === 'pending' ? (
                                            <div style={{ display: 'flex', gap: '6px' }}>
                                                <button
                                                    onClick={() => handleAction(req.id, 'approved')}
                                                    style={{
                                                        background: '#22c55e',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '6px 10px',
                                                        borderRadius: '6px',
                                                        fontSize: '12px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                >
                                                    <Check size={14} /> Approve
                                                </button>

                                                <button
                                                    onClick={() => handleAction(req.id, 'rejected')}
                                                    style={{
                                                        background: '#ef4444',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '6px 10px',
                                                        borderRadius: '6px',
                                                        fontSize: '12px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                >
                                                    <X size={14} /> Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <div style={{ minWidth: '120px' }}>
                                                <CustomSelect
                                                    value={req.status}
                                                    onChange={(val) => handleAction(req.id, val)}
                                                    options={[
                                                        { value: 'approved', label: 'Approved' },
                                                        { value: 'rejected', label: 'Rejected' },
                                                        { value: 'pending', label: 'Pending' },
                                                    ]}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
{selectedRequest && (
  <div 
    className="modal-overlay"
    style={{
      background: 'rgba(0,0,0,0.4)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    onClick={() => setSelectedRequest(null)}
  >
    <div 
      className="modal-content"
      onClick={e => e.stopPropagation()}
      style={{
        width: '420px',
        borderRadius: '16px',
        padding: '24px',
        background: 'white',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
      }}
    >

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700' }}>
          Leave Request
        </h2>

        <button 
          onClick={() => setSelectedRequest(null)}
          style={{
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Employee */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div style={{
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          background: '#3b82f6',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '700'
        }}>
          {selectedRequest.first_name[0].toUpperCase()}
        </div>

        <div>
          <div style={{ fontWeight: '600' }}>
            {selectedRequest.first_name} {selectedRequest.last_name}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            {selectedRequest.dep_name}
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div style={{ display: 'grid', gap: '12px' }}>

        <div style={cardStyle}>
          <Calendar size={16} />
          <div>
            <label>Date</label>
            <p>{selectedRequest.start_date} → {selectedRequest.end_date}</p>
          </div>
        </div>

        <div style={cardStyle}>
          <Info size={16} />
          <div>
            <label>Type</label>
            <p>{leaveTypeLabel[selectedRequest.leave_type]}</p>
          </div>
        </div>

        <div style={cardStyle}>
          <FileText size={16} />
          <div>
            <label>Reason</label>
            <p style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              lineHeight: '1.6',
              fontSize: '14px',
              color: '#334155'
            }}>
              {selectedRequest.reason || "No reason provided."}
            </p>
          </div>
        </div>

        {selectedRequest.sick_pdf && (
          <div style={cardStyle}>
            <Eye size={16} />
            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <label>Medical Report</label>
                <p>Attachment attached</p>
              </div>
              <a 
                href={`http://127.0.0.1:8000/${selectedRequest.sick_pdf}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                View File
              </a>
            </div>
          </div>
        )}

      </div>

      {/* Status */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <span style={{
          padding: '6px 14px',
          borderRadius: '999px',
          fontSize: '12px',
          fontWeight: '600',
          background:
            selectedRequest.status === 'approved'
              ? '#dcfce7'
              : selectedRequest.status === 'rejected'
              ? '#fee2e2'
              : '#fef9c3',
          color:
            selectedRequest.status === 'approved'
              ? '#166534'
              : selectedRequest.status === 'rejected'
              ? '#991b1b'
              : '#92400e'
        }}>
          {selectedRequest.status.toUpperCase()}
        </span>
      </div>

    </div>
  </div>
)}
        </div>
    );
};

export default SupervisorLeaveRequests;