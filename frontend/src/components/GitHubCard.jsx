// =============================================================
//  GitHubCard.jsx — "GitHub'dan Canlı" kartı  (CANLI VERİ / API)
// -------------------------------------------------------------
//  Görevi: GitHub REST API'sinden hesabımın profil istatistiklerini
//  ve son herkese açık commit'lerini canlı olarak çekip göstermek.
//
//  Bu kart, dersin teknik özünü gösterir:
//   - fetch() ile HTTP isteği (üstelik çok aşamalı + paralel)
//   - useEffect ile yan etki (side effect) yönetimi
//   - useState ile veri / yükleniyor / hata durumlarının tutulması
//   - Promise.all ile birden çok isteği PARALEL çalıştırma
//   - Dizi (array) verisinin .map() ile listelenmesi
//
//  NOT: GitHub'ın "events" uç noktası commit MESAJINI içermez; yalnızca
//  her push'un en son commit kimliğini (sha) ve dalını (ref) verir. Bu yüzden
//  mesajı almak için her push için ikinci bir istek ("o commit'in detayı") atıyoruz.
// =============================================================

import { useState, useEffect } from 'react'
import {
  Github,
  FolderGit2,
  MessageSquare,
  Calendar,
  Hash,
  GitBranch,
  ExternalLink,
  RefreshCw,
  Users,
} from 'lucide-react'
// Sayıları 0'dan hedefe artırarak gösteren bileşen
import CountUp from './CountUp.jsx'
// Repoların dil dağılımını SVG donut olarak çizen bileşen
import LanguageDonut from './LanguageDonut.jsx'

// Verisini çekeceğimiz GitHub kullanıcı adı (tek yerde tanımlı, kolay değişir).
const GITHUB_KULLANICI = 'ahmetaksoy10'
// Kaç adet commit göstereceğimiz.
const COMMIT_SAYISI = 5
// Donut'ta ayrı ayrı gösterilecek en fazla dil sayısı (gerisi "Diğer").
const DIL_LIMITI = 5

// Dillerin GitHub'daki resmi renkleri (donut + legend için).
// Listede olmayan diller nötr griyle gösterilir.
const DIL_RENK = {
  Swift: '#f05138',
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Java: '#b07219',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Go: '#00ADD8',
  Ruby: '#701516',
  PHP: '#4F5D95',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Shell: '#89e051',
  'Jupyter Notebook': '#DA5B0B',
}
const VARSAYILAN_RENK = '#9ca3af' // bilinmeyen diller için nötr gri
const DIGER_RENK = '#b0b3bd' // "Diğer" dilimi için

