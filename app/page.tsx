import Link from "next/link";

export default function Home() {
  return (
    <main className="landing">
      <style>{`
        .landing {
          height: 100vh;
          background: radial-gradient(ellipse 100% 70% at 50% 0%, #1A3550 0%, #0D1B2A 55%, #080F17 100%);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .noise {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          pointer-events: none;
        }

        .landing-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2rem 3rem;
          position: relative;
          z-index: 10;
          border-bottom: 1px solid rgba(40, 116, 166, 0.15);
        }

        .nav-logo {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 0.85rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(245, 240, 232, 0.5);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .nav-logo:hover { color: rgba(245, 240, 232, 0.9); }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }

        .nav-links a {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 0.8rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245, 240, 232, 0.35);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .nav-links a:hover { color: rgba(245, 240, 232, 0.8); }

        .hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 2rem 6rem;
          position: relative;
          z-index: 1;
          gap: 0;
        }

        .title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-weight: 400;
          font-size: clamp(2.4rem, 5vw, 4rem);
          line-height: 1;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #F5F0E8;
          margin-bottom: 2rem;
          white-space: nowrap;
          animation: fadeInUp 0.8s ease both;
          animation-delay: 0.1s;
        }

        .divider {
          width: 40px;
          height: 1px;
          background: rgba(40, 116, 166, 0.5);
          margin-bottom: 2rem;
          animation: fadeInUp 0.8s ease both;
          animation-delay: 0.3s;
        }

        .headline-top {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-weight: 400;
          font-size: clamp(1.15rem, 2vw, 1.5rem);
          line-height: 1.4;
          color: rgba(245, 240, 232, 0.5);
          letter-spacing: 0.02em;
          margin-bottom: 0.35rem;
          animation: fadeInUp 0.8s ease both;
          animation-delay: 0.5s;
        }

        .headline-bottom {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-weight: 400;
          font-style: italic;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          line-height: 1.3;
          color: #D8D0C4;
          letter-spacing: 0.02em;
          margin-bottom: 1.8rem;
          animation: fadeInUp 0.8s ease both;
          animation-delay: 0.65s;
        }

        .subline {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: clamp(0.88rem, 1.4vw, 1rem);
          line-height: 1.9;
          color: rgba(245, 240, 232, 0.4);
          letter-spacing: 0.03em;
          max-width: 560px;
          margin-bottom: 3rem;
          animation: fadeInUp 0.8s ease both;
          animation-delay: 0.85s;
        }

        .cta {
          display: inline-block;
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 0.82rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(245, 240, 232, 0.75);
          border: 1px solid #2874A6;
          padding: 1.1rem 3.5rem;
          text-decoration: none;
          transition: all 0.35s ease;
          background: transparent;
          cursor: pointer;
          animation: fadeInUp 0.8s ease both;
          animation-delay: 1.1s;
        }

        .cta:hover {
          color: #F5F0E8;
          background: #2874A6;
          letter-spacing: 0.33em;
        }

        @media (max-width: 600px) {
          .landing-nav { padding: 1.5rem; }
          .title { white-space: normal; letter-spacing: 0.1em; }
        }
      `}</style>

      <div className="noise" />

      <nav className="landing-nav">
        <Link href="/" className="nav-logo">The Discovery</Link>
        <ul className="nav-links">
          <li><Link href="/about">About</Link></li>
          <li><Link href="/login">Log In</Link></li>
        </ul>
      </nav>

      <div className="hero">
        <h1 className="title">The Discovery</h1>
        <div className="divider" />
        <p className="headline-top">Most trips start with a destination.</p>
        <p className="headline-bottom">We start with you.</p>
        <p className="subline">
          The Discovery is your personal travel architect —<br />
          we uncover who you are as a traveler before we tell you where to go.
        </p>
        <Link href="/chat" className="cta">
          Start Your Discovery
        </Link>
      </div>
    </main>
  );
}
