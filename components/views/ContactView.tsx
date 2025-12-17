import React, { useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import { Language } from '../../types';

interface ContactViewProps {
  language: Language;
}

export const ContactView: React.FC<ContactViewProps> = ({ language }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const t = {
    fr: {
      title: "Parlons de votre projet",
      coordsTitle: "Nos Coordonnées",
      coordsDesc: "Une question sur nos services d'ingénierie environnementale ? Besoin d'un devis pour une étude ? Notre équipe est à votre écoute.",
      phone: "Téléphone",
      email: "Email",
      whatsapp: "Discuter sur WhatsApp",
      formTitle: "Envoyez-nous un message",
      name: "Nom complet",
      subject: "Sujet",
      message: "Message",
      send: "Envoyer le message",
      successTitle: "Préparation de l'email...",
      successDesc: "Votre client de messagerie devrait s'ouvrir avec les informations pré-remplies.",
      back: "Retour au formulaire",
      subjects: {
        select: "Sélectionnez un sujet",
        quote: "Demande de devis",
        study: "Étude environnementale",
        partner: "Partenariat",
        other: "Autre"
      }
    },
    en: {
      title: "Let's Talk About Your Project",
      coordsTitle: "Our Contact Info",
      coordsDesc: "A question about our environmental engineering services? Need a quote for a study? Our team is at your disposal.",
      phone: "Phone",
      email: "Email",
      whatsapp: "Chat on WhatsApp",
      formTitle: "Send Us a Message",
      name: "Full Name",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      successTitle: "Preparing Email...",
      successDesc: "Your email client should open with the pre-filled information.",
      back: "Back to form",
      subjects: {
        select: "Select a subject",
        quote: "Quote request",
        study: "Environmental study",
        partner: "Partnership",
        other: "Other"
      }
    }
  }[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construction du lien mailto pour le formulaire
    const subject = encodeURIComponent(`Contact Site Web: ${formData.subject || 'Demande de renseignement'}`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Sujet: ${formData.subject}\n\n` +
      `Message:\n${formData.message}`
    );

    // Redirection vers le client mail
    window.location.href = `mailto:contact@rice.re?subject=${subject}&body=${body}`;
    
    // Affichage du message de succès
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative min-h-screen py-16 text-white overflow-hidden">
      {/* Natural Environment Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1920&q=80" 
          alt="Nature Landscape Forest" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay to ensure text readability - ajusté pour mieux voir l'image */}
        <div className="absolute inset-0 bg-slate-900/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/90 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 drop-shadow-md">{t.title}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-10">
             <div>
               <h3 className="text-2xl font-semibold mb-6 text-primary-300">{t.coordsTitle}</h3>
               <p className="text-slate-100 mb-8 text-lg leading-relaxed shadow-black drop-shadow-md">
                 {t.coordsDesc}
               </p>
             </div>

             <div className="space-y-6">
               <div className="flex items-start group">
                 <div className="bg-primary-600/20 border border-primary-500/30 p-3 rounded-lg mr-4 backdrop-blur-sm group-hover:bg-primary-500/30 transition">
                    <Phone className="h-6 w-6 text-primary-400" />
                 </div>
                 <div>
                   <h4 className="font-bold text-lg text-primary-100">{t.phone}</h4>
                   <a 
                     href="tel:+262692656166" 
                     className="text-white hover:text-primary-300 hover:underline transition-all text-xl font-medium block mt-1"
                   >
                     +262 692 65 61 66
                   </a>
                   <p className="text-xs text-slate-300 mt-1">Lundi - Vendredi: 8h30 - 17h30</p>
                 </div>
               </div>

               <div className="flex items-start group">
                 <div className="bg-primary-600/20 border border-primary-500/30 p-3 rounded-lg mr-4 backdrop-blur-sm group-hover:bg-primary-500/30 transition">
                    <Mail className="h-6 w-6 text-primary-400" />
                 </div>
                 <div>
                   <h4 className="font-bold text-lg text-primary-100">{t.email}</h4>
                   <a 
                     href="mailto:contact@rice.re" 
                     className="text-white hover:text-primary-300 hover:underline transition-all text-xl font-medium block mt-1"
                   >
                     contact@rice.re
                   </a>
                 </div>
               </div>
             </div>

             <div className="pt-8">
               <a 
                 href="https://wa.me/262692656166" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full font-bold transition shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-1"
               >
                 <span className="mr-2">💬</span> {t.whatsapp}
               </a>
             </div>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white shadow-2xl border border-white/20">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="bg-primary-500/20 p-4 rounded-full mb-4">
                   <Send className="h-8 w-8 text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{t.successTitle}</h3>
                <p className="text-slate-200 mb-6">{t.successDesc}</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-primary-300 underline hover:text-primary-200">{t.back}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">{t.formTitle}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">{t.name}</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      placeholder="jean@exemple.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">{t.subject}</label>
                  <select 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange as any}
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition [&>option]:text-slate-800"
                  >
                    <option value="">{t.subjects.select}</option>
                    <option value="devis">{t.subjects.quote}</option>
                    <option value="etude">{t.subjects.study}</option>
                    <option value="partenariat">{t.subjects.partner}</option>
                    <option value="autre">{t.subjects.other}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">{t.message}</label>
                  <textarea 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Détaillez votre projet..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-primary-500/30 transition duration-300 transform hover:-translate-y-0.5"
                >
                  {t.send}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};