import Header from './Header'
import BottomNav from './BottomNav'

export default function Layout({ children }) {
  return (
    <div
      className="bg-[#FAF8F5] dark:bg-[#18120F] text-[#1A1008] dark:text-[#F0EBE5] font-['Poppins']"
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Header />
      <main style={{
        flex: 1,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
        paddingBottom: '80px'
      }}>
        {children}
      </main>
      <BottomNav />
    </div>
  )
}