function GitHubCard() {
  // --- STATE TANIMLARI ---
  const [commitler, setCommitler] = useState([]) // işlenmiş commit listesi
  const [istatistik, setIstatistik] = useState(null) // {repo, takipci, takip}
  const [diller, setDiller] = useState([]) // dil dağılımı (donut için)
  const [cekmeZamani, setCekmeZamani] = useState(null) // verinin çekildiği an
  const [yukleniyor, setYukleniyor] = useState(true)
  const [hata, setHata] = useState(null)

  // --- VERİ ÇEKME (useEffect) ---
  // Boş bağımlılık dizisi [] → kod yalnızca ilk render'da bir kez çalışır.
  useEffect(() => {
    async function veriGetir() {
      try {
        // === 1. AŞAMA: Profil + olaylar + repolar PARALEL çek ===
        // Promise.all üç isteği aynı anda başlatır; hepsi bitince devam eder.
        const [profilYaniti, olayYaniti, repoYaniti] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_KULLANICI}`),
          fetch(`https://api.github.com/users/${GITHUB_KULLANICI}/events`),
          fetch(
            `https://api.github.com/users/${GITHUB_KULLANICI}/repos?per_page=100&sort=pushed`,
          ),
        ])
        if (!olayYaniti.ok) {
          throw new Error('GitHub olayları alınamadı: ' + olayYaniti.status)
        }
        const profil = await profilYaniti.json()
        const olaylar = await olayYaniti.json()

        // Profil istatistiklerini state'e yaz (public repo sayısı, takipçi, takip)
        setIstatistik({
          repo: profil.public_repos,
          takipci: profil.followers,
          takip: profil.following,
        })

        // --- Dil dağılımını hesapla (repo isteği başarılıysa; başarısızsa
        //     kart çökmeden donut'suz devam eder) ---
        if (repoYaniti.ok) {
          const repolar = await repoYaniti.json()
          // Her reponun ana dilini say (fork'lar başkasının dilini taşır → atla)
          const sayac = {}
          for (const r of repolar) {
            if (r.fork || !r.language) continue
            sayac[r.language] = (sayac[r.language] || 0) + 1
          }
          const toplam = Object.values(sayac).reduce((a, b) => a + b, 0)
          if (toplam > 0) {
            // En çok kullanılandan aza sırala
            const sirali = Object.entries(sayac).sort((a, b) => b[1] - a[1])
            const ilkler = sirali.slice(0, DIL_LIMITI)
            // Limitin dışındakileri tek "Diğer" diliminde topla
            const digerToplam = sirali
              .slice(DIL_LIMITI)
              .reduce((a, [, v]) => a + v, 0)

            const liste = ilkler.map(([ad, deger]) => ({
              ad,
              deger,
              renk: DIL_RENK[ad] || VARSAYILAN_RENK,
            }))
            if (digerToplam > 0) {
              liste.push({ ad: 'Diğer', deger: digerToplam, renk: DIGER_RENK })
            }
            // Oran (yay için, 0-1) ve yüzde (etiket için) ekle
            setDiller(
              liste.map((d) => ({
                ...d,
                oran: d.deger / toplam,
                yuzde: Math.round((d.deger / toplam) * 100),
              })),
            )
          }
        }

        // Sadece "PushEvent" türündekileri süzüp en yeni 5 tanesini alıyoruz.
        const pushOlaylari = olaylar
          .filter((olay) => olay.type === 'PushEvent')
          .slice(0, COMMIT_SAYISI)

        // === 2. AŞAMA: Her push için commit detayını PARALEL çek ===
        const sonuc = await Promise.all(
          pushOlaylari.map(async (olay) => {
            const repoTamAd = olay.repo.name // "kullanici/depo"
            const sha = olay.payload.head // push sonrası en son commit kimliği
            // Dal (branch) adı: "refs/heads/main" → "main"
            const dal = olay.payload.ref
              ? olay.payload.ref.replace('refs/heads/', '')
              : 'main'
            try {
              const commitYaniti = await fetch(
                `https://api.github.com/repos/${repoTamAd}/commits/${sha}`,
              )
              if (!commitYaniti.ok) throw new Error('commit detayı alınamadı')
              const commitVerisi = await commitYaniti.json()
              return {
                repo: repoTamAd.split('/')[1] ?? repoTamAd,
                mesaj: commitVerisi.commit.message.split('\n')[0],
                tarih: commitVerisi.commit.author.date,
                sha,
                kisaHash: sha.slice(0, 7), // commit'in ilk 7 karakteri
                dal,
                // Tarayıcıda açılacak commit sayfası (API yerine github.com)
                url:
                  commitVerisi.html_url ||
                  `https://github.com/${repoTamAd}/commit/${sha}`,
              }
            } catch {
              // İkincil istek başarısızsa elimizdeki bilgilerle yedek satır üret
              return {
                repo: repoTamAd.split('/')[1] ?? repoTamAd,
                mesaj: `${dal} dalına push yapıldı`,
                tarih: olay.created_at,
                sha,
                kisaHash: sha.slice(0, 7),
                dal,
                url: `https://github.com/${repoTamAd}/commit/${sha}`,
              }
            }
          }),
        )

        setCommitler(sonuc)
        setCekmeZamani(new Date()) // verinin çekildiği anı kaydet
      } catch (err) {
        console.error('GitHub verisi alınamadı:', err)
        setHata('GitHub verilerine şu an ulaşılamıyor.')
      } finally {
        setYukleniyor(false)
      }
    }

    veriGetir()
  }, [])

  // --- Tarihi Türkçe biçime çeviren yardımcı (örn: "8 Haziran 2026, 14:30") ---
  function tarihiBicimlendir(isoTarih) {
    return new Date(isoTarih).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // --- Saati biçimlendiren yardımcı (örn: "14:30") ---
  function saatiBicimlendir(tarih) {
    return tarih.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <article className="card card--github">
      <div className="card__head">
        <span className="card__icon" aria-hidden="true">
          <Github size={20} />
        </span>
        <h2 className="card__title">GitHub'dan Canlı</h2>
        {/* Canlı bağlantı indikatörü: yanıp sönen yeşil nokta + "Canlı" yazısı */}
        <span className="live-badge" aria-label="Canlı veri">
          <span className="live-dot" aria-hidden="true" />
          Canlı
        </span>
      </div>

      {/* Profil istatistikleri (yüklendiyse göster) */}
      {istatistik && (
        <div className="gh-stats">
          <span className="gh-stat">
            <FolderGit2 size={14} aria-hidden="true" />
            {/* Sayılar 0'dan gerçek değere doğru animasyonla artar */}
            <strong><CountUp value={istatistik.repo} /></strong> repo
          </span>
          <span className="gh-stat">
            <Users size={14} aria-hidden="true" />
            <strong><CountUp value={istatistik.takipci} /></strong> takipçi
          </span>
          <span className="gh-stat">
            <strong><CountUp value={istatistik.takip} /></strong> takip
          </span>
        </div>
      )}

      {/* Dil dağılımı donut'u (repolardan hesaplandıysa göster) */}
      {diller.length > 0 && (
        <div className="gh-langs-wrap">
          <p className="gh-langs-baslik">En çok kullandığım diller</p>
          <LanguageDonut diller={diller} />
        </div>
      )}

      {/* DURUM 1: Yükleniyor → düz yazı yerine "skeleton" (parıltılı) kutular */}
      {yukleniyor && (
        <ul className="commit-list" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <li key={i} className="commit-skeleton">
              <span className="sk sk--repo" />
              <span className="sk sk--msg" />
              <span className="sk sk--meta" />
            </li>
          ))}
        </ul>
      )}

      {/* DURUM 2: Hata */}
      {hata && !yukleniyor && <p className="gh-error">{hata}</p>}

      {/* DURUM 3: Veri yok */}
      {!yukleniyor && !hata && commitler.length === 0 && (
        <p className="card__text">
          Son zamanlarda herkese açık bir commit aktivitesi bulunamadı.
        </p>
      )}

      {/* DURUM 4: Commit listesi (.map ile) */}
      {!yukleniyor && !hata && commitler.length > 0 && (
        <ul className="commit-list">
          {commitler.map((commit, index) => (
            <li key={commit.sha + '-' + index}>
              {/* Her commit kartı tıklanabilir: yeni sekmede GitHub commit sayfası */}
              <a
                className="commit-item"
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${commit.repo} deposundaki commit'i GitHub'da aç`}
              >
                {/* Üst satır: repo adı + dal (branch) etiketi */}
                <div className="commit-item__top">
                  <span className="commit-item__repo">
                    <FolderGit2 size={15} aria-hidden="true" />
                    {commit.repo}
                  </span>
                  <span className="commit-branch">
                    <GitBranch size={12} aria-hidden="true" />
                    {commit.dal}
                  </span>
                </div>

                {/* Commit mesajı */}
                <div className="commit-item__msg">
                  <MessageSquare size={15} aria-hidden="true" />
                  <span>{commit.mesaj}</span>
                </div>

                {/* Alt satır: kısa hash (mono) + tarih */}
                <div className="commit-item__meta">
                  <span className="commit-hash">
                    <Hash size={13} aria-hidden="true" />
                    {commit.kisaHash}
                  </span>
                  <span className="commit-item__date">
                    <Calendar size={13} aria-hidden="true" />
                    {tarihiBicimlendir(commit.tarih)}
                  </span>
                </div>

                {/* Hover'da beliren dış bağlantı ikonu (sağ alt köşe) */}
                <ExternalLink className="commit-item__ext" size={15} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Son veri çekme zamanı (alt köşe) */}
      {cekmeZamani && (
        <p className="gh-refreshed">
          <RefreshCw size={13} aria-hidden="true" />
          Son veri çekme: {saatiBicimlendir(cekmeZamani)}
        </p>
      )}
    </article>
  )
}

export default GitHubCard
