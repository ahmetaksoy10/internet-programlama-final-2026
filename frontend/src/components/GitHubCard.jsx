// =============================================================
//  GitHubCard.jsx — "GitHub'dan Canlı" kartı  (CANLI VERİ / API)
// -------------------------------------------------------------
//  Görevi: GitHub REST API'sinden hesabımın son herkese açık
//  commit'lerini canlı olarak çekip listelemek.
//
//  Bu kart, dersin teknik özünü gösterir:
//   - fetch() ile HTTP isteği (üstelik iki aşamalı)
//   - useEffect ile yan etki (side effect) yönetimi
//   - useState ile veri / yükleniyor / hata durumlarının tutulması
//   - Promise.all ile birden çok isteği PARALEL çalıştırma
//   - Dizi (array) verisinin .map() ile listelenmesi
//
//  NOT: GitHub'ın "events" uç noktası commit MESAJINI içermez; yalnızca
//  her push'un en son commit kimliğini (sha) verir. Bu yüzden mesajı almak
//  için her push için ikinci bir istek ("o commit'in detayı") atıyoruz.
// =============================================================

// React'tan iki temel Hook'u içe aktarıyoruz:
// - useState: bileşenin hafızasında veri tutmak için
// - useEffect: bileşen ekrana geldiğinde (render) yan etki çalıştırmak için
import { useState, useEffect } from 'react'
import { Github, FolderGit2, MessageSquare, Calendar } from 'lucide-react'

// Verisini çekeceğimiz GitHub kullanıcı adı (tek yerde tanımlı, kolay değişir).
const GITHUB_KULLANICI = 'ahmetaksoy10'
// Kaç adet commit göstereceğimiz.
const COMMIT_SAYISI = 5

