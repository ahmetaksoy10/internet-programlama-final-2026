// =============================================================
//  ClapButton.jsx — Ziyaretçi etkileşimi (beğeni / alkış butonu)
// -------------------------------------------------------------
//  Görevi: Ziyaretçinin sayfayı "beğenmesini" sağlamak.
//  Beğeni sayısı localStorage'da tutulur → sayfa yenilense bile korunur.
//  Tıklayınca küçük bir "kalp patlaması" animasyonu oynar.
//
//  Dersle ilişkisi: useState (sayaç + parçacıklar), olay yönetimi,
//  localStorage ile kalıcılık, koşullu/dinamik render (.map).
// =============================================================

import { useState } from 'react'
import { Heart } from 'lucide-react'

function ClapButton() {
  // Başlangıç değeri localStorage'dan okunur (yoksa 0).
  const [sayi, setSayi] = useState(() => Number(localStorage.getItem('begeni') || 0))
  // Tıklamada butonun "zıplama" animasyonu için geçici durum
  const [animasyon, setAnimasyon] = useState(false)
  // Yukarı süzülen kalp parçacıkları
  const [parcaciklar, setParcaciklar] = useState([])

  function begen() {
    const yeni = sayi + 1
    setSayi(yeni)
    localStorage.setItem('begeni', String(yeni)) // tarayıcıda kalıcı sakla

    // Butonu kısa süreliğine zıplat
    setAnimasyon(true)
    setTimeout(() => setAnimasyon(false), 300)

    // Kalp patlaması: 3 parçacık üret (her biri rastgele yöne süzülür)
    const taban = Date.now()
    const grup = [0, 1, 2].map((k) => ({
      id: taban + k,
      dx: Math.round(Math.random() * 44 - 22), // yatay kayma (-22..22 px)
    }))
    setParcaciklar((p) => [...p, ...grup])
    // Animasyon bitince parçacıkları temizle
    setTimeout(() => {
      setParcaciklar((p) => p.filter((x) => !grup.some((g) => g.id === x.id)))
    }, 850)
  }

  return (
    <div className="clap">
      <span className="clap__label">Bu sayfayı beğendin mi?</span>
      <button
        className={`clap__btn${animasyon ? ' clap__btn--pop' : ''}`}
        onClick={begen}
        aria-label="Sayfayı beğen"
      >
        {/* Kalp patlaması parçacıkları (dekoratif) */}
        {parcaciklar.map((p) => (
          <Heart
            key={p.id}
            className="heart-particle"
            size={14}
            style={{ '--dx': `${p.dx}px` }}
            aria-hidden="true"
          />
        ))}
        <Heart size={18} aria-hidden="true" />
        <span>{sayi}</span>
      </button>
    </div>
  )
}

export default ClapButton
