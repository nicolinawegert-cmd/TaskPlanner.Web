import { useState } from "react";
import './FileUpload.css';

function FileUpload({ taskId, onFileUpload }) {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const success = await onFileUpload(taskId, file);

    if (success) {
      setFile(null);
    }
  };

  return (
    <form className="file-upload" onSubmit={handleSubmit}>
      <label htmlFor={`file-${taskId}`}>
        Attach file
      </label>

      <input
        className="file-input"
        id={`file-${taskId}`}
        type="file"
        onChange={(event) => setFile(event.target.files[0])}
      />

      <button type="submit" disabled={!file}>
        Upload
      </button>
    </form>
  );
}

export default FileUpload;