import React, { useEffect } from 'react'
import './Lenis.css'
import Lenis from '@studio-freight/lenis' // Import Lenis correctly if it's an external library

const LenisComponent = () => {

  useEffect(() => {
    const lenis = new Lenis()

    // Scroll event listener
    lenis.on('scroll', (e) => {
      console.log("created",e)
    })

    // RAF function to update the scroll
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup on component unmount
    return () => {
      lenis.destroy() // Ensure cleanup to avoid memory leaks
    }
  }, []) // Empty dependency array ensures this only runs once when the component mounts

  return (
    <div>Lenis Component</div>
  )
}

export default LenisComponent
