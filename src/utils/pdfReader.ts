// src/utils/pdfReader.ts

import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import * as pdfjsLib from "pdfjs-dist";

// ✅ Configurar el worker desde CDN directamente
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const extractTextFromPDF = async (file: File): Promise<string> => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = async () => {
      const typedarray = new Uint8Array(fileReader.result as ArrayBuffer);

      try {
        const pdf = await getDocument({ data: typedarray }).promise;
        const maxPages = pdf.numPages;
        let text = "";

        for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const content = await page.getTextContent();
          const strings = content.items.map((item: any) => item.str);
          text += strings.join(" ") + "\n";
        }

        resolve(text);
      } catch (err) {
        reject(err);
      }
    };

    fileReader.onerror = reject;
    fileReader.readAsArrayBuffer(file);
  });
};
