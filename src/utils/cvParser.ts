// src/utils/cvParser.ts

export interface ParsedCV {
  about?: string;
  skills?: string[];
  experiencia?: string[];
  educacion?: string[];
  certificaciones?: string[];
  proyectos?: string[];
}

export const parseCVText = (text: string): ParsedCV => {
  const sections = text.split(/\n\s*\n/); // separa por párrafos

  const lower = text.toLowerCase();

  const getSection = (start: string, end?: string): string => {
    const startIndex = lower.indexOf(start.toLowerCase());
    if (startIndex === -1) return "";
    const endIndex = end ? lower.indexOf(end.toLowerCase(), startIndex) : -1;
    return text.slice(
      startIndex + start.length,
      endIndex !== -1 ? endIndex : undefined
    ).trim();
  };

  return {
    about: getSection("ABOUT ME", "LANGUAGES") || getSection("SOBRE MÍ", "IDIOMAS"),
    skills: getSection("TECHNICAL SKILLS", "PROFESSIONAL EXPERIENCE")
              .split(/\n|,/).map(s => s.trim()).filter(Boolean),
    experiencia: getSection("PROFESSIONAL EXPERIENCE", "EDUCACIÓN")
                  .split(/\n{2,}/).map(e => e.trim()).filter(Boolean),
    educacion: getSection("EDUCACIÓN", "CERTIFICACION")
                .split(/\n{2,}/).map(e => e.trim()).filter(Boolean),
    certificaciones: getSection("CERTIFICATION", "REFERENCIAS")
                      .split(/\n{2,}/).map(c => c.trim()).filter(Boolean),
    proyectos: getSection("HIGHLIGHTED PROJECTS", "TECHNICAL SKILLS")
                .split(/\n{2,}/).map(p => p.trim()).filter(Boolean),
  };
};
