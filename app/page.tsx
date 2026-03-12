import Link from "next/link";

export default function Home() {
  return (
    <main className="landing">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body { background: #0a1e24; }

        .landing {
          height: 100vh;
          background: 
            radial-gradient(ellipse 80% 60% at 60% 30%, rgba(20, 80, 90, 0.6) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 20% 60%, rgba(10, 50, 60, 0.4) 0%, transparent 55%),
            linear-gradient(160deg, #0f2d35 0%, #0a1e24 50%, #071820 100%);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
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
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(180, 220, 215, 0.6);
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
          color: rgba(160, 205, 198, 0.4);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .nav-links a:hover {
          color: rgba(180, 220, 215, 0.75);
        }

        .hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 3rem 3rem;
          position: relative;
          z-index: 1;
          max-width: 900px;
        }

        .title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: clamp(2.8rem, 5.5vw, 4.8rem);
          line-height: 1;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #e4f2ef;
          margin-bottom: 1.8rem;
          white-space: nowrap;
        }

        .headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(1rem, 1.8vw, 1.35rem);
          line-height: 1.5;
          color: rgba(200, 235, 230, 0.55);
          letter-spacing: 0.02em;
          margin-bottom: 1rem;
          max-width: 520px;
        }

        .headline em {
          font-style: italic;
          color: rgba(140, 210, 195, 0.8);
        }

        .subline {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: clamp(0.7rem, 1.1vw, 0.78rem);
          line-height: 1.9;
          color: rgba(150, 195, 188, 0.35);
          letter-spacing: 0.05em;
          max-width: 400px;
          margin-bottom: 2.5rem;
        }

        .cta {
          display: inline-block;
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 0.63rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(170, 220, 210, 0.7);
          border: 1px solid rgba(110, 175, 165, 0.25);
          padding: 0.9rem 2.4rem;
          text-decoration: none;
          transition: all 0.4s ease;
          background: transparent;
          cursor: pointer;
          width: fit-content;
        }

        .cta:hover {
          color: rgba(215, 242, 238, 0.95);
          border-color: rgba(110, 175, 165, 0.55);
          background: rgba(25, 110, 100, 0.08);
          letter-spacing: 0.35em;
        }

        @media (max-width: 600px) {
          nav { padding: 1.5rem; }
          .hero { padding: 0 1.5rem 2rem; }
          .title { white-space: normal; font-size: 2.4rem; }
        }
      `}</style>

      <nav>
        <Link href="/" className="nav-logo">The Discovery</Link>
        <ul className="nav-links">
          <li><Link href="/about">About</Link></li>
          <li><Link href="/chat">Begin</Link></li>
        </ul>
      </nav>

      <div className="hero">
        <h1 className="title">The Discovery</h1>
        <p className="headline">
          Most trips start with a destination.<br />
          <em>We start with you.</em>
        </p>
        <p className="subline">
          Your personal travel architect — uncovering who you are as a traveler before telling you where to go.
        </p>
        <Link href="/chat" className="cta">
          Start Your Discovery
        </Link>
      </div>

    </main>
  );
}