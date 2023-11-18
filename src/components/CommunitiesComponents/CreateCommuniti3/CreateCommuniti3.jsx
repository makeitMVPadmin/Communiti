import "./CreateCommuniti3.scss";
import calendarImage from "../../../assets/images/calendar.svg";
import chooseFile from "../../../assets/images/choose-file.svg";
import Button from "../../../components/Button/Button";

function CreateCommuniti3({ image, setImage, handleBack, handleNext }) {
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check file type using the file name
      const fileName = file.name.toLowerCase();
      const isJPEG = fileName.endsWith(".jpg") || fileName.endsWith(".jpeg");
      const isPNG = fileName.endsWith(".png");
      const isPDF = fileName.endsWith(".pdf");
      const isSVG = fileName.endsWith(".svg");

      if (!(isJPEG || isPNG || isPDF || isSVG)) {
        alert("Supported formats: JPG, PNG, PDF, SVG");
        e.target.value = null; // Reset the file input
        return;
      }

      // Check file size
      if (file.size > 3000000) {
        alert("File size exceeds 3MB. Please choose a smaller file.");
        e.target.value = null; // Reset the file input
        return;
      }

      // Set the image state as a File object
      setImage(file);
    }
  };

  return (
    <div className="create-communiti3">
      <div className="create-communiti3__container">
        <div className="create-communiti3__container-left">
          <h1 className="create-communiti3__container-heading">
            Welcome to your Communiti!
          </h1>
          <form className="create-communiti3__container-form">
            <label
              className="create-communiti3__container-label"
              htmlFor="communiti-icon"
            >
              {image ? "Upload complete!" : "Upload a Communiti image"}
            </label>
            <div className="create-communiti3__container-input-container">
              {image ? (
                <img
                  className="create-communiti3__container-preview"
                  src={
                    image instanceof File ? URL.createObjectURL(image) : image
                  }
                  alt="Preview"
                />
              ) : (
                <>
                  <input
                    type="file"
                    id="communiti-icon"
                    name="communiti-icon"
                    className="create-communiti3__container-input visually-hidden"
                    onChange={handleFileInputChange}
                  />
                  <label
                    htmlFor="communiti-icon"
                    className="create-communiti3__custom-file-input"
                  >
                    <img src={chooseFile} alt="Choose File Icon" />
                  </label>
                  <p className="create-communiti3__container-input-text">
                    drag and drop file or <span> choose file</span>
                  </p>
                </>
              )}
            </div>
            {image && <></>}
            {!image && (
              <p className="create-communiti3__container-input-text--alt">
                supported formats: JPG, PNG, PDF, SVG
                <br /> maximum size: 3MB
              </p>
            )}
          </form>
        </div>
        <div className="create-communiti3__container-right">
          <img
            className="create-communiti3__container-image"
            src={calendarImage}
            alt="Calendar"
          />
        </div>
      </div>
      <div className="create-communiti1__container-bottom">
        <Button
          buttonText="Back"
          className={`button button-back`}
          onClick={handleBack}
        />
        <Button
          buttonText="Done"
          className={`button create-communiti__button-next ${
            !image ? "button__not-active" : "button__active"
          }`}
          onClick={handleNext}
        />
      </div>
    </div>
  );
}

export default CreateCommuniti3;
