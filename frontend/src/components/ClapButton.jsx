// =============================================================
//  ClapButton.jsx — Ziyaretçi etkileşimi (beğeni / alkış butonu)
// -------------------------------------------------------------
//  Görevi: Ziyaretçinin sayfayı "beğenmesini" sağlamak.
//  Beğeni sayısı localStorage'da tutulur → sayfa yenilense bile korunur.
//  (Sunucu/veritabanı gerektirmeyen, tarayıcıda yaşayan basit bir sayaç.)
//
//  Dersle ilişkisi: useState (sayaç durumu), olay yönetimi (onClick),
//  localStorage ile kalıcılık ve koşullu sınıf (animasyon) kullanır.
// =============================================================

import { useState } from 'react'
import { Heart } from 'lucide-react'

function ClapButton() {
  // Başlangıç değeri localStorage'dan okunur (yoksa 0). Fonksiyon initializer
  // sayesinde bu okuma yalnızca ilk render'da bir kez yapılır.
  const [sayi, setSayi] = useState(() => Number(localStorage.getItem('begeni') || 0))
  // Tıklama anında küçük bir "zıplama" animasyonu için geçici durum
  const [animasyon, setAnimasyon] = useState(false)

  // Beğen butonuna basınca: sayıyı artır, kaydet, kısa animasyon tetikle
  function begen() {
    const yeni = sayi + 1
    setSayi(yeni)
    localStorage.setItem('begeni', String(yeni)) // tarayıcıda kalıcı sakla
    setAnimasyon(true)
    // 300 ms sonra animasyon sınıfını kaldır (tekrar tetiklenebilsin)
    setTimeout(() => setAnimasyon(false), 300)
  }

  return (
    <div className="clap">
      <span className="clap__label">Bu sayfayı beğendin mi?</span>
      <button
        className={`clap__btn${animasyon ? ' clap__btn--pop' : ''}`}
        onClick={begen}
        aria-label="Sayfayı beğen"
      >
        <Heart size={18} aria-hidden="true" />
        <span>{sayi}</span>
      </button>
    </div>
  )
}

export default ClapButton
