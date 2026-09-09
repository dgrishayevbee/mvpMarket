import { useContent } from "../../context/ContentContext.jsx";
import "./VideoBlock.css";

export function VideoBlock() {
  const { content } = useContent();
  const { video } = content;

  return (
    <div
      className="video-block"
      style={video.imageUrl ? { backgroundImage: `url(${video.imageUrl})` } : undefined}
    >
      <span className="video-block__time">0:04</span>
      <span className="video-block__expand" aria-hidden="true">
        ⤢
      </span>
      <button type="button" className="video-block__play" aria-label="Воспроизвести видео">
        ▶
      </button>
      <span className="video-block__caption">{video.caption}</span>
    </div>
  );
}
