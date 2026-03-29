import React from 'react'
import { Search, ShoppingCart, User, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="sticky top-0 w-full z-50 bg-white/60 backdrop-blur-md border-b border-black/5 shadow-[0_12px_40px_rgba(25,28,30,0.06)]">

            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 md:px-6 py-3 max-w-[1400px] mx-auto">

                {/* Left */}
                <div className="flex items-center gap-3">

                    {/* Logo */}
                    <div className="text-xl md:text-2xl font-black tracking-tighter text-primary">
                        NexCart
                    </div>
                </div>

                {/* Search */}
                <div className="flex flex-1 max-w-2xl mx-6 lg:mx-12">
                    <div className="relative flex items-center bg-bg-main rounded-xl px-4 py-2 w-full focus-within:ring-2 focus-within:ring-primary/40">
                        <Search className='mr-2' />
                        <input
                            className="bg-transparent w-full text-sm outline-none"
                            placeholder="Search..."
                            type="text"
                        />
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4 md:gap-6">

                    <Link to="/address" className="hidden md:flex items-center text-text-dark hover:text-primary">
                        <MapPin />
                        <span className="hidden lg:block text-sm ml-1">141001</span>
                    </Link>

                    <Link to="/cart" className="flex items-center text-text-dark hover:text-primary">
                        <ShoppingCart />
                        <span className="hidden lg:block text-sm ml-1">Cart</span>
                    </Link>

                    <Link to="/profile" className="hidden md:flex items-center gap-2 bg-primary text-white px-3 md:px-5 py-2 rounded-xl font-semibold">
                        <User />
                        <span className="hidden md:block">Login</span>
                    </Link>
                </div>
            </div>

            <nav className=" bg-white/50 border-t border-border">
                <div className="max-w-[1400px] mx-auto flex items-center gap-9 px-6 py-2 overflow-x-auto hide-scrollbar">
                    <Link to="/" className="text-primary font-semibold border-b-2 border-primary text-sm py-1">Electronics</Link>
                    <Link to="/" className="text-text-dark hover:text-primary text-sm">Fashion</Link>
                    <Link to="/" className="text-text-dark hover:text-primary text-sm">Home</Link>
                    <Link to="/" className="text-text-dark hover:text-primary text-sm">Beauty</Link>
                    <Link to="/" className="text-text-dark hover:text-primary text-sm">Sports</Link>
                    <Link to="/" className="text-text-dark hover:text-primary text-sm">Deals</Link>
                </div>
            </nav>

        </header>
    )
}

export default Navbar



// import React from 'react'
// import { Search, ShoppingCart, User, MapPin } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//     return (
//         <header className="sticky top-0 w-full z-50 backdrop-blur-md shadow-[0_12px_40px_rgba(25,28,30,0.06)] bg-bg-card border-border">

//             {/* Top Bar */}
//             <div className="flex items-center justify-between px-4 md:px-6 py-3 max-w-[1400px] mx-auto">

//                 {/* Left */}
//                 <div className="flex items-center gap-3">

//                     {/* Logo */}
//                     <div className="text-xl md:text-2xl font-black tracking-tighter text-primary">
//                         NexCart
//                     </div>
//                 </div>

//                 {/* Search */}
//                 <div className="flex flex-1 max-w-2xl mx-6 lg:mx-12">
//                     <div className="relative flex items-center rounded-xl px-4 py-2 w-full focus-within:ring-2 bg-bg-main border-border">
//                         <Search className='mr-2' />
//                         <input
//                             className="bg-transparent w-full text-sm outline-none"
//                             placeholder="Search..."
//                             type="text"
//                         />
//                     </div>
//                 </div>

//                 {/* Right */}
//                 <div className="flex items-center gap-4 md:gap-6">

//                     <Link to="/address" className="hidden md:flex items-center text-text-dark hover:text-primary">
//                         <MapPin />
//                         <span className="hidden lg:block text-sm ml-1">141001</span>
//                     </Link>

//                     <Link to="/cart" className="flex items-center text-text-dark hover:text-primary">
//                         <ShoppingCart />
//                         <span className="hidden lg:block text-sm ml-1">Cart</span>
//                     </Link>

//                     <Link to="/profile" className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-3 md:px-5 py-2 rounded-xl font-semibold">
//                         <User />
//                         <span className="hidden md:block">Login</span>
//                     </Link>
//                 </div>
//             </div>

//             <nav className="border-t overflow-x-auto hide-scrollbar bg-bg-card border-border">
//                 <div className="max-w-[1400px] mx-auto flex items-center gap-9 px-6 py-2 overflow-x-auto hide-scrollbar">
//                     <Link to="/" className="font-semibold border-b-2 text-sm py-1 text-primary border-primary">Electronics</Link>
//                     <Link to="/" className="text-sm transition-colors hover:opacity-70 text-text-dark">Fashion</Link>
//                     <Link to="/" className="text-sm transition-colors hover:opacity-70 text-text-dark">Home</Link>
//                     <Link to="/" className="text-sm transition-colors hover:opacity-70 text-text-dark">Beauty</Link>
//                     <Link to="/" className="text-sm transition-colors hover:opacity-70 text-text-dark">Sports</Link>
//                     <Link to="/" className="text-sm transition-colors hover:opacity-70 text-text-dark">Deals</Link>
//                 </div>
//             </nav>

//         </header>
//     )
// }

// export default Navbar