function GitHubCard() {
  // --- 1) STATE TANIMLARI ---
  // commitler: API'den gelip işlenen commit listesini tutar (başlangıçta boş dizi).
  const [commitler, setCommitler] = useState([])
  // yukleniyor: veri henüz gelmediyse true olur, ekranda "yükleniyor" gösteririz.
  const [yukleniyor, setYukleniyor] = useState(true)
  // hata: istek başarısız olursa kullanıcıya gösterilecek hata mesajını tutar.
  const [hata, setHata] = useState(null)

  // --- 2) VERİ ÇEKME (useEffect) ---
  // useEffect'i boş bağımlılık dizisi [] ile kullanıyoruz; içindeki kod YALNIZCA
  // bileşen İLK KEZ ekrana geldiğinde bir defa çalışır ("sayfa açıldı" anı gibi).
  useEffect(() => {
    // useEffect fonksiyonunun kendisi async olamaz; bu yüzden içeride bir async
    // yardımcı fonksiyon tanımlayıp hemen çağırıyoruz.
    async function commitleriGetir() {
      try {
        // === 1. AŞAMA: Kullanıcının son herkese açık olaylarını (events) çek ===
        // await: isteğin yanıtı gelene kadar bekler, sonra devam eder.
        const olayYaniti = await fetch(
          `https://api.github.com/users/${GITHUB_KULLANICI}/events`,
        )
        // response.ok, HTTP durumu 200-299 aralığındaysa true olur (örn. 403 rate limit ise false).
        if (!olayYaniti.ok) {
          throw new Error('GitHub olayları alınamadı: ' + olayYaniti.status)
        }
        // Yanıt gövdesini JSON'a çeviriyoruz (en yeni olay en başta gelir).
        const olaylar = await olayYaniti.json()

        // Sadece "PushEvent" (kod gönderme) türündekileri süzüp en yeni 5 tanesini alıyoruz.
        const pushOlaylari = olaylar
          .filter((olay) => olay.type === 'PushEvent')
          .slice(0, COMMIT_SAYISI)

        // === 2. AŞAMA: Her push için commit'in MESAJINI ayrı istekle çek ===
        // Promise.all, dizideki tüm istekleri aynı anda (paralel) başlatır ve
        // hepsi tamamlanınca sonuçları sırayla bir diziye koyar. Bu, tek tek
        // beklemekten çok daha hızlıdır.
        const sonuc = await Promise.all(
          pushOlaylari.map(async (olay) => {
            const repoTamAd = olay.repo.name // "kullanici/depo" biçiminde
            const sha = olay.payload.head // push sonrası en son commit kimliği (sha)
            try {
              // İlgili commit'in detayını çekiyoruz (mesaj ve tarih burada bulunur).
              const commitYaniti = await fetch(
                `https://api.github.com/repos/${repoTamAd}/commits/${sha}`,
              )
              if (!commitYaniti.ok) throw new Error('commit detayı alınamadı')
              const commitVerisi = await commitYaniti.json()
              return {
                repo: repoTamAd.split('/')[1] ?? repoTamAd, // sadece depo adı
                mesaj: commitVerisi.commit.message.split('\n')[0], // mesajın ilk satırı
                tarih: commitVerisi.commit.author.date, // commit'in atıldığı an
                sha,
              }
            } catch {
              // İkincil istek başarısız olursa (örn. rate limit), elimizdeki
              // bilgilerle bir yedek satır üretip kartın çalışmaya devam etmesini sağlıyoruz.
              return {
                repo: repoTamAd.split('/')[1] ?? repoTamAd,
                mesaj:
                  (olay.payload.ref?.replace('refs/heads/', '') ?? 'main') +
                  ' dalına push yapıldı',
                tarih: olay.created_at,
                sha,
              }
            }
          }),
        )

        // İşlenen commit listesini state'e kaydediyoruz → arayüz yeniden çizilir.
        setCommitler(sonuc)
      } catch (err) {
        // Ağ hatası ya da yukarıda fırlatılan hatalar buraya düşer.
        console.error('GitHub verisi alınamadı:', err)
        setHata('GitHub verilerine şu an ulaşılamıyor.')
      } finally {
        // Başarılı da olsa hatalı da olsa, yükleniyor durumunu kapatıyoruz.
        setYukleniyor(false)
      }
    }

    // Tanımladığımız async fonksiyonu çağırıyoruz.
    commitleriGetir()
  }, []) // <-- boş dizi: efekt sadece ilk render'da bir kez çalışır.

  // --- 3) Tarihi Türkçe ve okunabilir biçime çeviren yardımcı fonksiyon ---
  // Örnek çıktı: "8 Haziran 2026, 14:30"
  function tarihiBicimlendir(isoTarih) {
    return new Date(isoTarih).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // --- 4) ARAYÜZ (render) ---
  return (
    <article className="card card--github">
      <div className="card__head">
        <span className="card__icon" aria-hidden="true">
          <Github size={20} />
        </span>
        <h2 className="card__title">GitHub'dan Canlı</h2>
      </div>

      {/* DURUM 1: Veri yükleniyorsa basit bir spinner + metin gösteriyoruz */}
      {yukleniyor && (
        <div className="gh-status">
          <span className="spinner" aria-hidden="true" />
          <span>Veriler yükleniyor…</span>
        </div>
      )}

      {/* DURUM 2: Hata varsa kullanıcıyı nazikçe bilgilendiriyoruz */}
      {hata && !yukleniyor && <p className="gh-error">{hata}</p>}

      {/* DURUM 3: Yükleme bitti, hata yok ama hiç commit gelmediyse */}
      {!yukleniyor && !hata && commitler.length === 0 && (
        <p className="card__text">
          Son zamanlarda herkese açık bir commit aktivitesi bulunamadı.
        </p>
      )}

      {/* DURUM 4: Commit'ler geldiyse listeyi .map() ile basıyoruz */}
      {!yukleniyor && !hata && commitler.length > 0 && (
        <ul className="commit-list">
          {commitler.map((commit, index) => (
            // key: React'ın listeyi verimli güncellemesi için benzersiz değer.
            <li key={commit.sha + '-' + index} className="commit-item">
              {/* Repo adı satırı */}
              <div className="commit-item__repo">
                <FolderGit2 size={15} aria-hidden="true" />
                <span>{commit.repo}</span>
              </div>

              {/* Commit mesajı satırı */}
              <div className="commit-item__msg">
                <MessageSquare size={15} aria-hidden="true" />
                <span>{commit.mesaj}</span>
              </div>

              {/* Tarih satırı (Türkçe formatlı) */}
              <div className="commit-item__date">
                <Calendar size={15} aria-hidden="true" />
                <span>{tarihiBicimlendir(commit.tarih)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default GitHubCard
