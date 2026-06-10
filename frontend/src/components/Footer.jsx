// =============================================================
//  Footer.jsx — Sayfa altı bilgi bölümü
// -------------------------------------------------------------
//  Görevi: nownownow.com ilham kaynağını + dinamik yılı göstermek
//  ve iletişim/sosyal bağlantıları (GitHub / LinkedIn / E-posta) sunmak.
//  (İletişim bilgileri eski ContactCard'dan buraya taşındı.)
// =============================================================

import { Github, Linkedin } from 'lucide-react'
// Ziyaretçi etkileşimi: beğeni (alkış) butonu
import ClapButton from './ClapButton.jsx'
// E-postayı panoya kopyalayıp "Kopyalandı" bildirimi gösteren buton
import CopyEmailButton from './CopyEmailButton.jsx'

// --- Footer bağlantıları ---
// Her bağlantı: ikon, görünen metin ve hedef adres (href).
// (E-posta artık ayrı bir "kopyala" butonu olduğu için bu listede değil.)
// TODO: LinkedIn bağlantısını gerçek profille güncelle.
const baglantilar = [
  {
    icon: Github,
    metin: 'GitHub',
    href: 'https://github.com/ahmetaksoy10',
    label: 'GitHub profilim',
  },
  {
    icon: Linkedin,
    metin: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ahmet-aksoy10',
    label: 'LinkedIn profilim',
  },
]

function Footer() {
  // İçinde bulunduğumuz yılı otomatik alıyoruz; her yıl elle güncellemeye gerek kalmaz.
  const yil = new Date().getFullYear()

  return (
    // Semantik <footer> etiketi: sayfanın alt bilgi bölümünü temsil eder.
    <footer className="footer">
      {/* Ziyaretçi etkileşimi: beğeni butonu */}
      <ClapButton />

      {/* İlham / yıl satırı (dinamik) */}
      <p className="footer__note">nownownow.com'dan ilham alındı · {yil}</p>

      {/* Bağlantılar — diziyi .map() ile dönüyoruz */}
      <div className="footer__links">
        {baglantilar.map((b) => {
          const Ikon = b.icon
          return (
            <a
              key={b.metin}
              className="footer__link"
              href={b.href}
              // E-posta dışındaki (http) bağlantılar yeni sekmede açılır.
              target={b.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={b.label}
            >
              <Ikon size={18} aria-hidden="true" />
              {b.metin}
            </a>
          )
        })}
        {/* E-posta: tıklayınca adresi panoya kopyalar + toast gösterir */}
        <CopyEmailButton />
      </div>
    </footer>
  )
}

export default Footer
