import Link from "next/link";

export default function Home() {
  return (
    <main className="landing">
      <style>{`
        .landing {
          min-height: 100vh;
          background: #FEFEFE;
          display: flex;
          flex-direction: column;
        }

        .landing-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2rem 3rem;
          border-bottom: 4px solid #111;
        }

        .nav-logo {
          font-family: var(--font-spectral), 'Spectral', serif;
          font-weight: 300;
          font-size: 1.05rem;
          letter-spacing: 0.04em;
          color: #111;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .nav-logo:hover { color: #444; }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }

        .nav-links a {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.45);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .nav-links a:hover { color: #111; }

        .hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 2rem 8rem;
          gap: 0;
        }

        .hero-headline {
          font-family: var(--font-spectral), 'Spectral', serif;
          font-weight: 300;
          font-size: clamp(1.9rem, 3.5vw, 3rem);
          line-height: 1.35;
          color: #111;
          letter-spacing: 0.01em;
          margin-bottom: 2rem;
          animation: fadeInUp 0.8s ease both;
          animation-delay: 0.2s;
        }

        .subline {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 20px;
          line-height: 1.75;
          color: #555;
          max-width: 640px;
          margin-bottom: 3rem;
          animation: fadeInUp 0.8s ease both;
          animation-delay: 0.5s;
        }

        .cta {
          display: inline-block;
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 0.82rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #111;
          border: 1px solid #111;
          padding: 1.1rem 3.5rem;
          text-decoration: none;
          transition: all 0.35s ease;
          background: transparent;
          cursor: pointer;
          animation: fadeInUp 0.8s ease both;
          animation-delay: 0.8s;
        }

        .cta:hover {
          color: #FEFEFE;
          background: #111;
          letter-spacing: 0.33em;
        }

        @media (max-width: 600px) {
          .landing-nav { padding: 1.5rem; }
          .hero-headline { font-size: clamp(1.6rem, 6vw, 2.2rem); }
          .subline { font-size: 17px; }
        }
      `}</style>

      <nav className="landing-nav">
        <Link href="/" className="nav-logo">The Discovery</Link>
        <ul className="nav-links">
          <li><Link href="/about">About</Link></li>
          <li><Link href="/login">Log In</Link></li>
        </ul>
      </nav>

      <div className="hero">
        <h1 className="hero-headline">
          Most trips start with a destination.<br />
          <em>We start with you.</em>
        </h1>
        <p className="subline">
          The Discovery is your personal travel architect. Whether you have somewhere in mind or you&rsquo;re looking for the right place to go &mdash; we&rsquo;ll uncover who you are as a traveler and build the perfect journey based solely on what you want to get out of your experience.
        </p>
        <Link href="/chat" className="cta">
          Start Your Discovery
        </Link>
      </div>
    </main>
  );
}
