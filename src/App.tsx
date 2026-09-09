import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Band from "./pages/Band"
import Contact from "./pages/Contact"
import Home from "./pages/Home"
import Lore from "./pages/Lore"
import Media from "./pages/Media"
import Merch from "./pages/Merch"
import Music from "./pages/Music"
import NotFound from "./pages/NotFound"
import ReleaseDetail from "./pages/ReleaseDetail"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/music/:id" element={<ReleaseDetail />} />
          <Route path="/lore" element={<Lore />} />
          <Route path="/band" element={<Band />} />
          <Route path="/media" element={<Media />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
