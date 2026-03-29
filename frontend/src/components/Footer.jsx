const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 border-t border-border bg-bg-card">
      <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        
        {/* Brand */}
        <div className="sm:col-span-2">
          <h2 className="text-xl font-bold mb-4 text-primary">
            NexCart
          </h2>
          <p className="text-xs mb-6 leading-relaxed text-text-light">
            Defining the digital shopping experience through curated excellence and premium craftsmanship.
          </p>

          <div className="flex gap-4">
            <a className="w-8 h-8 flex items-center justify-center rounded-full hover:scale-110 transition bg-bg-main">
              🌐
            </a>
            <a className="w-8 h-8 flex items-center justify-center rounded-full hover:scale-110 transition bg-bg-main">
              @
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <p className="text-xs font-bold uppercase mb-4 text-text-dark">
            Company
          </p>
          <ul className="space-y-2 text-xs text-text-dark">
            <li><a href="#" className="hover:text-primary">About</a></li>
            <li><a href="#" className="hover:text-primary">Careers</a></li>
            <li><a href="#" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <p className="text-xs font-bold uppercase mb-4 text-text-dark">
            Support
          </p>
          <ul className="space-y-2 text-xs text-text-dark">
            <li><a href="#" className="hover:text-primary">Customer Service</a></li>
            <li><a href="#" className="hover:text-primary">Privacy</a></li>
            <li><a href="#" className="hover:text-primary">Terms</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="sm:col-span-2">
          <p className="text-xs font-bold uppercase mb-4 text-text-dark">
            Newsletter
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-3 py-2 text-xs rounded-lg focus:outline-none focus:ring-1 bg-bg-main focus-ring-primary"
            />
            <button className="px-4 py-2 text-xs font-bold text-white rounded-lg bg-primary">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto my-6 pt-2 text-center border-t border-border">
        <p className="text-xs" style={{ color: "var(--color-text-light)" }}>
          © 2026 NexCart. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;