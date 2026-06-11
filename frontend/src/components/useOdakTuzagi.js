// =============================================================
//  useOdakTuzagi.js — Modal için odak (focus) yönetimi hook'u
// -------------------------------------------------------------
//  WCAG gereği bir dialog açıkken klavye odağı dışarı çıkmamalı:
//   1. Açılınca odağı modalın içine taşır (ilk odaklanabilir öğe).
//   2. Tab / Shift+Tab uçlarda döngü yapar (odak tuzağı).
//   3. Kapanınca odağı, modalı açan öğeye geri verir.
//
//  Kullanım: const dialogRef = useOdakTuzagi(acikMi)
//            <div ref={dialogRef} role="dialog" ...>
// =============================================================

import { useEffect, useRef } from 'react'

// Modal içinde odaklanabilir öğeleri seçen ortak seçici
const ODAKLANABILIR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

function useOdakTuzagi(acikMi) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!acikMi) return
    const dialog = dialogRef.current
    if (!dialog) return

    // Modalı açan öğeyi hatırla → kapanınca odağı ona geri vereceğiz
    const oncekiOdak = document.activeElement

    // Açılışta odağı dialog kapsayıcısının KENDİSİNE taşı.
    // İlk butona (çarpıya) odaklamak :focus-visible halkasını çiziyordu;
    // kapsayıcıya odak hem tuzağı başlatır hem görsel halka bırakmaz.
    // Klavyeyle Tab'layan kullanıcı butona gelince halkayı yine görür.
    dialog.tabIndex = -1
    dialog.focus({ preventScroll: true })

    // Tab uçlarda döngü: son öğeden ileri → ilk öğe, ilkten geri → son öğe
    function tusDinle(e) {
      if (e.key !== 'Tab') return
      const ogeler = Array.from(dialog.querySelectorAll(ODAKLANABILIR)).filter(
        (el) => !el.disabled && el.offsetParent !== null,
      )
      if (ogeler.length === 0) return
      const ilk = ogeler[0]
      const son = ogeler[ogeler.length - 1]

      // Odak henüz kapsayıcının kendisindeyken Shift+Tab dışarı kaçmasın
      if (e.shiftKey && (document.activeElement === ilk || document.activeElement === dialog)) {
        e.preventDefault()
        son.focus()
      } else if (!e.shiftKey && document.activeElement === son) {
        e.preventDefault()
        ilk.focus()
      }
    }
    dialog.addEventListener('keydown', tusDinle)

    return () => {
      dialog.removeEventListener('keydown', tusDinle)
      // Odağı modalı açan öğeye geri ver (hâlâ sayfadaysa)
      if (oncekiOdak && typeof oncekiOdak.focus === 'function') {
        oncekiOdak.focus()
      }
    }
  }, [acikMi])

  return dialogRef
}

export default useOdakTuzagi
