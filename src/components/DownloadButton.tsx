// components/DownloadButton.tsx
export default function DownloadButton() {
  const handleDownload = async () => {
    if (typeof window === 'undefined') return

    const element = document.getElementById('cv-preview')
    if (!element) return

    const html2pdf = (await import('html2pdf.js')).default

    html2pdf()
      .set({
        margin: 0.5,
        filename: 'CV_RobertoRodriguez.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .from(element)
      .save()
  }

  return (
    <button
  onClick={handleDownload}
  className="bg-gradient-to-r from-green-500 to-lime-500 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
>
  Download as PDF
</button>

  )
}
