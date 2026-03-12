import Link from "next/link";

export default function Home() {
  return (
    <main className="landing">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body { background: #1c4a52; }

        .landing {
          height: 100vh;
          background: 
            radial-gradient(ellipse 100% 80% at 50% -10%, #4a9fa8 0%, #1c5a64 30%, #0e3840 60%, #071e25 100%);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .noise {
          position: absolute;
          inset: 0;
          opacity: 0.04;
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
          font-size: 0.68rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(220, 245, 242, 0.7);
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
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(200, 235, 230, 0.55);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .nav-links a:hover {
          color: rgba(220, 245, 242, 0.9);
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
          color: #f0faf8;
          margin-bottom: 2rem;
          white-space: nowrap;
        }

        .divider {
          width: 40px;
          height: 1px;
          background: rgba(180, 230, 225, 0.4);
          margin-bottom: 2rem;
        }

        .headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(1.2rem, 2.2vw, 1.6rem);
          line-height: 1.5;
          color: rgba(230, 248, 245, 0.85);
          letter-spacing: 0.02em;
          margin-bottom: 1.2rem;
        }

        .headline em {
          font-style: italic;
          color: #a8ddd5;
        }

        .subline {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: clamp(0.78rem, 1.3vw, 0.88rem);
          line-height: 1.85;
          color: rgba(200, 235, 230, 0.6);
          letter-spacing: 0.04em;
          max-width: 440px;
          margin-bottom: 2.8rem;
        }

        .cta {
          display: inline-block;
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(220, 245, 242, 0.85);
          border: 1px solid rgba(180, 225, 218, 0.4);
          padding: 1rem 3rem;
          text-decoration: none;
          transition: all 0.4s ease;
          background: rgba(255,255,255,0.04);
          cursor: pointer;
        }

        .cta:hover {
          color: #f0faf8;
          border-color: rgba(180, 225, 218, 0.75);
          background: rgba(255,255,255,0.08);
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
          <li><Link href="/chat">Begin</Link></li>
        </ul>
      </nav>

      <div className="hero">
        <h1 className="title">The Discovery</h1>
        <div className="divider" />
        <p className="headline">
          Most trips start with a destination.<br />
          <em>We start with you.</em>
        </p>
        <p className="subline">
          The Discovery is your personal travel architect — we uncover who you are as a traveler before we tell you where to go.
        </p>
        <Link href="/chat" className="cta">
          Start Your Discovery
        </Link>
      </div>

    </main>
  );
}