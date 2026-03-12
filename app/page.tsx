import Link from "next/link";

export default function Home() {
  return (
    <main className="landing">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body { background: #0d2228; }

        .landing {
          height: 100vh;
          background: radial-gradient(ellipse 120% 90% at 50% 10%, #1a4a52 0%, #0d2228 60%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .glow {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(30, 140, 125, 0.1) 0%, transparent 65%);
          pointer-events: none;
        }

        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 1;
          max-width: 820px;
          width: 100%;
          padding: 0 2rem;
        }

        .title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: clamp(3rem, 8vw, 6rem);
          line-height: 1;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #e2f2ee;
          margin-bottom: 2rem;
        }

        .rule {
          width: 36px;
          height: 1px;
          background: rgba(120, 200, 185, 0.35);
          margin-bottom: 2rem;
        }

        .headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(1.2rem, 2.5vw, 1.7rem);
          line-height: 1.4;
          color: rgba(215, 242, 238, 0.7);
          letter-spacing: 0.02em;
          margin-bottom: 1.4rem;
        }

        .headline em {
          font-style: italic;
          color: rgba(140, 210, 195, 0.9);
        }

        .subline {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: clamp(0.75rem, 1.4vw, 0.85rem);
          line-height: 1.9;
          color: rgba(160, 205, 198, 0.45);
          letter-spacing: 0.05em;
          max-width: 440px;
          margin-bottom: 2.8rem;
        }

        .cta {
          display: inline-block;
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 0.68rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(170, 220, 210, 0.7);
          border: 1px solid rgba(110, 180, 168, 0.25);
          padding: 1rem 3rem;
          text-decoration: none;
          transition: all 0.4s ease;
          background: transparent;
          cursor: pointer;
        }

        .cta:hover {
          color: rgba(215, 242, 238, 0.95);
          border-color: rgba(110, 180, 168, 0.55);
          background: rgba(25, 110, 100, 0.08);
          letter-spacing: 0.38em;
        }

        .bottom-mark {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Jost', sans-serif;
          font-weight: 200;
          font-size: 0.58rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(110, 170, 160, 0.2);
          white-space: nowrap;
        }
      `}</style>

      <div className="glow" />

      <div className="content">
        <h1 className="title">The Discovery</h1>
        <div className="rule" />
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

      <span className="bottom-mark">Personal Travel Architecture</span>

    </main>
  );
}