// src/components/FileDropZone.tsx

import React, { useCallback, useState } from "react";

type FileDropZoneProps = {
  onFileUpload: (file: File) => void;
};

const FileDropZone: React.FC<FileDropZoneProps> = ({ onFileUpload }) => {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      onFileUpload(file);
    } else {
      alert("Solo se permiten archivos PDF.");
    }
  }, [onFileUpload]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      onFileUpload(file);
    } else {
      alert("Solo se permiten archivos PDF.");
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
        dragging ? "bg-blue-100 border-blue-400" : "bg-white border-gray-300"
      }`}
    >
      <p className="mb-2 text-gray-700">
        Arrastra tu archivo PDF aquí o haz clic para seleccionarlo.
      </p>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer text-blue-600 underline">
        Seleccionar archivo
      </label>
      {fileName && (
        <p className="mt-4 text-green-700 font-semibold">Archivo cargado: {fileName}</p>
      )}
      
    </div>
    
  );
};

export default FileDropZone;
