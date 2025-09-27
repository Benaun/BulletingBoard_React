export default function Footer() {
  return (
    <footer className='bg-light border-top mt-auto'>
      <div className='container'>
        <p className='text-center py-3 text-muted mb-0'>
          &copy;{new Date().getFullYear()} Доска объявлений | Все
          права защищены
        </p>
      </div>
    </footer>
  )
}
