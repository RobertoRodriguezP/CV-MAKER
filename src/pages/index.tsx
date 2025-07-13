// pages/index.tsx
import { useEffect, useState } from 'react'
import Tabs from '../components/Tabs'
import TagFilter from '../components/TagFilter'
import Section from '../components/Section'
import DownloadButton from '../components/DownloadButton'

export default function HomePage() {
  const [cvData, setCvData] = useState<any>(null)

  // Cargar el JSON (puede estar en /data/roberto-cv.json o desde una API)
  useEffect(() => {
    fetch('/data/roberto-cv.json')
      .then((res) => res.json())
      .then((data) => setCvData(data))
  }, [])

  if (!cvData) {
    return <p className="p-6 text-gray-600">Cargando CV...</p>
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-8 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Generador de Hoja de Vida
      </h1>

      <Tabs />
      <TagFilter />
      <DownloadButton />

      <div id="cv-preview" className="mt-6 p-6 bg-white shadow rounded text-gray-800 space-y-6">
        <Section title="Sobre mí" sectionKey="sobreMi">
          <p>{cvData.about}</p>
        </Section>

        <Section title="Habilidades duras" sectionKey="skillsDuras">
          <ul className="list-disc pl-5">
            {cvData.skills?.hard?.map((skill: string, i: number) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </Section>

        <Section title="Habilidades blandas" sectionKey="skillsBlandas">
          <ul className="list-disc pl-5">
            {cvData.skills?.soft?.map((skill: string, i: number) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </Section>

        <Section title="Experiencia" sectionKey="experiencia">
          {cvData.experience?.map((job: any, i: number) => (
            <div key={i} className="mb-3">
              <h3 className="font-semibold">{job.role} – {job.company}</h3>
              <p className="text-sm text-gray-600">{job.period}</p>
              <p>{job.description}</p>
            </div>
          ))}
        </Section>

        <Section title="Educación" sectionKey="educacion">
          {cvData.education?.map((edu: any, i: number) => (
            <div key={i}>
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-sm text-gray-600">{edu.institution} – {edu.year}</p>
            </div>
          ))}
        </Section>

        <Section title="Certificados" sectionKey="certificados">
          <ul className="list-disc pl-5">
            {cvData.certificates?.map((cert: string, i: number) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </Section>

        <Section title="Proyectos destacados" sectionKey="proyectos">
          <ul className="list-disc pl-5">
            {cvData.projects?.map((proj: string, i: number) => (
              <li key={i}>{proj}</li>
            ))}
          </ul>
        </Section>
      </div>
    </main>
  )
}
