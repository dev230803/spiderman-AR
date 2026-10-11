import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const modelRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const model = modelRef.current;
    const audio = audioRef.current;

    const handlePlay = () => {
      if (audio && hasInteracted) {
        audio.play().catch((err) => console.log("Autoplay blocked:", err));
      }
    };

    const handlePause = () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0; // Rewinds audio to the beginning
      }
    };

    if (model) {
      model.addEventListener('play', handlePlay);
      model.addEventListener('pause', handlePause);
    }

    return () => {
      if (model) {
        model.removeEventListener('play', handlePlay);
        model.removeEventListener('pause', handlePause);
      }
    };
  }, [hasInteracted]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#111827' }}>
      
      <audio ref={audioRef} src="/spiderman-theme-trimmed.mp3" preload="auto" />

      {!hasInteracted && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <button
            onClick={() => setHasInteracted(true)}
            style={{
              padding: '16px 32px', backgroundColor: '#e23636', color: '#fff',
              border: 'none', borderRadius: '8px', fontSize: '1.25rem',
              fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(226,54,54,0.4)'
            }}
          >
            Launch Spider-Man Experience
          </button>
        </div>
      )}

      <model-viewer
  ref={modelRef}
  src="/29_sep_SpiderMan_Animation.glb"
  alt="Spider-Man 3D Model"
  bounds="tight"
  ar
  ar-modes="webxr scene-viewer quick-look"
  camera-controls
  autoplay={hasInteracted ? true : undefined}
  shadow-intensity="1"
  ar-placement="floor"
  style={{ width: '100%', height: '100%', display: hasInteracted ? 'block' : 'none' }}
>
        <button
          slot="ar-button"
          style={{
            position: 'absolute', bottom: '24px', left: '50%',
            transform: 'translateX(-50%)', backgroundColor: '#ffffff',
            color: '#111827', border: 'none', padding: '12px 24px',
            borderRadius: '9999px', fontWeight: 'bold', cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}
        >
          View in AR
        </button>
      </model-viewer>
    </div>
  );
}