import Header from './Header'
import BottomNav from './BottomNav'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#18120F] text-[#1A1008] dark:text-[#F0EBE5] font-['Poppins'] flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col pb-16 overflow-hidden">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}