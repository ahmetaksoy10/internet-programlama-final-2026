// =============================================================
//  ThemeToggle.jsx — Aydınlık / Karanlık tema değiştirici
// -------------------------------------------------------------
//  Görevi: Sayfanın temasını değiştirmek ve tercihi hatırlamak.
//  - useState ile aktif temayı tutar
//  - useEffect ile <html> etiketine data-theme yazar (CSS bunu okur)
//  - localStorage ile tercih kalıcı olur (sayfa yenilenince korunur)
//  - İlk açılışta kayıt yoksa işletim sisteminin tercihini kullanır
// =============================================================

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

// Başlangıç temasını belirleyen yardımcı fonksiyon.
// Öncelik: daha önce kaydedilen tercih → yoksa sistem (OS) tercihi.
function baslangicTemasi() {
  const kayitli = localStorage.getItem('tema')
  if (kayitli === 'light' || kayitli === 'dark') return kayitli
  // İşletim sistemi karanlık modda mı? matchMedia ile öğreniyoruz.
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function ThemeToggle() {
  // useState'e fonksiyon veriyoruz → başlangıç değeri yalnızca bir kez hesaplanır.
  const [tema, setTema] = useState(baslangicTemasi)

  // Tema her değiştiğinde: <html data-theme="..."> güncelle + localStorage'a yaz.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema)
    localStorage.setItem('tema', tema)
  }, [tema])

  const karanlikMi = tema === 'dark'

  // Temayı değiştir + geçişi yumuşat.
  // 'theme-anim' sınıfı kısa süreliğine eklenir; CSS bu sırada renkleri
  // yumuşakça geçirir, sonra kaldırılır (kalıcı geçiş maliyeti olmasın).
  function temayiDegistir() {
    document.documentElement.classList.add('theme-anim')
    setTema(karanlikMi ? 'light' : 'dark')
    window.setTimeout(() => {
      document.documentElement.classList.remove('theme-anim')
    }, 450)
  }

  return (
    <button
      className="theme-toggle"
      onClick={temayiDegistir}
      aria-label={karanlikMi ? 'Aydınlık temaya geç' : 'Karanlık temaya geç'}
      title={karanlikMi ? 'Aydınlık tema' : 'Karanlık tema'}
    >
      {/* Karanlıktaysak güneş (aydınlığa geçiş), aydınlıktaysak ay ikonu göster */}
      {karanlikMi ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

export default ThemeToggle
