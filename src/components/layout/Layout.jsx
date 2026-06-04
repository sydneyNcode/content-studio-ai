import Header from './Header'
import BottomNav from './BottomNav'

export default function Layout({ children }) {
  return (
    <div
      className="bg-[#FAF8F5] dark:bg-[#18120F] text-[#1A1008] dark:text-[#F0EBE5] font-['Poppins']"
      style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      <Header />
      <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {children}
      </main>
      <BottomNav />
    </div>
  )
}