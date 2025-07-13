import React, { useState } from "react";
import FileDropZone from "../components/FileDropZone";
import { extractTextFromPDF } from "../utils/pdfReader";
import { parseCVText, ParsedCV } from "../utils/cvParser";

const App: React.FC = () => {
  const [parsedCV, setParsedCV] = useState<ParsedCV | null>(null);
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
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    if (!selectedRole) return;

    const html2pdf = (await import("html2pdf.js")).default;

    const content = `
      <div style="font-family: sans-serif;">
        <h2 style="color: #1e40af;">CV Adaptado para: ${selectedRole}</h2>
        <h3>Sobre mí:</h3>
        <p>${sobreMi[selectedRole]}</p>
        <h3>Experiencia:</h3>
        <p>${experienciaAdaptada[selectedRole]}</p>
      </div>
    `;

    html2pdf().from(content).save(`CV_${selectedRole.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-4">🧠 CV Analyzer</h1>
      <FileDropZone onFileUpload={handleFileUpload} />

      {loading && <p className="mt-4 text-blue-600">Procesando con IA...</p>}

      {roles.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">🧩 Roles sugeridos:</h2>
          <div className="flex border-b border-gray-300">
            {roles.map((role) => (
              <button
                key={role}
                className={`px-4 py-2 -mb-px border-b-2 font-medium text-sm transition-colors ${
                  role === selectedRole
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-blue-500"
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
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg">
              🎯 CV Adaptado para: {selectedRole}
            </h2>
            <button
              onClick={handleExportPDF}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              📥 Exportar PDF
            </button>
          </div>

          {sobreMi[selectedRole] !== undefined && (
            <div>
              <h3 className="font-semibold">🙋 Sobre mí:</h3>
              <textarea
                className="w-full border rounded p-2 text-sm"
                rows={4}
                value={sobreMi[selectedRole]}
                onChange={(e) =>
                  setSobreMi({ ...sobreMi, [selectedRole]: e.target.value })
                }
              />
            </div>
          )}

          {experienciaAdaptada[selectedRole] !== undefined && (
            <div>
              <h3 className="font-semibold">💼 Experiencia:</h3>
              <textarea
                className="w-full border rounded p-2 text-sm"
                rows={4}
                value={experienciaAdaptada[selectedRole]}
                onChange={(e) =>
                  setExperienciaAdaptada({
                    ...experienciaAdaptada,
                    [selectedRole]: e.target.value,
                  })
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
