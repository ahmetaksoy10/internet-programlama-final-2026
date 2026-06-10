// =============================================================
//  MusicCard.jsx — "Şu An Kulaklıkta" (Music) kartı
// -------------------------------------------------------------
//  Görevi: Şu sıralar dinlediğim çalma listesini Apple Music'in
//  resmi gömülü (embed) oynatıcısıyla CANLI göstermek.
//
//  KARANLIK TEMA: Sayfa karanlığa geçince embed URL'sine
//  "&theme=dark" eklenir ve iframe yeniden yüklenir (key prop)
//  → oynatıcı da koyu temaya uyum sağlar.
// =============================================================

import { useState, useEffect } from 'react'
import { Headphones } from 'lucide-react'

// Apple Music çalma listesi embed adresi (tema parametresi sonradan eklenir)
const TEMEL_URL =
  'https://embed.music.apple.com/tr/playlist/t%C3%BCrk%C3%A7e/pl.u-PDb4034Feq4lZly?l=tr'

function MusicCard() {
  // Sayfanın aktif teması karanlık mı? (data-theme attribute'una bakar)
  const [karanlik, setKaranlik] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark',
  )

  // <html data-theme> değişimini izle → tema değişince state güncellenir.
  useEffect(() => {
    const oku = () =>
      document.documentElement.getAttribute('data-theme') === 'dark'
    // Mount anında güncel değeri tekrar yakala: ThemeToggle'ın effect'i
    // data-theme'i bu effect bağlanmadan ÖNCE set etmiş olabilir (ilk
    // yüklemede karanlık tema). Bu satır o yarış durumunu telafi eder.
    setKaranlik(oku())
    const gozlemci = new MutationObserver(() => setKaranlik(oku()))
    gozlemci.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => gozlemci.disconnect()
  }, [])

  // Karanlık temada Apple'ın koyu oynatıcısını iste
  const embedUrl = karanlik ? `${TEMEL_URL}&theme=dark` : TEMEL_URL

  return (
    <article className="card card--music">
      {/* Ghost ikon: kartın filigran kimliği (CSS .card__ghost) */}
      <Headphones className="card__ghost" strokeWidth={1.5} aria-hidden="true" />
      <div className="card__head">
        <span className="card__icon" aria-hidden="true">
          <Headphones size={20} />
        </span>
        <h2 className="card__title">Şu An Kulaklıkta</h2>
      </div>

      {/* Açıklama üstte, oynatıcı altta (kart 2/3 genişlikte, dar) */}
      <div className="music-embed">
        <p className="music-embed__caption">
          Bu sıralar kod yazarken dinlediğim Türkçe çalma listesi. Apple Music'ten
          canlı gömülü — istediğin parçayı doğrudan buradan çalabilirsin. 🎧
        </p>

        {/* Apple Music resmi embed oynatıcısı.
            key: tema değişince React iframe'i tamamen yeniden oluşturur
            (yeni theme parametresiyle yüklensin diye). */}
        <iframe
          key={karanlik ? 'dark' : 'light'}
          title="Apple Music — Türkçe çalma listesi"
          className="music-embed__frame"
          allow="autoplay *; encrypted-media *;"
          frameBorder="0"
          height="450"
          loading="lazy"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          src={embedUrl}
        />
      </div>
    </article>
  )
}

export default MusicCard
