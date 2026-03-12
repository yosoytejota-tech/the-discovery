import Link from "next/link";

export default function Home() {
  return (
    <main className="landing">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body { background: #08151a; }

        .landing {
          min-height: 100vh;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, #0e2e35 0%, #08151a 70%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .glow {
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(20, 120, 110, 0.12) 0%, transparent 68%);
          pointer-events: none;
        }

        .wordmark {
          position: absolute;
          top: 2.2rem;
          left: 2.5rem;
          font-family: 'Jost', sans-serif;
          font-weight: 200;
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(160, 210, 200, 0.45);
        }

        .content {
          max-width: 720px;
          padding: 0 2rem;
          text-align: center;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .rule {
          width: 32px;
          height: 1px;
          background: rgba(100, 190, 175, 0.35);
          margin-bottom: 2.8rem;
        }

        .headline {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(2.4rem, 5.5vw, 4rem);
          line-height: 1.18;
          color: #dceeed;
          letter-spacing: -0.01em;
          margin-bottom: 1.8rem;
        }

        .headline em {
          font-style: italic;
          color: rgba(140, 210, 200, 0.85);
        }

        .subline {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: clamp(0.85rem, 1.8vw, 1rem);
          line-height: 1.75;
          color: rgba(160, 200, 195, 0.55);
          letter-spacing: 0.04em;
          max-width: 480px;
          margin-bottom: 3.2rem;
        }

        .cta {
          display: inline-block;
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 0.75rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(160, 215, 205, 0.75);
          border: 1px solid rgba(100, 175, 165, 0.25);
          padding: 1rem 2.8rem;
          text-decoration: none;
          transition: all 0.4s ease;
          background: transparent;
          cursor: pointer;
        }

        .cta:hover {
          color: rgba(200, 235, 230, 0.95);
          border-color: rgba(100, 175, 165, 0.55);
          background: rgba(20, 100, 90, 0.08);
          letter-spacing: 0.32em;
        }

        .bottom-rule {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 1px;
          background: rgba(100, 175, 165, 0.2);
        }
      `}</style>

      <div className="glow" />
      <div className="wordmark">The Discovery</div>

      <div className="content">
        <div className="rule" />
        <h1 className="headline">
          Most trips start with a destination.<br />
          <em>We start with you.</em>
        </h1>
        <p className="subline">
          The Discovery is your personal travel architect — we uncover who you are as a traveler before we tell you where to go.
        </p>
        <Link href="/chat" className="cta">
          Start Your Discovery
        </Link>
      </div>

      <div className="bottom-rule" />
    </main>
  );
}