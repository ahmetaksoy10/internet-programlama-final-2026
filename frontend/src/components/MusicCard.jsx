// =============================================================
//  MusicCard.jsx — "Şu An Kulaklıkta" (Music) kartı
// -------------------------------------------------------------
//  Görevi: Şu sıralar dinlediğim müzik/playlist bilgisini göstermek.
//  Tamamen statik veri (API yok); içerik elle güncellenir.
// =============================================================

import { Headphones, Disc3, ExternalLink } from 'lucide-react'

function MusicCard() {
  return (
    <article className="card card--music">
      <div className="card__head">
        <span className="card__icon" aria-hidden="true">
          <Headphones size={20} />
        </span>
        <h2 className="card__title">Şu An Kulaklıkta</h2>
      </div>

      {/* Albüm kapağı placeholder'ı + bilgi yan yana */}
      <div className="music-row">
        {/* TODO: Albüm kapağı görseli eklenecek —
            bu kutuyu <img src="/album.jpg" alt="Albüm kapağı" /> ile değiştir. */}
        <div className="music-cover" aria-hidden="true">
          <Disc3 size={32} />
        </div>

        <div className="music-info">
          {/* Başlık satırı: playlist adı + "şu an çalıyor" ses dalgası animasyonu */}
          <div className="music-info__titlerow">
            {/* TODO: Playlist/sanatçı bilgisini güncelle */}
            <p className="music-info__title">Chill Coding Mix</p>
            {/* Ses dalgası (equalizer): 4 çubuğun sürekli yükselip alçalmasıyla
                "şu an müzik çalıyor" hissi verir. Animasyon saf CSS'tir. */}
            <span className="sound-wave" aria-hidden="true">
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </span>
          </div>
          <p className="music-info__artist">
            Lofi Beats · Tycho · Bonobo
          </p>
          {/* Spotify bağlantısı (placeholder link) */}
          <a
            className="music-info__link"
            href="https://open.spotify.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spotify'da aç"
          >
            <ExternalLink size={14} aria-hidden="true" />
            Spotify'da aç
          </a>
        </div>
      </div>
    </article>
  )
}

export default MusicCard
