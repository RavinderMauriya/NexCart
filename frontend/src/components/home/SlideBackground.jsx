import React, { useEffect, useRef } from 'react'

const slides = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD-ulzcVB4j05wDVt0Oy4VkMWS8MNJAHEp4kjxZvCp4rrgyrhA8QfonwwQCt3yhhDM0KcPXP3a7p4mOF7CNKf0nB-wCUOyFSG5esul36edG9xlwMomI1Jp3ddwMuh9hD_hQZuvc7W_HRW1ijjXsIeH3JnGVQ_vQUrcebQNwJyYcRS8kJ5xqaueG-IH0YF9b-T__U2hrwvEGPug0SAo0ZT1Y3nnqhXmX589INSIWLtMh8wH5V8_elYs215XzlDFzTW8QBB2NMNHq2Jw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBnQ0OTBACJM4doCbYXkogWd-FzseOCGNwHDfbyY5yHAts2GzWHEhGP_-TVb8HlDdWOTGJLuaZBufcbyIgdF-7naI52xGosQ-NXTdVbv3kryznWPvIrwN9IMx1xwFytiw6aKR5VY_1qB680xLLBruK2yh9zhuWGrWSy_xzWuA8eADspmOYR0tTzJmMjCqCnckMsN7aSW2LWi1D46CVPFfedTWdYvvUl951dDMgwyArv5bu2k4Zvie1hJJUHo9g2uFd3EwfK3IOZYVM",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCa3aFT7Cn0WFMYr0BpoFgr77R6L4LtRv0YM91mTZpR-DYxggR6sA27aCIbrsUwD1lCAFUdgmT2dAuJv4g2jllGlxnPeWUhnD5EIukMKuWeslclgkUWyp2dYpYmOGQEyYbyuBqdyMlfj3Gscgq91WkfjZHaN2x0DcbOr1K4lXQaR7hTcIJa5nd8DEuU2DNxJHgnPGen8FlRF-HPO3rQAkDRY-kGYnD12PdSz1WMPV8upVH1BNkLGjjUeJlBTCANvYaq3zdsCbJk4kc"
]

const SlideBackground = () => {
    const scrollRef = useRef(null)
    const indexRef = useRef(0) 

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        const interval = setInterval(() => {
            indexRef.current = (indexRef.current + 1) % slides.length

            el.scrollTo({
                left: el.clientWidth * indexRef.current,
                behavior: "smooth"
            })
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <section className="mt-4 overflow-hidden rounded-xl md:rounded-2xl">

            <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar"
            >
                {slides.map((img, i) => (
                    <div
                        key={i}
                        className="min-w-full h-40 sm:h-48 md:h-64 lg:h-96 snap-start relative shrink-0"
                    >
                        <img
                            src={img}
                            className="w-full h-full object-cover brightness-75"
                            alt=""
                        />

                        {/* overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex flex-col justify-center p-4 md:p-6 lg:p-8 lg:pl-25">

                            <span className="text-text-dark text-xs md:text-sm px-2 py-1 rounded-lg w-max mb-2" style={{ background: "var(--color-secondary)" }}>
                                Exclusive
                            </span>

                            <h1 className="text-white text-lg md:text-2xl font-bold max-w-xs">
                                The Summer Edit is Here
                            </h1>

                            <p className="text-white/80 text-xs md:text-sm">
                                Curated for excellence
                            </p>

                            <button className="mt-3 text-white text-xs md:text-sm px-4 py-2 rounded-lg w-max" style={{ background: "var(--color-primary)" }}>
                                Shop Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}

export default SlideBackground