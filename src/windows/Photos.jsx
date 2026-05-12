import { WindowControlls } from "#components";
import windowWrapper from "#hoc/windowWrapper";
import { photosLinks, gallery } from "#constants/index.js";
import { useState } from "react";

const Photos = () => {
  const [activeLink, setActiveLink] = useState(photosLinks[0].id);

  return (
    <>
      <div id="window-header">
        <WindowControlls target="photos" />
        <h2>Gallery</h2>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          width: "900px",
          height: "600px",
          minWidth: "900px",
          minHeight: "600px",
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
              gridTemplateColumns: "1.4fr 0.95fr",
              gridTemplateRows: "240px 200px",
              gap: "10px",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {gallery.map((item, index) => {
              let gridStyle = {};

              if (index === 0)
                gridStyle = {
                  gridColumn: "1 / span 1",
                  gridRow: "1 / span 1",
                };
              else if (index === 1)
                gridStyle = {
                  gridColumn: "2 / span 1",
                  gridRow: "1 / span 1",
                };
              else if (index === 2)
                gridStyle = {
                  gridColumn: "1 / span 1",
                  gridRow: "2 / span 1",
                };
              else if (index === 3)
                gridStyle = {
                  gridColumn: "2 / span 1",
                  gridRow: "2 / span 1",
                };

              return (
                <li
                  key={item.id}
                  style={{
                    ...gridStyle,
                    cursor: "pointer",
                    overflow: "hidden",
                    borderRadius: "14px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                    transition: "all 0.2s",
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
              );
            })}
          </ul>
        </div>

      </div>
    </>
  );
};

const PhotosWindow = windowWrapper(Photos, "photos");

export default PhotosWindow;