import React from 'react'

const data = [
    { name: "Fashion", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnQ0OTBACJM4doCbYXkogWd-FzseOCGNwHDfbyY5yHAts2GzWHEhGP_-TVb8HlDdWOTGJLuaZBufcbyIgdF-7naI52xGosQ-NXTdVbv3kryznWPvIrwN9IMx1xwFytiw6aKR5VY_1qB680xLLBruK2yh9zhuWGrWSy_xzWuA8eADspmOYR0tTzJmMjCqCnckMsN7aSW2LWi1D46CVPFfedTWdYvvUl951dDMgwyArv5bu2k4Zvie1hJJUHo9g2uFd3EwfK3IOZYVM" },
    { name: "Electronics", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd0-RhVVds1z88h4L9-DujiTuBLwYXd1x4ad2B0hatFwmVyqqOt2ssMSezcn2P1kzAiJTjRJWOxVGgk37hy0OXXZlOGvZHVDxUjeFfRKC6fjSuRkuYFSCLF5-XHotP754iRNDS9HSPTC2p7frb5hiTWKtFlSenfzEiSUCidtIUgw9K6WzOph8TwIzlTqnwpkoJrf1YrWA1o-KNvjdiHI-hnD977V7P-MrVC9LXvCKdeJq2CUIqFLCtrs9wfRHKZkX34HthdZDfqCg" },
    { name: "Home", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCa3aFT7Cn0WFMYr0BpoFgr77R6L4LtRv0YM91mTZpR-DYxggR6sA27aCIbrsUwD1lCAFUdgmT2dAuJv4g2jllGlxnPeWUhnD5EIukMKuWeslclgkUWyp2dYpYmOGQEyYbyuBqdyMlfj3Gscgq91WkfjZHaN2x0DcbOr1K4lXQaR7hTcIJa5nd8DEuU2DNxJHgnPGen8FlRF-HPO3rQAkDRY-kGYnD12PdSz1WMPV8upVH1BNkLGjjUeJlBTCANvYaq3zdsCbJk4kc" },
    { name: "Beauty", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqoxdeJiSq53yZrU1859So9QE200B77QWmfq2L1x2FuFcp8DE5RRLaRd9Yb6lzdRcSaRFWyCqtmAsYdCCkAihSAeDLSJEyaHtsjJ1s78KCHFX-kBEWwPCyMaZBq3bNLSRgfr4LKRtuww9gXtNB451WcGKL2FvANh3IC79Udf268rSOaLZkgDMQQiqH-wLctoFJUUO1OAPmztl1td3P90SKdfzrAtn_zTx2Dtx5PHlBM0woDHSV-QKY08FBTh4HD64dlZT5uGbCbcI" },
    { name: "Sports", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKv5q4-xHkhp4ZQbpAyMunJbDagKAIp58qSkwt0IAPdlgGXNrKFVNtDEEVvkoCIdpcv8hC_mjgPrvtkYcom_AOcHvuJJ0PrjRAJRRBnCGtY-sfZaYr7HcHVEzr8VhLOeilmsNJK-F6wlZMNcPAg34-GSl92tdPdWkgDPSVnnKc4SdBiCn3v7i_H6BRG3ywndMeqpilBjUTDC0CjIpjfayvXAtTBXasuYComKD-sLpP4-PkBYkIUpI3r8uK2OvQUTsY3OTen8DIvy4" },
]

const CircularIcons = () => {

    return (
        <section className="px-4 max-w-7xl mx-auto md:px-6 lg:px-8">

            {/* header */}
            <h2 className="text-lg md:text-xl font-bold my-4 md:my-6">
                Shop by Department
            </h2>

            {/* MOBILE */}
            <div className="flex flex-nowrap gap-5 overflow-x-auto md:grid md:grid-cols-5 md:gap-8 md:overflow-visible">

                {data.map((item, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center group cursor-pointer min-w-[70px] sm:min-w-[80px] md:min-w-0"
                    >

                        {/* icon */}
                        <div className="w-14 sm:w-16 md:w-28 aspect-square rounded-full md:rounded-xl overflow-hidden bg-bg-card border-border shadow-sm group-hover:shadow-md group-hover:scale-105 transition">
                            <img
                                src={item.img}
                                className="w-full h-full object-cover"
                                alt={item.name}
                            />
                        </div>

                        {/* label */}
                        <span className="
                            text-xs sm:text-sm
                            font-medium text-center mt-2
                            group-hover:text-primary
                            transition
                        ">
                            {item.name}
                        </span>

                    </div>
                ))}

            </div>
        </section>
    )
}

export default CircularIcons