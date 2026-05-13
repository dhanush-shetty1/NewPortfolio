import windowwrapper from "#hoc/windowwrapper.jsx";
import { WindowControlls } from "#components";
import useWindowStore from "#store/window.js";
import { typoraNotes as initialNotes } from "#constants";
import { useState, useEffect, useRef } from "react";
import { FileText, Plus, Trash2 } from "lucide-react";

const Typora = () => {
  const { windows } = useWindowStore();
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNoteId, setSelectedNoteId] = useState(initialNotes[0]?.id || null);
  const [editingContent, setEditingContent] = useState("");
  const [editingTitle, setEditingTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [showNewNoteInput, setShowNewNoteInput] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const saveTimeoutRef = useRef(null);
  const textareaRef = useRef(null);

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  // Initialize editing when note is selected
  useEffect(() => {
    if (selectedNote) {
      setEditingTitle(selectedNote.title);
      setEditingContent(
        Array.isArray(selectedNote.content)
          ? selectedNote.content
              .map((p) => {
                if (p.type === "heading") return `# ${p.text}`;
                if (p.type === "subheading") return `## ${p.text}`;
                if (p.type === "list") return p.items.map((i) => `- ${i}`).join("\n");
                return p.text;
              })
              .join("\n\n")
          : selectedNote.content
      );
      setIsEditing(false);
    }
  }, [selectedNote]);

  const getFormattedDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date}, ${time}`;
  };

  const parseContent = (content) => {
    const lines = content.split("\n");
    const parsedContent = [];
    let currentIndex = 0;

    while (currentIndex < lines.length) {
      const line = lines[currentIndex].trim();

      if (line.startsWith("# ")) {
        parsedContent.push({
          type: "heading",
          text: line.substring(2).trim(),
        });
      } else if (line.startsWith("## ")) {
        parsedContent.push({
          type: "subheading",
          text: line.substring(3).trim(),
        });
      } else if (line.startsWith("- ")) {
        const items = [];
        while (
          currentIndex < lines.length &&
          lines[currentIndex].trim().startsWith("- ")
        ) {
          items.push(lines[currentIndex].trim().substring(2));
          currentIndex++;
        }
        parsedContent.push({
          type: "list",
          items,
        });
        currentIndex--;
      } else if (line) {
        parsedContent.push({
          type: "text",
          text: line,
        });
      }

      currentIndex++;
    }

    return parsedContent;
  };

  const handleContentChange = (newContent) => {
    setEditingContent(newContent);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      autoSave(newContent);
    }, 500);
  };

  const handleTitleChange = (newTitle) => {
    setEditingTitle(newTitle);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      autoSave(editingContent, newTitle);
    }, 500);
  };

  const autoSave = (content, title = editingTitle) => {
    if (!selectedNote) return;

    const updatedNotes = notes.map((note) =>
      note.id === selectedNoteId
        ? {
            ...note,
            title: title,
            preview: content.substring(0, 60) + (content.length > 60 ? "..." : ""),
            content: parseContent(content),
            lastEdited: getFormattedDateTime(),
          }
        : note
    );

    setNotes(updatedNotes);
  };

  const handleAddNewNote = () => {
    if (!newNoteTitle.trim()) return;

    const newNote = {
      id: Date.now(),
      title: newNoteTitle,
      preview: "Start typing...",
      lastEdited: getFormattedDateTime(),
      content: "Start typing your note here...",
    };

    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
    setNewNoteTitle("");
    setShowNewNoteInput(false);
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
    if (selectedNoteId === noteId) {
      setSelectedNoteId(updatedNotes[0]?.id || null);
    }
    setDeleteConfirm(null);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <div id="window-header">
        <WindowControlls target="typora" />
        <h2>Typora</h2>
      </div>

      <div className="typora-container bg-white flex h-full">
        {/* Sidebar */}
        <div className="typora-sidebar border-r border-gray-200 bg-gray-50 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            {showNewNoteInput ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Note title..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none text-sm"
                  onKeyPress={(e) => e.key === "Enter" && handleAddNewNote()}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddNewNote}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setShowNewNoteInput(false);
                      setNewNoteTitle("");
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowNewNoteInput(true)}
                className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors"
              >
                <Plus size={18} />
                <span className="text-sm font-medium">New Note</span>
              </button>
            )}
          </div>

          <div className="space-y-1 p-2">
            {notes.map((note) => (
              <div
                key={note.id}
                onClick={() => setSelectedNoteId(note.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all group ${
                  selectedNoteId === note.id
                    ? "bg-blue-100 border-l-4 border-blue-500"
                    : "hover:bg-gray-200"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {note.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {note.preview}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm(note.id);
                    }}
                    className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Editor */}
        <div className="typora-editor flex-1 flex flex-col overflow-hidden">
          {selectedNote ? (
            <>
              {!isEditing ? (
                <>
                  <div className="border-b border-gray-200 px-8 py-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {selectedNote.title}
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">
                      Last edited: {selectedNote.lastEdited}
                    </p>
                  </div>

                  <div className="flex-1 overflow-y-auto px-8 py-6">
                    <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                      {Array.isArray(selectedNote.content) && selectedNote.content.length > 0 ? (
                        <div className="space-y-4">
                          {selectedNote.content.map((paragraph, idx) => (
                            <div key={idx}>
                              {paragraph.type === "heading" ? (
                                <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
                                  {paragraph.text}
                                </h2>
                              ) : paragraph.type === "subheading" ? (
                                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                                  {paragraph.text}
                                </h3>
                              ) : paragraph.type === "list" ? (
                                <ul className="list-disc list-inside space-y-1">
                                  {paragraph.items.map((item, i) => (
                                    <li key={i} className="text-gray-700">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-gray-700 mb-4">
                                  {paragraph.text}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-700">{selectedNote.content}</p>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-8 py-3 bg-gray-50">
                    <button
                      onClick={toggleEdit}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                      Edit
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="border-b border-gray-200 px-8 py-4 bg-gray-50">
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="text-3xl font-bold text-gray-900 outline-none w-full bg-transparent mb-2"
                    />
                  </div>

                  <textarea
                    ref={textareaRef}
                    value={editingContent}
                    onChange={(e) => handleContentChange(e.target.value)}
                    className="flex-1 min-h-0 overflow-y-auto px-8 py-6 outline-none text-gray-700 resize-none text-base leading-relaxed"
                    placeholder="Start typing your note here..."
                  />

                  <div className="border-t border-gray-200 px-8 py-3 bg-gray-50 flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      <p>
                        💡 <code className="bg-gray-200 px-1 rounded"># Heading</code> •{" "}
                        <code className="bg-gray-200 px-1 rounded">## Subheading</code> •{" "}
                        <code className="bg-gray-200 px-1 rounded">- List</code>
                      </p>
                    </div>
                    <button
                      onClick={toggleEdit}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                      Done
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <FileText size={48} className="mx-auto mb-4 opacity-50" />
                <p>No notes yet. Create a new note to get started.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 rounded-xl">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-96">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Note?</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Are you sure you want to delete this note? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteNote(deleteConfirm)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const TyporaWindow = windowwrapper(Typora, "typora");

export default TyporaWindow;
