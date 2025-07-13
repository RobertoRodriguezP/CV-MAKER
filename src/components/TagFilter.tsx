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
          className={`px-4 py-1.5 text-sm rounded-full font-medium transition-all duration-300 ease-in-out shadow
  ${
    sections[key as keyof typeof sections]
      ? 'bg-indigo-500 text-white shadow-md'
      : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
  }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
