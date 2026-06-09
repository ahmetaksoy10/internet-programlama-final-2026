// =============================================================
//  FocusCard.jsx — "Şu An Odağım" kartı (öne çıkarılmış / pinned)
// -------------------------------------------------------------
//  Görevi: O an üzerinde en çok mesai harcadığım işi vurgulamak.
//  Bu kart, grid içinde diğerlerinden daha geniş ve farklı arka planlıdır;
//  ayrıca bir "sabitlenmiş" (pinned) etiketi taşır.
// =============================================================

import { Target, Pin } from 'lucide-react'

function FocusCard() {
  return (
    // .card--focus: daha geniş, daha sıcak arka planlı, vurgulu kart varyantı
    <article className="card card--focus">
      {/* "Sabitlenmiş" rozeti — bu kartın öneminin altını çizer */}
      <span className="card__pin" aria-label="Sabitlenmiş içerik">
        <Pin size={14} aria-hidden="true" />
        sabitlenmiş
      </span>

      <div className="card__head">
        <span className="card__icon" aria-hidden="true">
          <Target size={20} />
        </span>
        <h2 className="card__title">Şu An Odağım</h2>
      </div>

      <p className="card__text">
        Haziran ayında katıldığım <strong>OEE Dashboard Hackathon</strong>{' '}
        projesindeyim. <strong>Python</strong> ve <strong>FastAPI</strong>{' '}
        kullanarak veri odaklı endüstriyel izleme ekranları (dashboard)
        geliştiriyorum.
      </p>

      <p className="card__text">
        Şu an asıl enerjimi <strong>"What-if" analiz modüllerine</strong>{' '}
        veriyorum: üretim verilerini simüle edip farklı senaryoları test eden,
        "ya şöyle olsaydı?" sorusunu sayısallaştıran modüller.
      </p>
    </article>
  )
}

export default FocusCard
