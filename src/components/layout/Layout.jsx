import Header from './Header'
import BottomNav from './BottomNav'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#18120F] text-[#1A1008] dark:text-[#F0EBE5] font-['Poppins']">
      <Header />
      <main className="pb-24 max-w-2xl mx-auto px-4">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}