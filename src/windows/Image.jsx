import windowWrapper from "#hoc/windowWrapper.jsx";
import { WindowControlls } from "#components";
import useWindowStore from "#store/window.js";

const Image = () => {

  const { windows } = useWindowStore();

  const data = windows.imgfile?.data;

  if (!data) return null;

  const { name, imageUrl, subtitle, description } = data;

  return (
    <>
      <div id="window-header">

        <WindowControlls target="imgfile" />

        <h2>{name}</h2>

      </div>

      <div className="p-5 space-y-6 bg-white">

        {imageUrl ? (

          <div className="w-full">

            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto rounded"
            />

          </div>

        ) : null}

        {subtitle ? (
          <h3 className="text-lg font-semibold">
            {subtitle}
          </h3>
        ) : null}

        {Array.isArray(description) && description.length > 0 ? (

          <div className="space-y-3 leading-relaxed text-base text-gray-800">

            {description.map((para, idx) => (

              <p key={idx}>{para}</p>

            ))}

          </div>

        ) : null}

      </div>
    </>
  );
};

const ImageWindow = windowWrapper(Image, "imgfile");

export default ImageWindow;
