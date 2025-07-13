// components/TagFilter.tsx
import { useCVStore } from '../store/cvStore'

const sectionLabels: Record<string, string> = {
  sobreMi: 'Sobre mí',
  skillsDuras: 'Habilidades duras',
  skillsBlandas: 'Habilidades blandas',
  experiencia: 'Experiencia',
  educacion: 'Educación',
  certificados: 'Certificados',
  proyectos: 'Proyectos destacados',
}

export default function TagFilter() {
  const sections = useCVStore((state) => state.sections)
  const toggleSection = useCVStore((state) => state.toggleSection)

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {Object.entries(sectionLabels).map(([key, label]) => (
        <button
          key={key}
          onClick={() => toggleSection(key as keyof typeof sections)}
          className={`px-3 py-1 text-sm rounded-full border font-medium transition ${
            sections[key as keyof typeof sections]
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-800 border-gray-400'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
