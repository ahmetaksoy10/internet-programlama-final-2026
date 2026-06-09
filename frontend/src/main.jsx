import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Tüm uygulama stilleri tek bir CSS dosyasında toplanmıştır (Vanilla CSS).
import './App.css'

// React 18 ile uygulamayı kök elemana (#root) bağlıyoruz.
// StrictMode, geliştirme aşamasında olası hataları erkenden yakalamamızı sağlar.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
