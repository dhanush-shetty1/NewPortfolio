import { WindowControlls } from "#components";
import windowWrapper from "#hoc/windowWrapper";
import { photosLinks, gallery } from "#constants/index.js";
import { useState } from "react";
import { Mail, Search } from "lucide-react";
import useWindowStore from "#store/window.js";

const Photos = () => {
  const [activeLink, setActiveLink] = useState(photosLinks[0].id);
  const { openWindow, focusWindow } = useWindowStore();

  const handlePhotoClick = (photo, e) => {
    e.stopPropagation();
    const photoData = {
      name: `Photo ${photo.id}`,
      imageUrl: photo.img,
      subtitle: null,
      description: null,
    };
    openWindow("imgfile", photoData);
    setTimeout(() => focusWindow("imgfile"), 0);
  };

  return (
    <>
      <div id="window-header">
        <WindowControlls target="photos" />
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto" }}>
          <Mail className="icon"></Mail>
          <Search className="icon"/>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          width: "920px",
          height: "520px",
          minWidth: "920px",
          minHeight: "520px",
          overflow: "hidden",
        }}
      >

        <div
          style={{
            width: "220px",
            flexShrink: 0,
            borderRight: "1px solid rgba(0,0,0,0.08)",
            background: "#f5f5f7",
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            overflowY: "auto",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#1d1d1f",
              padding: "0 8px",
              marginBottom: "12px",
            }}
          >
            Photos
          </p>

          {photosLinks.map((section) => (
            <div
              key={section.id}
              onClick={() => setActiveLink(section.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "10px",
                cursor: "default",
                background:
                  activeLink === section.id ? "#dbeafe" : "transparent",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                if (activeLink !== section.id)
                  e.currentTarget.style.background = "rgba(0,0,0,0.05)";
              }}
              onMouseLeave={(e) => {
                if (activeLink !== section.id)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              <img
                src={section.icon}
                alt={section.title}
                style={{
                  width: "18px",
                  height: "18px",
                  opacity: 0.7,
                  filter:
                    activeLink === section.id
                      ? "invert(32%) sepia(98%) saturate(700%) hue-rotate(200deg)"
                      : "none",
                }}
              />

              <p
                style={{
                  fontSize: "15px",
                  fontWeight: activeLink === section.id ? "600" : "400",
                  color:
                    activeLink === section.id ? "#1d6fe8" : "#1d1d1f",
                  margin: 0,
                }}
              >
                {section.title}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            flex: 1,
            padding: "24px",
            overflow: "auto",
            background: "white",
          }}
        >
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: "8px",
              listStyle: "none",
              padding: 0,
              margin: 0,
              width: "100%",
            }}
          >
            {gallery.map((item) => (
                <li
                  key={item.id}
                  onClick={(e) => handlePhotoClick(item, e)}
                  style={{
                    cursor: "pointer",
                    overflow: "hidden",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                    transition: "all 0.2s",
                    aspectRatio: "1",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.12)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 2px 6px rgba(0,0,0,0.08)")
                  }
                >
                  <img
                    src={item.img}
                    alt={`Gallery ${item.id}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </li>
              ))}  
          </ul>
        </div>

      </div>
    </>
  );
};

const PhotosWindow = windowWrapper(Photos, "photos");

export default PhotosWindow;