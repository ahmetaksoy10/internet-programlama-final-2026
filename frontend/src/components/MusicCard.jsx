// =============================================================
//  MusicCard.jsx — "Şu An Kulaklıkta" (Music) kartı
// -------------------------------------------------------------
//  Görevi: Şu sıralar dinlediğim çalma listesini Apple Music'in
//  resmi gömülü (embed) oynatıcısıyla CANLI göstermek.
//  Oynatıcı doğrudan Apple Music'ten gelir; ziyaretçi parçaları
//  buradan dinleyebilir.
// =============================================================

import { Headphones } from 'lucide-react'

function MusicCard() {
  return (
    <article className="card card--music">
      <div className="card__head">
        <span className="card__icon" aria-hidden="true">
          <Headphones size={20} />
        </span>
        <h2 className="card__title">Şu An Kulaklıkta</h2>
      </div>

      {/* Geniş ekranda: açıklama solda, oynatıcı sağda.
          Dar ekranda: alt alta yığılır (flex-wrap). */}
      <div className="music-embed">
        <p className="music-embed__caption">
          Bu sıralar kod yazarken dinlediğim Türkçe çalma listesi. Apple Music'ten
          canlı gömülü — istediğin parçayı doğrudan buradan çalabilirsin. 🎧
        </p>

        {/* Apple Music resmi embed oynatıcısı (sağlanan iframe, JSX'e uyarlandı) */}
        <iframe
          title="Apple Music — Türkçe çalma listesi"
          className="music-embed__frame"
          allow="autoplay *; encrypted-media *;"
          frameBorder="0"
          height="450"
          loading="lazy"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          src="https://embed.music.apple.com/tr/playlist/t%C3%BCrk%C3%A7e/pl.u-PDb4034Feq4lZly?l=tr"
        />
      </div>
    </article>
  )
}

export default MusicCard
