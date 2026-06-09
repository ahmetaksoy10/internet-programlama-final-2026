// =============================================================
//  ProjectModal.jsx — Proje detaylarını gösteren açılır pencere (modal)
// -------------------------------------------------------------
//  Görevi: Bir projeye tıklandığında ekranın ortasında, o projenin
//  uzun açıklamasını, teknolojilerini ve repo bağlantısını gösteren
//  bir modal açmak.
//
//  Props:
//   - proje   : Gösterilecek proje objesi (null ise modal kapalı demektir)
//   - onClose : Modalı kapatmak için çağrılan fonksiyon
// =============================================================

import { useEffect } from 'react'
import { X, ExternalLink } from 'lucide-react'

function ProjectModal({ proje, onClose }) {
  // --- ESC tuşu + sayfa kaydırma kilidi ---
  // ÖNEMLİ: Bu efekt SADECE modal açıkken (proje doluyken) iş yapmalı.
  // Aksi halde modal kapalıyken bile body'nin kaydırması kilitlenir.
  useEffect(() => {
    // Modal kapalıysa (proje yok) hiçbir şey yapma
    if (!proje) return

    // Klavyede ESC'e basılınca modalı kapatan dinleyici
    function tusDinle(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', tusDinle)
    // Modal açıkken arka plan sayfanın kaymasını engelliyoruz
    document.body.style.overflow = 'hidden'

    // Temizleme: modal kapanınca (proje null olunca) dinleyiciyi kaldır,
    // kaydırmayı geri aç.
    return () => {
      document.removeEventListener('keydown', tusDinle)
      document.body.style.overflow = ''
    }
  }, [proje, onClose])

  // proje null ise hiçbir şey çizme (modal kapalı)
  if (!proje) return null

  // İlgili projenin Lucide ikonunu değişkene alıyoruz
  const Ikon = proje.icon

  return (
    // Overlay: koyu yarı saydam arka plan. Üzerine tıklanınca modal kapanır.
    <div className="modal-overlay" onClick={onClose} role="presentation">
      {/* Modal kutusu. İçine yapılan tıklamanın overlay'e ulaşıp modalı
          kapatmaması için stopPropagation kullanıyoruz. */}
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sağ üst köşedeki kapatma butonu */}
        <button className="modal__close" onClick={onClose} aria-label="Kapat">
          <X size={20} aria-hidden="true" />
        </button>

        {/* Başlık: proje ikonu + proje adı */}
        <div className="modal__head">
          <span className="modal__icon" aria-hidden="true">
            <Ikon size={26} />
          </span>
          <h2 id="modal-title" className="modal__title">
            {proje.ad}
          </h2>
        </div>

        {/* Detaylı açıklama paragrafı */}
        <p className="modal__desc">{proje.detayliAciklama}</p>

        {/* Kullanılan teknolojiler (badge/chip) */}
        <div className="tag-row modal__tags">
          {proje.teknolojiler.map((tek) => (
            <span key={tek} className="tag">
              {tek}
            </span>
          ))}
        </div>

        {/* GitHub repo bağlantısı (şimdilik placeholder URL) */}
        <a
          className="modal__repo"
          href={proje.repoLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={16} aria-hidden="true" />
          GitHub'da Görüntüle
        </a>
      </div>
    </div>
  )
}

export default ProjectModal
