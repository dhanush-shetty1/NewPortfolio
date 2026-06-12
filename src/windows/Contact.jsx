import windowWrapper from '#hoc/windowWrapper'
import { useState, useCallback } from 'react'
import { Mail, Phone, User, MessageSquare, CheckCircle, Send } from 'lucide-react'
import { WindowControlls } from '#components'
import clsx from 'clsx'

const labelStyle = {
  fontSize: '11px',
  fontWeight: '600',
  color: '#86868b',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  display: 'block',
  marginBottom: '4px',
}

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState(null)
  const [isSent, setIsSent] = useState(false)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    
    // Trigger macOS Alert sheet
    setIsSent(true)
    setTimeout(() => {
      setIsSent(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  const getBorderClass = (field) => {
    return clsx(
      "w-full pl-9 pr-3 py-1.5 rounded-lg border text-[13px] text-neutral-800 bg-white outline-none transition-all",
      focused === field ? "border-[#007aff] ring-2 ring-[#007aff]/20" : "border-neutral-200 hover:border-neutral-300"
    )
  }

  return (
    <div className="w-[640px] h-[440px] flex flex-col bg-[#f5f5f7] rounded-xl overflow-hidden font-sans select-none text-[#1d1d1f] border border-black/15 shadow-2xl relative">
      {/* Unified macOS Title Bar */}
      <div className="flex items-center px-4 h-11 bg-[#ececec] border-b border-[#dcdcdc] select-none shrink-0 relative">
        <WindowControlls target="contact" />
        <span className="absolute left-1/2 -translate-x-1/2 text-[13px] text-neutral-700 font-semibold pointer-events-none">
          Contact
        </span>
      </div>

      {/* macOS Alert Sheet (Message Sent Popover) */}
      {isSent && (
        <div className="absolute top-11 inset-x-0 mx-auto w-80 bg-white/95 backdrop-blur border-b border-x border-black/10 rounded-b-xl shadow-lg p-4 z-50 flex flex-col items-center gap-3 animate-fade-in-down duration-300">
          <CheckCircle size={28} className="text-[#34c759]" />
          <div className="text-center">
            <h4 className="text-sm font-semibold text-neutral-800">Message Sent Successfully</h4>
            <p className="text-[11px] text-neutral-500 mt-1">Thanks, {formData.name}! I'll get back to you shortly.</p>
          </div>
        </div>
      )}

      {/* Contact Window Split view */}
      <div className="flex flex-1 overflow-hidden h-full">
        
        {/* Left Panel: macOS Contact Card Details */}
        <div className="w-[260px] border-r border-[#e5e5e5] bg-[#f3f3f6]/80 backdrop-blur-md flex flex-col items-center justify-between p-6 select-none shrink-0">
          <div className="flex flex-col items-center gap-4 w-full">
            {/* Avatar & Online Dot */}
            <div className="relative group hover:scale-[1.02] transition-transform duration-300">
              <img
                src="/images/pp.jpeg"
                alt="Dhanush"
                className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-white/90"
              />
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-[#34c759] border-2 border-[#f3f3f6] rounded-full shadow-sm" />
            </div>

            {/* Name & Title */}
            <div className="text-center">
              <h3 className="text-[16px] font-bold text-neutral-800 leading-tight">Dhanush Shetty</h3>
              <p className="text-[11px] text-neutral-400 font-medium mt-0.5">Full Stack Developer</p>
            </div>

            {/* macOS Circular Action Button Bar */}
            <div className="flex justify-center gap-4 mt-1">
              <div className="flex flex-col items-center">
                <a
                  href="#message-form"
                  className="w-10 h-10 rounded-full bg-[#007aff]/10 hover:bg-[#007aff]/15 text-[#007aff] flex items-center justify-center transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementsByName('name')[0]?.focus();
                  }}
                >
                  <MessageSquare size={16} />
                </a>
                <span className="text-[9px] text-neutral-400 mt-1 select-none font-medium">message</span>
              </div>

              <div className="flex flex-col items-center">
                <a
                  href="tel:+917506490134"
                  className="w-10 h-10 rounded-full bg-[#34c759]/10 hover:bg-[#34c759]/15 text-[#34c759] flex items-center justify-center transition-colors"
                >
                  <Phone size={16} />
                </a>
                <span className="text-[9px] text-neutral-400 mt-1 select-none font-medium">call</span>
              </div>

              <div className="flex flex-col items-center">
                <a
                  href="mailto:dhanushshetty1217@gmail.com"
                  className="w-10 h-10 rounded-full bg-[#007aff]/10 hover:bg-[#007aff]/15 text-[#007aff] flex items-center justify-center transition-colors"
                >
                  <Mail size={16} />
                </a>
                <span className="text-[9px] text-neutral-400 mt-1 select-none font-medium">mail</span>
              </div>
            </div>
          </div>

          {/* Contact Fields Info Cards */}
          <div className="w-full space-y-2.5 mt-4">
            <a
              href="mailto:dhanushshetty1217@gmail.com"
              className="block bg-black/[0.03] hover:bg-black/[0.06] border border-black/[0.04] rounded-xl p-2.5 transition-all"
            >
              <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider block mb-0.5">Email</span>
              <span className="text-[10px] text-neutral-700 font-medium break-all block leading-tight">dhanushshetty1217@gmail.com</span>
            </a>

            <a
              href="tel:+917506490134"
              className="block bg-black/[0.03] hover:bg-black/[0.06] border border-black/[0.04] rounded-xl p-2.5 transition-all"
            >
              <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider block mb-0.5">Phone</span>
              <span className="text-[10.5px] text-neutral-700 font-medium block leading-none">+91 7506490134</span>
            </a>
          </div>
        </div>

        {/* Right Panel: Send a Message Form */}
        <form
          id="message-form"
          onSubmit={handleSubmit}
          className="flex-1 bg-white flex flex-col p-7 justify-between overflow-y-auto"
        >
          {/* Header */}
          <div>
            <h3 className="text-base font-bold text-neutral-800">Send a Message</h3>
            <p className="text-[11px] text-neutral-400 mt-0.5">Drop Dhanush a note and he'll reply in 24 hours.</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-3 mt-4">
            <div>
              <label style={labelStyle}>Name</label>
              <div className="relative">
                <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  placeholder="Dhanush Shetty"
                  className={getBorderClass('name')}
                  required
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Email</label>
              <div className="relative">
                <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="dhanush@gmail.com"
                  className={getBorderClass('email')}
                  required
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Message</label>
              <div className="relative">
                <MessageSquare size={13} className="absolute left-3.5 top-3 text-neutral-400 pointer-events-none" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  placeholder="Hi Dhanush, I'd love to chat about..."
                  rows={3}
                  className={clsx(getBorderClass('message'), "pl-9 resize-none py-2")}
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-5 py-1.5 rounded-lg bg-[#007aff] hover:bg-[#0062cc] active:bg-[#0052ad] text-white text-[13px] font-medium shadow-sm transition-all flex items-center gap-1.5 border-none outline-none cursor-default"
            >
              <Send size={12} />
              <span>Send Message</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

const ContactWindow = windowWrapper(Contact, 'contact')
export default ContactWindow