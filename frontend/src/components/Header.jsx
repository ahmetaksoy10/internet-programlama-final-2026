// =============================================================
//  Header.jsx — Sayfanın üst başlık / profil bölümü
// -------------------------------------------------------------
//  Görevi:
//   - Sol tarafta bir profil fotoğrafı (şimdilik placeholder)
//   - Sağ tarafta isim, kısa bio, konum ve son güncelleme tarihi
//   - new Date() ile güncelleme tarihini Türkçe ve otomatik göstermek
// =============================================================

import { useState } from 'react'
// Lucide React ikonları (sistem emojisi yerine tutarlı SVG ikonlar)
import { Sparkles, MapPin, CalendarClock } from 'lucide-react'
// Aydınlık/karanlık tema değiştirici buton
import ThemeToggle from './ThemeToggle.jsx'
// Bio ilk cümlesini harf harf yazan efekt (kolayca kaldırılabilir — aşağıya bak)
import Typewriter from './Typewriter.jsx'
// Profil fotoğrafı — Vite asset olarak import edilir (GitHub Pages base yolu
// otomatik düzeltilsin diye <img src="/..."> yerine modül importu tercih edildi).
import profilFoto from '../assets/profile.jpg'

// Bio iki parçaya ayrıldı: ilk cümle daktilo efektiyle yazılır, kalanı sonra belirir.
const BIO_ILK =
  'Bu sayfa, CV’min anlatamayacağı şeyleri anlatır — şu an hayatımda neler olduğuna dair canlı bir kesit.'
const BIO_KALAN =
  'Balıkesir Üniversitesi Bilgisayar Mühendisliği 2. sınıf öğrencisiyim.'

function Header() {
  // Daktilo efekti bitince bio'nun kalan kısmını yumuşakça göster
  const [bioBitti, setBioBitti] = useState(false)
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

      {/* === SOL: Profil fotoğrafı ===
          .profile-ring: fotoğrafın etrafında yavaşça dönen conic-gradient
          halka (CSS ::before). Fotoğrafın kendi beyaz çerçevesi, halka ile
          arasında zarif bir boşluk bırakır. */}
      <div className="profile-ring">
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
      </div>

      {/* === SAĞ: İsim + bio + meta bilgiler === */}
      <div className="header__info">
        
        {/* Sayfada yalnızca BİR adet <h1> bulunur (SEO/erişilebilirlik kuralı) */}
        <h1 className="header__name">Ahmet AKSOY</h1>

        {/* Kısa biyografi.
            DAKTİLO EFEKTİNİ KALDIRMAK İSTERSEN: <Typewriter .../> yerine
            {BIO_ILK} yaz ve kalan <span>'ı her zaman görünür bırak. */}
        <p className="header__bio">
          <Typewriter text={BIO_ILK} onDone={() => setBioBitti(true)} />{' '}
          <span className={`header__bio-rest${bioBitti ? ' is-shown' : ''}`}>
            {BIO_KALAN}
          </span>
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
          {/* İşe alım sinyali: yeşil "radar" noktası + kısa, net etiket.
              Pill ailesiyle aynı boy/dil — yeşil tonuyla içlerinden ayrışır. */}
          <span className="avail-badge">
            <span className="avail-dot" aria-hidden="true" />
            Staja açığım · Yaz 2026
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
