// =============================================================
//  Header.jsx — Sayfanın üst başlık / profil bölümü
// -------------------------------------------------------------
//  Görevi:
//   - Sol tarafta bir profil fotoğrafı (şimdilik placeholder)
//   - Sağ tarafta isim, kısa bio, konum ve son güncelleme tarihi
//   - new Date() ile güncelleme tarihini Türkçe ve otomatik göstermek
// =============================================================

// Lucide React ikonları (sistem emojisi yerine tutarlı SVG ikonlar)
import { Sparkles, MapPin, CalendarClock } from 'lucide-react'
// Aydınlık/karanlık tema değiştirici buton
import ThemeToggle from './ThemeToggle.jsx'
// Profil fotoğrafı — Vite asset olarak import edilir (GitHub Pages base yolu
// otomatik düzeltilsin diye <img src="/..."> yerine modül importu tercih edildi).
import profilFoto from '../assets/profile.jpg'

function Header() {
  // --- Son güncelleme tarihi ---
  // new Date() içinde bulunduğumuz anı verir; toLocaleDateString('tr-TR', {...})
  // ile Türkçe ay isimleriyle biçimlendiriyoruz. Örn: "8 Haziran 2026"
  const sonGuncelleme = new Date().toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    // Semantik <header>: sayfanın giriş/başlık bölümü
    <header className="header">
      {/* Sağ üst köşede tema değiştirici (aydınlık/karanlık) */}
      <ThemeToggle />

      {/* === SOL: Profil fotoğrafı === */}
      <div className="profile-photo">
        <img
          src={profilFoto}
          alt="Ahmet Aksoy'un profil fotoğrafı"
          className="profile-photo__img"
          width="104"
          height="104"
          loading="eager"
        />
      </div>

      {/* === SAĞ: İsim + bio + meta bilgiler === */}
      <div className="header__info">
        {/* Küçük üst etiket ("şu an" / now page konseptini vurgular) */}
        <span className="header__eyebrow">
          <Sparkles size={15} aria-hidden="true" />
          şu an · now page
        </span>

        {/* Sayfada yalnızca BİR adet <h1> bulunur (SEO/erişilebilirlik kuralı) */}
        <h1 className="header__name">Ahmet Aksoy</h1>

        {/* Kısa biyografi */}
        <p className="header__bio">
          Bu sayfa, CV'min anlatamayacağı şeyleri anlatır — şu an hayatımda neler
          olduğuna dair canlı bir kesit. Balıkesir Üniversitesi Bilgisayar
          Mühendisliği 2. sınıf öğrencisiyim.
        </p>

        {/* Meta satırı: konum + son güncelleme tarihi (küçük, gri etiketler) */}
        <div className="header__meta">
          <span className="meta-pill">
            <MapPin size={14} aria-hidden="true" />
            Karesi, Balıkesir
          </span>
          <span className="meta-pill">
            <CalendarClock size={14} aria-hidden="true" />
            Son güncelleme: {sonGuncelleme}
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
