import React, { useState } from "react";
import FileDropZone from "../components/FileDropZone";
import { extractTextFromPDF } from "../utils/pdfReader";
import { parseCVText, ParsedCV } from "../utils/cvParser";
import { marked } from "marked";

const App: React.FC = () => {
  const [parsedCV, setParsedCV] = useState<ParsedCV | null>(null);
  const [iaResult, setIaResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [sobreMi, setSobreMi] = useState<Record<string, string>>({});
  const [experienciaAdaptada, setExperienciaAdaptada] = useState<Record<string, string>>({});
  


  const handleFileUpload = async (file: File) => {
    try {
      setLoading(true);
      
      const text = await extractTextFromPDF(file);
      const parsed = parseCVText(text);
      setParsedCV(parsed);

      // 🔁 Llamar a tu API route
      const res = await fetch("/api/groq-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ parsedCV: parsed }),
      });

      const data = await res.json();
      setRoles(data.roles || []);
      setSobreMi(data.sobreMi || {});
      setExperienciaAdaptada(data.experienciaAdaptada || {});
      setSelectedRole(data.roles?.[0] || null);


      setIaResult(data.message);
    } catch (error) {
      console.error("Error:", error);
      setIaResult("Ocurrió un error al procesar el CV.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-4">🧠 CV Analyzer</h1>
      <FileDropZone onFileUpload={handleFileUpload} />

      {roles.length > 0 && (
  <div className="mt-6">
    <h2 className="text-lg font-semibold mb-2">🧩 Roles sugeridos:</h2>
    <div className="flex flex-wrap gap-2">
      {roles.map((role) => (
        <button
          key={role}
          className={`px-3 py-1 rounded border text-sm ${
            role === selectedRole
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setSelectedRole(role)}
        >
          {role}
        </button>
      ))}
    </div>
  </div>
)}

{selectedRole && (
  <div className="mt-6 bg-white p-4 rounded shadow border space-y-4">
    <h2 className="font-bold text-lg">🎯 CV Adaptado para: {selectedRole}</h2>

    {sobreMi[selectedRole] && (
      <div>
        <h3 className="font-semibold">🙋 Sobre mí:</h3>
        <p>{sobreMi[selectedRole]}</p>
      </div>
    )}

    {experienciaAdaptada[selectedRole] && (
      <div>
        <h3 className="font-semibold">💼 Experiencia:</h3>
        <p>{experienciaAdaptada[selectedRole]}</p>
      </div>
    )}
  </div>
)}


      
    </div>
  );
};

export default App;
