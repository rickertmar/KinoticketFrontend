//Space for footer and header -> things that should be rendered on every page
export default function Layout({ children }) {
    return (
      <>
      <body className=''>
        <main className="">{children}</main>
      </body>
        
      </>
    )
  }