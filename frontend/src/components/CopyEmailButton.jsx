// =============================================================
//  CopyEmailButton.jsx — E-posta adresini panoya kopyalayan buton
// -------------------------------------------------------------
//  Görevi: Footer'daki "E-posta" bağlantısı yerine geçer. Tıklayınca
//  adresi panoya kopyalar ve ekranın altında kısa bir "Kopyalandı"
//  bildirimi (toast) gösterir.
//
//  - navigator.clipboard ile asenkron kopyalama (modern yöntem)
//  - Pano API engelliyse eski execCommand yöntemine düşer (yedek)
//  - Toast, createPortal ile doğrudan <body>'ye basılır (kartların
//    camsı zemininden etkilenmesin diye — ProjectModal'daki ile aynı sebep)
// =============================================================

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Mail, Check } from 'lucide-react'

// İletişim e-postası (tek yerde tanımlı)
const EPOSTA = 'a.aksoy1020@gmail.com'

function CopyEmailButton() {
  const [kopyalandi, setKopyalandi] = useState(false)
  const zamanlayiciRef = useRef(null)

  // Bileşen kaldırılırsa bekleyen zamanlayıcıyı temizle
  useEffect(() => () => clearTimeout(zamanlayiciRef.current), [])

  async function kopyala() {
    try {
      await navigator.clipboard.writeText(EPOSTA)
    } catch {
      // Pano API yoksa/engelliyse: gizli textarea + execCommand ile kopyala
      const ta = document.createElement('textarea')
      ta.value = EPOSTA
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try {
        document.execCommand('copy')
      } catch {
        /* kopyalanamadıysa sessizce geç */
      }
      document.body.removeChild(ta)
    }

    // Bildirimi göster ve 2.2 sn sonra gizle
    setKopyalandi(true)
    clearTimeout(zamanlayiciRef.current)
    zamanlayiciRef.current = setTimeout(() => setKopyalandi(false), 2200)
  }

  return (
    <>
      <button
        type="button"
        className="footer__link footer__link--btn"
        onClick={kopyala}
        aria-label="E-posta adresini panoya kopyala"
      >
        <Mail size={18} aria-hidden="true" />
        E-posta
      </button>

      {/* Toast bildirimi — ekranın altında ortalı */}
      {kopyalandi &&
        createPortal(
          <div className="toast" role="status" aria-live="polite">
            <span className="toast__icon" aria-hidden="true">
              <Check size={15} />
            </span>
            E-posta kopyalandı · <strong>{EPOSTA}</strong>
          </div>,
          document.body,
        )}
    </>
  )
}

export default CopyEmailButton
