import Link from "next/link";

export default function Home() {
  return (
    <main className="landing">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body { background: #0a0a0a; }

        .landing {
          height: 100vh;
          background: radial-gradient(ellipse 100% 80% at 50% 0%, #2a2a2a 0%, #111111 45%, #080808 100%);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .noise {
          position: absolute;
          inset: 0;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          pointer-events: none;
        }

        nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2rem 3rem;
          position: relative;
          z-index: 10;
        }

        .nav-logo {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 0.9rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }

        .nav-links a {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 0.85rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .nav-links a:hover {
          color: rgba(255, 255, 255, 0.85);
        }

        .hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 2rem 4rem;
          position: relative;
          z-index: 1;
        }

        .title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: clamp(2.6rem, 5vw, 4.2rem);
          line-height: 1;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #ffffff;
          margin-bottom: 2rem;
          white-space: nowrap;
        }

        .divider {
          width: 40px;
          height: 1px;
          background: rgba(255, 255, 255, 0.2);
          margin-bottom: 2rem;
        }

        .headline-top {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(1.3rem, 2.2vw, 1.7rem);
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.55);
          letter-spacing: 0.02em;
          margin-bottom: 0.4rem;
        }

        .headline-bottom {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: clamp(1.8rem, 3.2vw, 2.6rem);
          line-height: 1.3;
          color: #d0d0d0;
          letter-spacing: 0.02em;
          margin-bottom: 1.6rem;
        }

        .subline {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: clamp(0.9rem, 1.5vw, 1.05rem);
          line-height: 1.85;
          color: rgba(255, 255, 255, 0.45);
          letter-spacing: 0.04em;
          max-width: 600px;
          margin-bottom: 2.8rem;
        }

        .cta {
          display: inline-block;
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 0.95rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.25);
          padding: 1.2rem 3.5rem;
          text-decoration: none;
          transition: all 0.4s ease;
          background: transparent;
          cursor: pointer;
        }

        .cta:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.05);
          letter-spacing: 0.35em;
        }

        @media (max-width: 600px) {
          nav { padding: 1.5rem; }
          .title { white-space: normal; letter-spacing: 0.1em; }
        }
      `}</style>

      <div className="noise" />

      <nav>
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