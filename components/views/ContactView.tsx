import React, { useState } from 'react';
import { Mail, Phone, Send, Globe, MapPin } from 'lucide-react';
import { Language } from '../../types';
import { trackContact } from '../../tracking/googleAds';

interface ContactViewProps {
  language: Language;
}

export const ContactView: React.FC<ContactViewProps> = ({ language }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', website: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

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
      successTitle: "Message envoyé",
      successDesc: "Merci, votre message nous est bien parvenu. Nous vous répondons rapidement, du lundi au vendredi.",
      sending: "Envoi en cours…",
      errorText: "L'envoi n'a pas abouti. Réessayez, ou écrivez-nous directement à contact@rice.re ou au 0692 65 61 66.",
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
      successTitle: "Message sent",
      successDesc: "Thank you, we have received your message. We will get back to you shortly, Monday to Friday.",
      sending: "Sending…",
      errorText: "Sending failed. Please try again, or write to us directly at contact@rice.re or call 0692 65 61 66.",
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

  // Envoi via FormSubmit (https://formsubmit.co) : le message arrive par email sur contact@rice.re.
  // Au tout premier envoi, FormSubmit envoie un email d'activation à contact@rice.re (lien à cliquer une fois).
  const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/contact@rice.re';
  const SUBJECT_LABELS: Record<string, string> = {
    devis: 'Demande de devis',
    etude: 'Étude environnementale',
    partenariat: 'Partenariat',
    autre: 'Autre',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setError(false);

    // Champ piège invisible : rempli uniquement par les robots, on n'envoie rien.
    if (formData.website) {
      setSubmitted(true);
      return;
    }

    const subjectLabel = SUBJECT_LABELS[formData.subject] || 'Demande de renseignement';
    setSending(true);
    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Nom: formData.name,
          email: formData.email,
          Sujet: subjectLabel,
          Message: formData.message,
          Page: typeof window !== 'undefined' ? window.location.href : '',
          _subject: `Contact site rice.re : ${subjectLabel} — ${formData.name}`,
          _replyto: formData.email,
          _template: 'table',
        }),
      });
      const data = await res.json().catch(() => ({}));
      const ok = res.ok && String((data as { success?: unknown }).success) !== 'false';
      if (!ok) throw new Error('FormSubmit');

      // Conversion Google Ads « Contact » (envoyée seulement si les cookies publicitaires sont acceptés)
      trackContact();
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
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
        <h1 className="text-4xl font-bold text-center mb-16 drop-shadow-md">{t.title}</h1>

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
                     0692 65 61 66
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

               <div className="flex items-start group">
                 <div className="bg-primary-600/20 border border-primary-500/30 p-3 rounded-lg mr-4 backdrop-blur-sm group-hover:bg-primary-500/30 transition">
                    <Globe className="h-6 w-6 text-primary-400" />
                 </div>
                 <div>
                   <h4 className="font-bold text-lg text-primary-100">Site Web</h4>
                   <a 
                     href="https://www.rice.re" 
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-white hover:text-primary-300 hover:underline transition-all text-xl font-medium block mt-1"
                   >
                     www.rice.re
                   </a>
                 </div>
               </div>

               <div className="flex items-start group">
                 <div className="bg-primary-600/20 border border-primary-500/30 p-3 rounded-lg mr-4 backdrop-blur-sm group-hover:bg-primary-500/30 transition">
                    <MapPin className="h-6 w-6 text-primary-400" />
                 </div>
                 <div>
                   <h4 className="font-bold text-lg text-primary-100">{language === 'fr' ? 'Adresse' : 'Address'}</h4>
                   <p className="text-white text-xl font-medium block mt-1">
                     Le TAMPON, La Réunion
                   </p>
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

                {/* Champ piège anti-robots, invisible pour les visiteurs */}
                <div className="hidden" aria-hidden="true">
                  <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} /></label>
                </div>

                {error && (
                  <p role="alert" className="text-sm bg-red-500/20 border border-red-300/40 text-red-100 rounded-lg px-4 py-3">{t.errorText}</p>
                )}

                <button 
                  type="submit" 
                  disabled={sending}
                  className="w-full bg-primary-600 hover:bg-primary-500 disabled:opacity-60 disabled:cursor-wait text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-primary-500/30 transition duration-300 transform hover:-translate-y-0.5"
                >
                  {sending ? t.sending : t.send}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};