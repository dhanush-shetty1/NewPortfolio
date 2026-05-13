import { WindowControlls } from "#components";
import { Search } from "lucide-react";
import windowWrapper from "#hoc/windowWrapper";
import { locations } from "#constants/index.js";
import useLocationStore from "#store/location.js";
import useWindowStore from "#store/window.js";
import clsx from "clsx";

const Finder = () => {

  const { openWindow } = useWindowStore();

  const { activeLocation, setActiveLocation } = useLocationStore();

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.fileType === "txt") return openWindow("txtfile", item);
    if (item.fileType === "img") return openWindow("imgfile", item);
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");
  };

  const renderList = (name, items) => (

    <div>

      <h3>{name}</h3>

      <ul>

        {items.map((item) => (

          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === activeLocation.id ? "active" : "not-active",
            )}
          >

            <img
              src={item.icon}
              className="w-4"
              alt={item.name}
            />

            <p className="text-sm font-medium truncate">
              {item.name}
            </p>

          </li>

        ))}

      </ul>

    </div>

  );

  return (
    <>
      <div id="window-header">
        <WindowControlls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">

        <div className="sidebar">

          {renderList("Favorites", Object.values(locations))}

          {renderList("My Projects", locations.work.children)}

        </div>

        <ul className="content">

          {activeLocation?.children.map((item) => (

            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >

              <img src={item.icon} alt={item.name} />

              <p>{item.name}</p>

            </li>

          ))}

        </ul>

      </div>
    </>
  );
};

const FinderWindow = windowWrapper(Finder, "finder");

export default FinderWindow;