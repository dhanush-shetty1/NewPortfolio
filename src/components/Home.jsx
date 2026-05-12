import { locations } from "#constants";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const projects = locations.work?.children ?? [];

const Home = () => {

  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

  const handleOpenProjectFinder = (project) => {
    setActiveLocation(project);
    openWindow("finder");
  };

  const handleOpenResume = () => {
    openWindow("resume");
    setTimeout(() => openWindow("resume"), 0);
  };

  useGSAP(() => {
    Draggable.create(".folder");
    Draggable.create(".resume-file");
  }, []);

  return (
    <section id="home">

      <ul>

        {projects.map((project) => (

          <li
            key={project.id}
            className={clsx("group folder", project.windowPosition)}
            onClick={() => handleOpenProjectFinder(project)}
          >

            <img
              src="/images/folder.png"
              alt={project.name}
            />

            <p>{project.name}</p>

          </li>

        ))}

        <li
          className="group resume-file absolute top-32 right-5 z-0 select-none flex items-center flex-col"
          onClick={handleOpenResume}
        >
          <img
            src="/images/pdf.png"
            alt="Resume"
            style={{ width: "64px", height: "64px" }}
          />
          <p>Resume.pdf</p>
        </li>

      </ul>

    </section>
  );
};

export default Home;