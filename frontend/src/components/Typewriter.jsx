// =============================================================
//  Typewriter.jsx — Metni harf harf "yazıyormuş" gibi gösteren efekt
// -------------------------------------------------------------
//  Props:
//   - text   : Yazılacak metin (zorunlu)
//   - speed  : Harf başına gecikme (ms), varsayılan 30
//   - onDone : Yazma bitince çağrılır (opsiyonel)
//
//  KOLAY KALDIRMA: Bu efekti denemek/iptal etmek için Header.jsx içinde
//  <Typewriter text={...} /> yerine düz metni yazman yeterli; başka hiçbir
//  yere dokunmaya gerek yok.
//
//  ERİŞİLEBİLİRLİK: Kullanıcı "hareketi azalt" tercihindeyse animasyon
//  atlanır ve metin anında tam görünür.
// =============================================================

import { useState, useEffect } from 'react'

function Typewriter({ text, speed = 30, onDone }) {
  // Tarayıcı hareketi azaltma tercihini kontrol et (mount anında bir kez yeterli)
  const azalt =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Şu ana kadar gösterilen harf sayısı (azaltma açıksa direkt tam metin)
  const [uzunluk, setUzunluk] = useState(azalt ? text.length : 0)

  useEffect(() => {
    if (azalt) {
      onDone?.()
      return
    }
    setUzunluk(0)
    let i = 0
    const zamanlayici = setInterval(() => {
      i += 1
      setUzunluk(i)
      if (i >= text.length) {
        clearInterval(zamanlayici)
        onDone?.()
      }
    }, speed)
    return () => clearInterval(zamanlayici)
    // onDone kasıtlı olarak bağımlılıkta yok (her render'da değişebilir)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, azalt])

  const bitti = uzunluk >= text.length

  return (
    <span className="typewriter">
      {text.slice(0, uzunluk)}
      {/* Yazma sürerken yanıp sönen imleç; bitince kaybolur */}
      {!bitti && <span className="typewriter__caret" aria-hidden="true" />}
    </span>
  )
}

export default Typewriter
