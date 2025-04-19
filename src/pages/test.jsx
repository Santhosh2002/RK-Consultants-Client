import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile, getUploadedFileUrl, isUploading, getUploadError } from "../store/fileUploadSlice";

const FileUploadTester = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const uploadedUrls = useSelector(getUploadedFileUrl);
  const uploading = useSelector(isUploading);
  const error = useSelector(getUploadError);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = () => {
    dispatch(uploadFile(files));
  };

  return (
    <div>
      <h2>🔥 Test Firebase File Upload</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {uploadedUrls?.length > 0 && (
        <ul>
          {uploadedUrls.map((url, i) => (
            <li key={i}>
              <a href={url} target="_blank" rel="noreferrer">
                {url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUploadTester;
