import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <label htmlFor={`file-${taskId}`}>Attach file</label>

      <input
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