// =============================================================
//  BacklogCard.jsx — "Sıradakiler" (Öğrenme Bekleme Listesi) kartı
// -------------------------------------------------------------
//  Görevi: Yakın gelecekte öğrenmeyi/yapmayı planladığım şeyleri
//  checkbox tarzı (ama STATİK — tıklanamaz) bir liste olarak göstermek.
//  "Şu an odağım" bugünü; bu kart ise "sırada ne var?" sorusunu yanıtlar.
// =============================================================

import { ListTodo, Square, CheckSquare } from 'lucide-react'

// --- Bekleme listesi öğeleri ---
// completed: true → tamamlanmış (üzeri çizili). Diziyi .map() ile render ediyoruz.
// Tamamlanan bir öğe olunca sadece completed'ı true yapmak yeterli.
const backlogItems = [
  { text: 'Git ve GitHub temellerini öğrenmek', completed: true },
  { text: 'Docker temelleri & konteyner yapısını öğrenmek', completed: false },
  { text: 'React Native ile mobil uygulama denemesi', completed: false },
  { text: 'Clean Architecture kitabını bitirmek', completed: false },
  { text: 'Kişisel portfolyo sitesini yayına almak', completed: false },
  { text: 'Açık kaynak bir projeye ilk katkımı yapmak', completed: false },
]

function BacklogCard() {
  return (
    <article className="card card--backlog">
      {/* Ghost ikon: kartın filigran kimliği (CSS .card__ghost) */}
      <ListTodo className="card__ghost" strokeWidth={1.5} aria-hidden="true" />
      <div className="card__head">
        <span className="card__icon" aria-hidden="true">
          <ListTodo size={20} />
        </span>
        <h2 className="card__title">Sıradakiler</h2>
      </div>

      {/* Liste: her öğe için duruma göre dolu/boş checkbox ikonu seçiyoruz */}
      <ul className="backlog-list">
        {backlogItems.map((item) => (
          // completed'a göre satıra "tamamlandı" sınıfı ekliyoruz (üzeri çizili stil)
          <li
            key={item.text}
            className={`backlog-item${item.completed ? ' backlog-item--done' : ''}`}
          >
            {/* Tamamlanmışsa dolu (CheckSquare), değilse boş (Square) ikon.
                Bu yalnızca GÖRSEL — tıklanabilir değil. */}
            {item.completed ? (
              <CheckSquare size={17} className="backlog-item__icon" aria-hidden="true" />
            ) : (
              <Square size={17} className="backlog-item__icon" aria-hidden="true" />
            )}
            <span>{item.text}</span>
          </li>
        ))}
      </ul>

      {/* Statik güncelleme notu */}
      <p className="backlog-note">Son güncelleme: Haziran 2026</p>
    </article>
  )
}

export default BacklogCard
