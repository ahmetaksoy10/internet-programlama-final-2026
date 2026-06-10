// =============================================================
//  FotoGaleriModal.jsx — Genel amaçlı fotoğraf lightbox'ı
// -------------------------------------------------------------
//  Props:
//   - baslik    : Galerinin başlığı (örn. "Roma, İtalya")
//   - fotolar   : [{ src, alt }] dizisi
//   - acikIndex : Açılışta gösterilecek fotoğrafın indeksi (null → kapalı)
//   - onClose   : Kapatma fonksiyonu
//
//  ProjectModal'daki galeri altyapısının (ana görsel + oklar +
//  thumbnail şeridi + klavye kontrolü) fotoğraflara özel, sade hali.
//  Aynı CSS sınıflarını (.modal-overlay, .modal__gallery-*) paylaşır
//  → sıfıra yakın yeni stil, tam görsel tutarlılık.
// =============================================================

import { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'

function FotoGaleriModal({ baslik, fotolar, acikIndex, onClose }) {
  const acik = acikIndex !== null
  const [aktif, setAktif] = useState(0)
  const fotoSayisi = fotolar.length

  // Modal her açılışında, tıklanan fotoğraftan başla
  useEffect(() => {
    if (acik) setAktif(acikIndex)
  }, [acik, acikIndex])

  const onceki = useCallback(
    () => setAktif((i) => (i - 1 + fotoSayisi) % fotoSayisi),
    [fotoSayisi],
  )
  const sonraki = useCallback(
    () => setAktif((i) => (i + 1) % fotoSayisi),
    [fotoSayisi],
  )

  // Klavye: ESC kapatır, ok tuşları gezdirir. Açıkken sayfa scroll kilitli.
  useEffect(() => {
    if (!acik) return
    function tusDinle(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onceki()
      if (e.key === 'ArrowRight') sonraki()
    }
    document.addEventListener('keydown', tusDinle)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', tusDinle)
      document.body.style.overflow = ''
    }
  }, [acik, onClose, onceki, sonraki])

  if (!acik) return null

  // Portal: kartın camsı (backdrop-filter) zemini position:fixed'i
  // bozmasın diye overlay doğrudan <body>'ye basılır (ProjectModal gibi).
  return createPortal(
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal modal--foto"
        role="dialog"
        aria-modal="true"
        aria-label={`${baslik} fotoğraf galerisi`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kapatma butonu */}
        <button className="modal__close" onClick={onClose} aria-label="Kapat">
          <X size={18} aria-hidden="true" />
        </button>

        <div className="modal__gallery">
          {/* Ana fotoğraf */}
          <div className="modal__gallery-main">
            <img
              key={aktif}
              src={fotolar[aktif].src}
              alt={fotolar[aktif].alt}
              className="modal__gallery-img"
            />

            {/* Sayaç */}
            <span className="modal__gallery-counter" aria-live="polite">
              {aktif + 1} / {fotoSayisi}
            </span>

            {/* Sol / Sağ oklar */}
            <button
              className="modal__gallery-arrow modal__gallery-arrow--left"
              onClick={onceki}
              aria-label="Önceki fotoğraf"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="modal__gallery-arrow modal__gallery-arrow--right"
              onClick={sonraki}
              aria-label="Sonraki fotoğraf"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Thumbnail şeridi */}
          <div className="modal__thumbs" role="list" aria-label="Tüm fotoğraflar">
            {fotolar.map((f, i) => (
              <button
                key={i}
                role="listitem"
                className={`modal__thumb${i === aktif ? ' modal__thumb--active' : ''}`}
                onClick={() => setAktif(i)}
                aria-label={f.alt}
                aria-pressed={i === aktif}
              >
                <img src={f.src} alt="" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        {/* Alt bilgi çubuğu: konum + aktif fotoğrafın açıklaması */}
        <div className="foto-modal__caption">
          <MapPin size={14} aria-hidden="true" />
          <strong>{baslik}</strong>
          <span className="foto-modal__alt">{fotolar[aktif].alt}</span>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default FotoGaleriModal
