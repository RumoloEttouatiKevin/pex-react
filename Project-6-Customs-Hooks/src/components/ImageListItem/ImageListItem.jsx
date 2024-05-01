import "./ImageListItem.css";
import { saveAs } from "file-saver";

export function ImageListItem({ img }) {
  async function downloadImage() {
    const response = await fetch(img.download_url);
    const blob = await response.blob();

    saveAs(blob, img.author + "_" + img.id);
  }

  return (
    <div className="card">
      <a href={img.url}>
        <img src={img.download_url} className="img" alt="" />
      </a>
      <div className="card_banner">
        <img src={img.download_url} className="card_thumb" alt="" />
        <div className="card_text">
          <h3 className="cord_title">{img.author}</h3>
          <div className="card_status">
            Original size: {img.height}x{img.width}
          </div>
          <button onClick={downloadImage}>Download</button>
        </div>
      </div>
    </div>
  );
}
