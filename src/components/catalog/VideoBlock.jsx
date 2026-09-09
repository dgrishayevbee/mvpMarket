import "./VideoBlock.css";

export function VideoBlock() {
  return (
    <div className="video-block">
      <span className="video-block__time">0:04</span>
      <span className="video-block__expand" aria-hidden="true">
        ⤢
      </span>
      <button type="button" className="video-block__play" aria-label="Воспроизвести видео">
        ▶
      </button>
      <span className="video-block__caption">
        Кратко рассказываем
        <br />о преимуществах интернета для бизнеса
      </span>
    </div>
  );
}
