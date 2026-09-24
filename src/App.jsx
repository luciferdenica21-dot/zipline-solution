import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Products from './components/Products.jsx'
import Contacts from './components/Contacts.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-ink-950 text-white overflow-x-hidden">
      <Header />
      <main className="relative">
        <Hero />
        <About />
        <Products />
        <Contacts />
      </main>
    </div>
  )
}
