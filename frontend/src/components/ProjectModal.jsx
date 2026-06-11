// =============================================================
//  ProjectModal.jsx — Proje detaylarını gösteren açılır pencere
// -------------------------------------------------------------
//  Props:
//   - proje   : Gösterilecek proje objesi (null → modal kapalı)
//   - onClose : Modalı kapatmak için çağrılan fonksiyon
//
//  Özellikler:
//   - Ekran görüntüsü galerisi (ana görsel + thumbnail şeridi)
//   - Durum rozeti (Tamamlandı / Geliştiriliyor / Devam Ediyor)
//   - Sol/sağ ok tuşuyla ve thumbnail tıklamasıyla görsel değiştirme
//   - ESC tuşu ile kapanma, overlay tıklaması ile kapanma
// =============================================================

import { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
// Klavye odağını modal içinde tutan ve kapanınca geri veren hook
import useOdakTuzagi from './useOdakTuzagi.js'

// Durum rozeti için renk haritası
const DURUM_RENK = {
  'Tamamlandı':    'status--done',
  'Geliştiriliyor': 'status--wip',
  'Devam Ediyor':  'status--active',
}

function ProjectModal({ proje, onClose }) {
  const [aktifGorsel, setAktifGorsel] = useState(0)
  // Otomatik geçiş, fareyle üzerine gelince duraklasın diye bir bayrak
  const [durdur, setDurdur] = useState(false)
  // Odak tuzağı: modal açıkken Tab dışarı çıkamaz, kapanınca odak geri döner
  const dialogRef = useOdakTuzagi(Boolean(proje))

  // Farklı bir proje açılınca galeriyi başa sar ve duraklatmayı sıfırla
  useEffect(() => {
    setAktifGorsel(0)
    setDurdur(false)
  }, [proje?.ad])

  const gorselSayisi = proje?.gorseller?.length ?? 0

  const onceki = useCallback(() => {
    setAktifGorsel((i) => (i - 1 + gorselSayisi) % gorselSayisi)
  }, [gorselSayisi])

  const sonraki = useCallback(() => {
    setAktifGorsel((i) => (i + 1) % gorselSayisi)
  }, [gorselSayisi])

  useEffect(() => {
    if (!proje) return
    function tusDinle(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && gorselSayisi > 1) onceki()
      if (e.key === 'ArrowRight' && gorselSayisi > 1) sonraki()
    }
    document.addEventListener('keydown', tusDinle)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', tusDinle)
      document.body.style.overflow = ''
    }
  }, [proje, onClose, onceki, sonraki, gorselSayisi])

  // --- Otomatik geçiş (carousel) ---
  // Her 3 sn'de bir sonraki görsele geçer ve sona gelince başa döner.
  // aktifGorsel bağımlılıkta olduğu için elle (ok/thumbnail/klavye) geçiş
  // yapılınca zamanlayıcı sıfırlanır → kullanıcı müdahalesi sonrası 3 sn
  // bekleyip otomatik akış kaldığı yerden sürer. Fareyle üzerine gelince
  // (durdur) duraklar; hareketi azaltma tercihinde hiç çalışmaz.
  useEffect(() => {
    if (!proje || gorselSayisi <= 1 || durdur) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const zamanlayici = setInterval(sonraki, 3000)
    return () => clearInterval(zamanlayici)
  }, [proje, gorselSayisi, durdur, aktifGorsel, sonraki])

  if (!proje) return null

  const Ikon = proje.icon
  const durumSinifi = DURUM_RENK[proje.durum] ?? 'status--active'

  // ÖNEMLİ: Modalı Portal ile doğrudan <body>'ye basıyoruz.
  // Aksi halde Projeler kartının camsı (backdrop-filter) zemini, içindeki
  // position:fixed overlay için "containing block" oluşturup modali ekran
  // dışına kaydırıyor. Portal bu zincirden kurtarıp viewport'a sabitler.
  return createPortal(
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kapatma butonu */}
        <button className="modal__close" onClick={onClose} aria-label="Kapat">
          <X size={18} aria-hidden="true" />
        </button>

        {/* ── GÖRSEL GALERİSİ ── */}
        {gorselSayisi > 0 && (
          <div className="modal__gallery">
            {/* Ana görsel — fareyle üzerine gelince otomatik geçiş duraklar */}
            <div
              className="modal__gallery-main"
              onMouseEnter={() => setDurdur(true)}
              onMouseLeave={() => setDurdur(false)}
            >
              <img
                key={aktifGorsel}
                src={proje.gorseller[aktifGorsel].src}
                alt={proje.gorseller[aktifGorsel].alt}
                className="modal__gallery-img"
              />

              {/* Sayaç */}
              {gorselSayisi > 1 && (
                <span className="modal__gallery-counter" aria-live="polite">
                  {aktifGorsel + 1} / {gorselSayisi}
                </span>
              )}

              {/* Sol / Sağ oklar */}
              {gorselSayisi > 1 && (
                <>
                  <button
                    className="modal__gallery-arrow modal__gallery-arrow--left"
                    onClick={onceki}
                    aria-label="Önceki görsel"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    className="modal__gallery-arrow modal__gallery-arrow--right"
                    onClick={sonraki}
                    aria-label="Sonraki görsel"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail şeridi */}
            {gorselSayisi > 1 && (
              <div className="modal__thumbs" role="list" aria-label="Tüm görseller">
                {proje.gorseller.map((g, i) => (
                  <button
                    key={i}
                    role="listitem"
                    className={`modal__thumb${i === aktifGorsel ? ' modal__thumb--active' : ''}`}
                    onClick={() => setAktifGorsel(i)}
                    aria-label={g.alt}
                    aria-pressed={i === aktifGorsel}
                  >
                    <img src={g.src} alt="" aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── BAŞLIK + DURUM ── */}
        <div className="modal__head">
          <span className="modal__icon" aria-hidden="true">
            <Ikon size={24} />
          </span>
          <h2 id="modal-title" className="modal__title">
            {proje.ad}
          </h2>
          {proje.durum && (
            <span className={`modal__status ${durumSinifi}`}>{proje.durum}</span>
          )}
        </div>

        {/* ── AÇIKLAMA ── */}
        <p className="modal__desc">{proje.detayliAciklama}</p>

        {/* ── TEKNOLOJİLER ── */}
        <p className="modal__section-label">Teknolojiler</p>
        <div className="tag-row modal__tags">
          {proje.teknolojiler.map((tek) => (
            <span key={tek} className="tag">
              {tek}
            </span>
          ))}
        </div>

        {/* ── REPO BUTONU ── */}
        <a
          className="modal__repo"
          href={proje.repoLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={15} aria-hidden="true" />
          GitHub'da Görüntüle
        </a>
      </div>
    </div>,
    document.body,
  )
}

export default ProjectModal
