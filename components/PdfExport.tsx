import React, { useState, useRef } from 'react';
import { FileDown, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Language } from '../types';

// Import all views to render them for the PDF
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ServicesView } from './views/ServicesView';
import { ActivitiesView } from './views/ActivitiesView';
import { StrategyView } from './views/StrategyView';
import { ContactView } from './views/ContactView';

interface PdfExportProps {
  language: Language;
}

export const PdfExport: React.FC<PdfExportProps> = ({ language }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  const generatePdf = async () => {
    if (!exportRef.current) return;
    
    setIsGenerating(true);
    
    try {
      // Create PDF instance (Landscape for slides)
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1280, 720] // 16:9 ratio
      });

      const slides = exportRef.current.children;
      
      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i] as HTMLElement;
        
        // Capture slide
        const canvas = await html2canvas(slide, {
          scale: 2, // Higher quality
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          width: 1280,
          height: 720
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 0.85);
        
        if (i > 0) {
          pdf.addPage([1280, 720], 'landscape');
        }
        
        pdf.addImage(imgData, 'JPEG', 0, 0, 1280, 720);
      }

      const fileName = language === 'fr' ? 'RICE-Presentation.pdf' : 'RICE-Presentation-EN.pdf';
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(language === 'fr' ? 'Erreur lors de la génération du PDF.' : 'Error generating PDF.');
    } finally {
      setIsGenerating(false);
    }
  };

  const t = {
    fr: {
      btn: "Télécharger la Présentation (PDF)",
      loading: "Génération en cours..."
    },
    en: {
      btn: "Download Presentation (PDF)",
      loading: "Generating..."
    }
  }[language];

  return (
    <>
      <button
        onClick={generatePdf}
        disabled={isGenerating}
        className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{t.loading}</span>
          </>
        ) : (
          <>
            <FileDown className="h-4 w-4" />
            <span>{t.btn}</span>
          </>
        )}
      </button>

      {/* Hidden container for PDF rendering */}
      <div className="fixed top-[-9999px] left-[-9999px] pointer-events-none overflow-hidden">
        <div ref={exportRef} style={{ width: '1280px' }}>
          {/* Slide 1: Home */}
          <div style={{ width: '1280px', height: '720px', overflow: 'hidden', position: 'relative', backgroundColor: 'white' }}>
             <div className="scale-[0.66] origin-top-left" style={{ width: '1920px' }}>
                <HomeView language={language} />
             </div>
          </div>
          
          {/* Slide 2: About */}
          <div style={{ width: '1280px', height: '720px', overflow: 'hidden', position: 'relative', backgroundColor: 'white' }}>
             <div className="scale-[0.66] origin-top-left" style={{ width: '1920px' }}>
                <AboutView language={language} />
             </div>
          </div>

          {/* Slide 3: Services */}
          <div style={{ width: '1280px', height: '720px', overflow: 'hidden', position: 'relative', backgroundColor: 'white' }}>
             <div className="scale-[0.66] origin-top-left" style={{ width: '1920px' }}>
                <ServicesView language={language} />
             </div>
          </div>

          {/* Slide 4: Activities */}
          <div style={{ width: '1280px', height: '720px', overflow: 'hidden', position: 'relative', backgroundColor: 'white' }}>
             <div className="scale-[0.66] origin-top-left" style={{ width: '1920px' }}>
                <ActivitiesView language={language} />
             </div>
          </div>

          {/* Slide 5: Strategy */}
          <div style={{ width: '1280px', height: '720px', overflow: 'hidden', position: 'relative', backgroundColor: 'white' }}>
             <div className="scale-[0.66] origin-top-left" style={{ width: '1920px' }}>
                <StrategyView language={language} />
             </div>
          </div>

          {/* Slide 6: Contact */}
          <div style={{ width: '1280px', height: '720px', overflow: 'hidden', position: 'relative', backgroundColor: 'white' }}>
             <div className="scale-[0.66] origin-top-left" style={{ width: '1920px' }}>
                <ContactView language={language} />
             </div>
          </div>
        </div>
      </div>
    </>
  );
};
