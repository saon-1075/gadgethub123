import React from 'react';


export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t-4 border-gray-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
             <span className="text-2xl font-black tracking-widest text-yellow-400 font-mono uppercase" style={{ textShadow: '2px 2px #000' }}>
              GadgetHub
            </span>
            <p className="text-sm leading-6 text-gray-300 font-mono">
              Equipping gamers with the finest gear since 1985.
            </p>
            <div className="flex space-x-6">
              {/* Facebook */}
              <a href="#" className="text-gray-500 hover:text-green-400 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-gray-500 hover:text-green-400 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.733.01 3.692.054 1.955.088 3.005.46 3.702.733.719.279 1.338.651 1.953 1.266.615.615.987 1.234 1.266 1.953.273.696.645 1.747.733 3.702.044.96.054 1.262.054 3.692 0 2.43-.01 2.733-.054 3.692-.088 1.955-.46 3.005-.733 3.702-.279.719-.651 1.338-1.266 1.953-.615.615-1.234.987-1.953 1.266-.696.273-1.747.645-3.702.733-.96.044-1.262.054-3.692.054-2.43 0-2.733-.01-3.692-.054-1.955-.088-3.005-.46-3.702-.733-.719-.279-1.338-.651-1.953-1.266-.615-.615-.987-1.234-1.266-1.953-.273-.696-.645-1.747-.733-3.702-.044-.96-.054-1.262-.054-3.692 0-2.43.01-2.733.054-3.692.088-1.955.46-3.005.733-3.702.279-.719.651-1.338 1.266-1.953.615-.615 1.234-.987 1.953-1.266.696-.273 1.747-.645 3.702-.733.96-.044 1.262-.054 3.692-.054zm0-2c-2.493 0-2.79.01-3.768.058-2.118.103-3.286.58-4.053 1.347-.767.767-1.244 1.935-1.347 4.053-.045.978-.058 1.275-.058 3.768 0 2.493.01 2.79.058 3.768.103 2.118.58 3.286 1.347 4.053.767.767 1.935 1.244 4.053 1.347.978.045 1.275.058 3.768.058 2.493 0 2.79-.01 3.768-.058 2.118-.103 3.286-.58 4.053-1.347.767-.767 1.244-1.935 1.347-4.053.045-.978.058-1.275.058-3.768 0-2.493-.01-2.79-.058-3.768-.103-2.118-.58-3.286-1.347-4.053-.767-.767-1.935-1.244-4.053-1.347-.978-.045-1.275-.058-3.768-.058z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M12.315 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8z" clipRule="evenodd" />
                  <path d="M18.406 6.937a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                </svg>
              </a>
              {/* Twitter (X) */}
              <a href="#" className="text-gray-500 hover:text-green-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="text-gray-500 hover:text-green-400 transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 01-1.768 1.768c-1.56.418-7.814.418-7.814.418s-6.255 0-7.814-.418a2.502 2.502 0 01-1.768-1.768C2 15.255 2 12 2 12s0-3.255.418-4.814a2.507 2.507 0 011.768-1.768C5.745 5 12 5 12 5s6.255 0 7.812.418zM15.194 12l-4.5 2.6V9.4l4.5 2.6z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold leading-6 text-white font-mono uppercase tracking-wider">Shop</h3>
                <ul role="list" className="mt-6 space-y-4 font-mono text-sm">
                  {['New Arrivals', 'Best Sellers', 'Consoles', 'Accessories'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 hover:text-green-400 transition-colors leading-6">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-bold leading-6 text-white font-mono uppercase tracking-wider">Support</h3>
                <ul role="list" className="mt-6 space-y-4 font-mono text-sm">
                  {['Contact Us', 'Shipping Policy', 'Returns', 'FAQ'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 hover:text-green-400 transition-colors leading-6">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-bold leading-6 text-white font-mono uppercase tracking-wider">Subscribe</h3>
                <p className="mt-2 text-sm leading-6 text-gray-300 font-mono">
                  Get the latest drops and secret deals.
                </p>
                <form className="mt-6 sm:flex sm:max-w-md">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    required
                    className="w-full min-w-0 appearance-none rounded-none border-0 bg-white/5 px-3 py-1.5 text-base text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:w-64 sm:text-sm sm:leading-6 font-mono"
                    placeholder="Enter your email"
                  />
                  <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-none bg-green-500 px-3 py-2 text-sm font-bold text-black shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 font-mono uppercase tracking-wider"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400 font-mono">
            &copy; 2028 GadgetHub, Inc. All rights reserved. Press Start to continue.
          </p>
        </div>
      </div>
    </footer>
  );
}