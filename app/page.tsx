import Link from "next/link";

export default function Home() {
  return (
    <main className="landing">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body { background: #07131a; }

        .landing {
          min-height: 100vh;
          background: radial-gradient(ellipse 100% 70% at 50% 0%, #0e2e35 0%, #07131a 65%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 4rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .glow {
          position: absolute;
          top: -150px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(20, 120, 110, 0.1) 0%, transparent 68%);
          pointer-events: none;
        }

        .top {
          width: 100%;
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .wordmark {
          font-family: 'Jost', sans-serif;
          font-weight: 200;
          font-size: 0.65rem;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: rgba(160, 210, 200, 0.4);
        }

        .middle {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 1;
          max-width: 820px;
          width: 100%;
          padding: 2rem 0;
        }

        .title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: clamp(3.5rem, 9vw, 7rem);
          line-height: 1;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #ddf0ec;
          margin-bottom: 2.5rem;
        }

        .rule {
          width: 40px;
          height: 1px;
          background: rgba(100, 190, 175, 0.3);
          margin-bottom: 2.5rem;
        }

        .headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(1.4rem, 3vw, 2rem);
          line-height: 1.35;
          color: rgba(210, 240, 235, 0.75);
          letter-spacing: 0.02em;
          margin-bottom: 1.6rem;
        }

        .headline em {
          font-style: italic;
          color: rgba(130, 205, 190, 0.85);
        }

        .subline {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: clamp(0.78rem, 1.6vw, 0.9rem);
          line-height: 1.9;
          color: rgba(150, 195, 188, 0.45);
          letter-spacing: 0.06em;
          max-width: 460px;
          margin-bottom: 3.5rem;
        }

        .cta {
          display: inline-block;
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 0.68rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(160, 215, 205, 0.7);
          border: 1px solid rgba(100, 175, 165, 0.22);
          padding: 1.1rem 3.2rem;
          text-decoration: none;
          transition: all 0.45s ease;
          background: transparent;
          cursor: pointer;
        }

        .cta:hover {
          color: rgba(210, 240, 235, 0.95);
          border-color: rgba(100, 175, 165, 0.5);
          background: rgba(20, 100, 90, 0.07);
          letter-spacing: 0.4em;
        }

        .bottom {
          width: 100%;
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .bottom-mark {
          font-family: 'Jost', sans-serif;
          font-weight: 200;
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(100, 160, 150, 0.2);
        }

        @media (max-width: 600px) {
          .landing { padding: 3rem 1.5rem; }
          .title { letter-spacing: 0.08em; }
        }
      `}</style>

      <div className="glow" />

      <div className="top">
        <span className="wordmark">Est. 2025</span>
      </div>

      <div className="middle">
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

      <div className="bottom">
        <span className="bottom-mark">Personal Travel Architecture</span>
      </div>

    </main>
  );
}