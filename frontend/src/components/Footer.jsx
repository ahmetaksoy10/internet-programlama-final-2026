// =============================================================
//  Footer.jsx — Sayfa altı bilgi bölümü
// -------------------------------------------------------------
//  Görevi: nownownow.com ilham kaynağını + dinamik yılı göstermek
//  ve iletişim/sosyal bağlantıları (GitHub / LinkedIn / E-posta) sunmak.
//  (İletişim bilgileri eski ContactCard'dan buraya taşındı.)
// =============================================================

import { Github, Linkedin, Mail } from 'lucide-react'

// --- Footer bağlantıları ---
// Her bağlantı: ikon, görünen metin ve hedef adres (href).
// TODO: E-posta ve LinkedIn bağlantılarını gerçek bilgilerle güncelle.
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
    href: 'https://www.linkedin.com/',
    label: 'LinkedIn profilim',
  },
  {
    icon: Mail,
    metin: 'E-posta',
    href: 'mailto:placeholder@email.com',
    label: 'E-posta gönder',
  },
]

function Footer() {
  // İçinde bulunduğumuz yılı otomatik alıyoruz; her yıl elle güncellemeye gerek kalmaz.
  const yil = new Date().getFullYear()

  return (
    // Semantik <footer> etiketi: sayfanın alt bilgi bölümünü temsil eder.
    <footer className="footer">
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
      </div>
    </footer>
  )
}

export default Footer
