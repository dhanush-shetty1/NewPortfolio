import windowWrapper from '#hoc/windowWrapper'
import { useState, useCallback } from 'react'
import { Mail, Phone, User, MessageSquare } from 'lucide-react'
import { WindowControlls } from '#components'

const inputStyle = {
  width: '100%',
  padding: '8px 12px 8px 32px',
  borderRadius: '8px',
  border: '1px solid rgba(0,0,0,0.12)',
  background: 'rgba(255,255,255,0.9)',
  fontSize: '13px',
  color: '#1d1d1f',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}

const labelStyle = {
  fontSize: '11px',
  fontWeight: '600',
  color: '#6e6e73',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  display: 'block',
  marginBottom: '6px',
}

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState(null)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const getBorder = (field) => ({
    ...inputStyle,
    borderColor: focused === field ? '#007aff' : 'rgba(0,0,0,0.12)',
  })

  return (
    <>
      <div id="window-header">
        <WindowControlls target="contact" />
        <h2>Contact</h2>
      </div>

      <div style={{ display: 'flex', height: '100%', overflow: 'hidden', background: '#f5f5f7' }}>

        {/* Left Panel */}
        <div style={{
          width: '44%',
          borderRight: '1px solid rgba(0,0,0,0.08)',
          background: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 20px',
          gap: '20px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src="/images/pp.jpeg"
                alt="Dhanush"
                style={{
                  width: '88px',
                  height: '88px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                  border: '2px solid rgba(255,255,255,0.8)',
                  display: 'block',
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '3px',
                right: '3px',
                width: '13px',
                height: '13px',
                borderRadius: '50%',
                background: '#34c759',
                border: '2px solid white',
              }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '15px', fontWeight: '600', color: '#1d1d1f', margin: 0 }}>Dhanush Shetty</p>
              <p style={{ fontSize: '12px', color: '#86868b', margin: '3px 0 0' }}>Full Stack Developer</p>
            </div>
          </div>

          <p style={{ fontSize: '12px', color: '#6e6e73', textAlign: 'center', lineHeight: '1.6', maxWidth: '190px', margin: 0 }}>
            Got a project in mind or just want to say hi? Drop a message.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '10px',
              background: 'rgba(0,0,0,0.04)',
              border: '1px solid rgba(0,0,0,0.06)',
              minWidth: 0,
            }}>
              <Mail size={14} style={{ color: '#007aff', flexShrink: 0 }} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <p style={{ fontSize: '10px', color: '#86868b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 2px' }}>Email</p>
                <p style={{ fontSize: '10.5px', color: '#1d1d1f', fontWeight: '500', margin: 0, wordBreak: 'break-all', lineHeight: '1.4' }}>
                  dhanushshetty1217@gmail.com
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '10px',
              background: 'rgba(0,0,0,0.04)',
              border: '1px solid rgba(0,0,0,0.06)',
            }}>
              <Phone size={14} style={{ color: '#34c759', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: '10px', color: '#86868b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 2px' }}>Phone</p>
                <p style={{ fontSize: '11.5px', color: '#1d1d1f', fontWeight: '500', margin: 0 }}>+91 7506490134</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.85)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '32px 28px',
          gap: '16px',
          overflowY: 'auto',
        }}>
          <div>
            <p style={{ fontSize: '16px', fontWeight: '600', color: '#1d1d1f', margin: '0 0 4px' }}>Send a Message</p>
            <p style={{ fontSize: '12px', color: '#86868b', margin: 0 }}>I'll get back to you within 24 hours.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Name</label>
              <div style={{ position: 'relative' }}>
                <User size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#aeaeb2', pointerEvents: 'none' }} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  placeholder="Your name"
                  style={getBorder('name')}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#aeaeb2', pointerEvents: 'none' }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="your@email.com"
                  style={getBorder('email')}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Message</label>
              <div style={{ position: 'relative' }}>
                <MessageSquare size={13} style={{ position: 'absolute', left: '10px', top: '10px', color: '#aeaeb2', pointerEvents: 'none' }} />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  placeholder="What's on your mind?"
                  rows={4}
                  style={{ ...getBorder('message'), resize: 'none' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const ContactWindow = windowWrapper(Contact, 'contact')
export default ContactWindow