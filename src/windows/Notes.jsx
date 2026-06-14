import React, { useState, useEffect, useRef } from "react";
import windowWrapper from "#hoc/windowWrapper.jsx";
import { WindowControlls } from "#components";
import { motion, AnimatePresence } from "framer-motion";
import {
  SquarePen,
  Type,
  Table,
  CheckSquare,
  Paperclip,
  Tag,
  Share2,
  MoreHorizontal,
  Search,
  Trash2,
  Folder,
  Users,
  ChevronLeft,
} from "lucide-react";

// Local hook for window size to determine responsive layout
const useWindowSize = () => {
  const [size, setSize] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ winWidth: window.innerWidth, winHeight: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

const INITIAL_NOTES = [
  {
    id: "1",
    title: "Project Ideas 2026",
    body: "1. Upgrade macOS Portfolio to Ventura/Sonoma layout\n2. Integrate interactive Apple Calculator app\n3. Optimize GSAP window dragging performance\n4. Add light/dark theme toggle to top menu",
    date: "Today",
    dateISO: "2026-06-13",
    pinned: true,
    color: "#FFCC00",
  },
  {
    id: "2",
    title: "Interview Prep",
    body: "- NODE.jS\n- Mongo\n- Express\n- Docker\n- Redux\n- JWT\n- Resume\n- One nice Project",
    date: "Yesterday",
    dateISO: "2026-06-12",
  },
];

const DATE_BUCKET_ORDER = [
  "Previous 7 Days",
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "Older",
];

function dateBucket(note) {
  const iso = note.dateISO;
  if (!iso) {
    const d = note.date.toLowerCase();
    if (
      d === "today" ||
      d === "now" ||
      d === "thursday" ||
      d === "friday" ||
      d === "saturday" ||
      d === "sunday" ||
      d === "monday" ||
      d === "tuesday" ||
      d === "wednesday" ||
      d === "yesterday"
    )
      return "Previous 7 Days";
    return "Older";
  }
  const year = iso.slice(0, 4);
  const noteDate = new Date(iso);
  const now = new Date();
  const diffDays = (now.getTime() - noteDate.getTime()) / (1000 * 60 * 60 * 24);
  if (diffDays <= 7 && diffDays >= 0) return "Previous 7 Days";
  return year;
}

function groupNotes(notesList) {
  const map = {};
  for (const n of notesList) {
    const b = dateBucket(n);
    if (!map[b]) map[b] = [];
    map[b].push(n);
  }
  return DATE_BUCKET_ORDER.filter((b) => map[b]?.length).map((b) => ({
    bucket: b,
    notes: map[b],
  }));
}

// Sub-components moved outside the parent component to prevent unmounting issues
const NoteRow = ({ note, selected, isMobile, setSelected, setMobileView }) => (
  <motion.div
    initial={{ opacity: 0, x: -8 }}
    animate={{ opacity: 1, x: 0 }}
    onClick={() => {
      setSelected(note.id);
      if (isMobile) setMobileView("editor");
    }}
    style={{
      padding: "9px 14px",
      borderRadius: "8px",
      margin: "1px 6px",
      cursor: "default",
      background: selected === note.id ? "rgba(255,204,0,0.22)" : "transparent",
      transition: "background 0.15s ease",
      display: "flex",
      gap: "8px",
      alignItems: "flex-start",
    }}
    onMouseEnter={(e) => {
      if (selected !== note.id) {
        e.currentTarget.style.background = "rgba(0,0,0,0.04)";
      }
    }}
    onMouseLeave={(e) => {
      if (selected !== note.id) {
        e.currentTarget.style.background = "transparent";
      }
    }}
  >
    {note.color && (
      <div
        style={{
          width: 3,
          borderRadius: 2,
          background: note.color,
          alignSelf: "stretch",
          flexShrink: 0,
        }}
      />
    )}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#1c1c1e",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {note.title || "Untitled"}
      </div>
      <div style={{ display: "flex", gap: "6px", marginTop: "1px" }}>
        <span style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", flexShrink: 0 }}>
          {note.date}
        </span>
        <span
          style={{
            fontSize: "11px",
            color: "rgba(0,0,0,0.35)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {note.body.slice(0, 28) || "No additional text"}
        </span>
      </div>
    </div>
  </motion.div>
);

const GroupHeader = ({ label }) => (
  <div
    style={{
      fontSize: "11px",
      fontWeight: 700,
      color: "rgba(0,0,0,0.35)",
      padding: "10px 14px 4px",
      letterSpacing: "0.02em",
      textTransform: "uppercase",
    }}
  >
    {label}
  </div>
);

const Notes = () => {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [selected, setSelected] = useState(INITIAL_NOTES[0]?.id || "");
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("notes");
  const textareaRef = useRef(null);

  const { winWidth } = useWindowSize();
  const isMobile = winWidth < 768;
  const [mobileView, setMobileView] = useState("list");

  const activeNote = notes.find((n) => n.id === selected);

  const filtered = search.trim()
    ? notes.filter(
        (n) =>
          n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.body.toLowerCase().includes(search.toLowerCase())
      )
    : notes;

  const pinned = filtered.filter((n) => n.pinned);
  const regular = filtered.filter((n) => !n.pinned);
  const groups = groupNotes(regular);

  const updateNote = (field, val) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === selected ? { ...n, [field]: val } : n))
    );
  };

  const newNote = () => {
    const id = Date.now().toString();
    const note = {
      id,
      title: "New Note",
      body: "",
      date: "Now",
      dateISO: new Date().toISOString().slice(0, 10),
    };
    setNotes((prev) => [note, ...prev]);
    setSelected(id);
    if (isMobile) setMobileView("editor");
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const deleteNote = (id) => {
    const remaining = notes.filter((n) => n.id !== id);
    setNotes(remaining);
    if (selected === id) {
      setSelected(remaining[0]?.id || "");
      if (isMobile) setMobileView("list");
    }
  };

  const toolbarIcons = [
    { icon: SquarePen, title: "New Note", action: newNote },
    { icon: Type, title: "Format" },
    { icon: Table, title: "Table" },
    { icon: CheckSquare, title: "Checklist" },
    { icon: Paperclip, title: "Attachment" },
    { icon: Tag, title: "Tags" },
    { icon: Share2, title: "Share" },
    { icon: MoreHorizontal, title: "More" },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        background: "rgba(250,250,248,0.99)",
        borderRadius: "0 0 12px 12px",
        overflow: "hidden",
      }}
    >
      {/* ── Column 1: Left sidebar (iCloud/sections) ── */}
      {(!isMobile || mobileView === "sidebar") && (
        <div
          style={{
            width: isMobile ? "100%" : "180px",
            flexShrink: 0,
            borderRight: "0.5px solid rgba(0,0,0,0.08)",
            background: "rgba(244,242,236,0.99)",
            display: "flex",
            flexDirection: "column",
            paddingTop: "10px",
          }}
        >
          {/* macOS window controls alignment */}
          {!isMobile && (
            <div style={{ padding: "0px 14px 12px", display: "flex", height: "28px", alignItems: "center" }}>
              <WindowControlls target="notes" />
            </div>
          )}

          {/* Sidebar Header */}
          <div
            style={{
              padding: "6px 14px 8px",
              borderBottom: "0.5px solid rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#1c1c1e" }}>Folders</span>
            <button
              onClick={newNote}
              title="New Note"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px",
                borderRadius: "5px",
                color: "#886800",
              }}
            >
              <SquarePen className="w-4 h-4" />
            </button>
          </div>

          {/* iCloud section */}
          <div style={{ padding: "10px 0 4px" }}>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "rgba(0,0,0,0.35)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                padding: "0 14px 6px",
              }}
            >
              iCloud
            </div>
            <button
              onClick={() => setActiveSection("notes")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 14px",
                width: "calc(100% - 12px)",
                background: activeSection === "notes" ? "rgba(255,204,0,0.2)" : "transparent",
                border: "none",
                borderRadius: "6px",
                margin: "0 6px",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Folder className="w-3.5 h-3.5 text-[#e5b300]" />
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: activeSection === "notes" ? 600 : 400,
                    color: "#1c1c1e",
                  }}
                >
                  Notes
                </span>
              </div>
              <span
                style={{
                  fontSize: "10px",
                  color: "rgba(0,0,0,0.4)",
                  background: "rgba(0,0,0,0.06)",
                  borderRadius: "8px",
                  padding: "1px 6px",
                }}
              >
                {notes.length}
              </span>
            </button>
            <button
              onClick={() => setActiveSection("shared")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 14px",
                width: "calc(100% - 12px)",
                margin: "0 6px",
                background: activeSection === "shared" ? "rgba(255,204,0,0.2)" : "transparent",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Users className="w-3.5 h-3.5 text-[#e5b300]" />
                <span style={{ fontSize: "12px", fontWeight: activeSection === "shared" ? 600 : 400, color: "#1c1c1e" }}>Shared</span>
              </div>
              <span
                style={{
                  fontSize: "10px",
                  color: "rgba(0,0,0,0.4)",
                  background: "rgba(0,0,0,0.06)",
                  borderRadius: "8px",
                  padding: "1px 6px",
                }}
              >
                1
              </span>
            </button>
          </div>

          {/* Tags */}
          <div style={{ padding: "12px 14px 4px", borderTop: "0.5px solid rgba(0,0,0,0.06)" }}>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "rgba(0,0,0,0.35)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "8px",
              }}
            >
              Tags
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["All Tags", "#tags"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(0,0,0,0.06)",
                    borderRadius: "10px",
                    padding: "2px 8px",
                    fontSize: "10px",
                    color: "#1c1c1e",
                    cursor: "default",
                    userSelect: "none",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Column 2: Note list ── */}
      {(!isMobile || mobileView === "list") && (
        <div
          style={{
            width: isMobile ? "100%" : "220px",
            flexShrink: 0,
            borderRight: "0.5px solid rgba(0,0,0,0.08)",
            background: "rgba(248,246,240,0.99)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header spacer to align with sidebar traffic lights */}
          {!isMobile && <div style={{ height: "28px" }} />}

          {/* Search + new */}
          <div
            style={{
              padding: "6px 10px 10px",
              borderBottom: "0.5px solid rgba(0,0,0,0.06)",
              display: "flex",
              gap: "6px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "5px",
                background: "rgba(0,0,0,0.05)",
                borderRadius: "7px",
                padding: "4px 8px",
              }}
            >
              <Search className="w-3.5 h-3.5 opacity-40 text-black" />
              <input
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  fontSize: "12px",
                  width: "100%",
                  color: "#1c1c1e",
                }}
              />
            </div>
            <button
              onClick={newNote}
              title="New Note"
              style={{
                background: "rgba(255,204,0,0.25)",
                border: "none",
                borderRadius: "7px",
                width: "26px",
                height: "26px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: "16px", fontWeight: 500, color: "#886800" }}>+</span>
            </button>
          </div>

          {/* Grouped note list */}
          <div style={{ flex: 1, overflowY: "auto", paddingTop: "4px" }}>
            {pinned.length > 0 && (
              <>
                <GroupHeader label="Pinned" />
                {pinned.map((n) => (
                  <NoteRow
                    key={n.id}
                    note={n}
                    selected={selected}
                    isMobile={isMobile}
                    setSelected={setSelected}
                    setMobileView={setMobileView}
                  />
                ))}
              </>
            )}
            <AnimatePresence>
              {groups.map(({ bucket, notes: gNotes }) => (
                <div key={bucket}>
                  <GroupHeader label={bucket} />
                  {gNotes.map((n) => (
                    <NoteRow
                      key={n.id}
                      note={n}
                      selected={selected}
                      isMobile={isMobile}
                      setSelected={setSelected}
                      setMobileView={setMobileView}
                    />
                  ))}
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* ── Column 3: Editor ── */}
      {(!isMobile || mobileView === "editor") && (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            width: isMobile ? "100%" : "auto",
          }}
        >
          {/* Header spacer to align with other columns */}
          {!isMobile && <div style={{ height: "28px" }} />}

          {activeNote ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              {/* Back button on mobile */}
              {isMobile && (
                <button
                  onClick={() => setMobileView("list")}
                  style={{
                    padding: "8px 12px",
                    background: "none",
                    border: "none",
                    color: "#e5b300",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "pointer",
                  }}
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              )}

              {/* Editor toolbar */}
              <div
                style={{
                  padding: "6px 12px",
                  borderBottom: "0.5px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(250,250,248,0.99)",
                }}
              >
                {toolbarIcons.map((t) => (
                  <button
                    key={t.title}
                    title={t.title}
                    onClick={t.action}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px 6px",
                      borderRadius: "6px",
                      opacity: 0.55,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "opacity 0.12s, background 0.12s",
                      color: "#1c1c1e",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.background = "rgba(0,0,0,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "0.55";
                      e.currentTarget.style.background = "none";
                    }}
                  >
                    <t.icon className="w-4 h-4" />
                  </button>
                ))}
                <div style={{ flex: 1 }} />
                {/* Search inside note */}
                <button
                  title="Search note"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px 6px",
                    borderRadius: "6px",
                    opacity: 0.55,
                    color: "#1c1c1e",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.55")}
                >
                  <Search className="w-4 h-4" />
                </button>
                {/* Delete */}
                <button
                  onClick={() => deleteNote(activeNote.id)}
                  title="Delete"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px 6px",
                    borderRadius: "6px",
                    opacity: 0.45,
                    color: "#d9383a",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.45")}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Date */}
              <div
                style={{
                  fontSize: "11px",
                  color: "rgba(0,0,0,0.4)",
                  padding: "12px 20px 0",
                  textAlign: "center",
                  userSelect: "none",
                }}
              >
                {activeNote.dateISO ?? activeNote.date}
              </div>

              {/* Title */}
              <input
                value={activeNote.title}
                onChange={(e) => updateNote("title", e.target.value)}
                className="font-display"
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#1c1c1e",
                  padding: "8px 20px 4px",
                  background: "transparent",
                }}
              />

              {/* Body */}
              <textarea
                ref={textareaRef}
                value={activeNote.body}
                onChange={(e) => updateNote("body", e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  resize: "none",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "#1c1c1e",
                  padding: "4px 20px 20px",
                  background: "transparent",
                }}
              />
            </div>
          ) : (
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(0,0,0,0.3)",
                fontSize: "14px",
                userSelect: "none",
              }}
            >
              Select or create a note
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const NotesWindow = windowWrapper(Notes, "notes");

export default NotesWindow;
