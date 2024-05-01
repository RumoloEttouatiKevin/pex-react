import { ImageListItem } from "../ImageListItem/ImageListItem";
import "./ImageList.css";

export function ImageList({ imgList }) {
  return (
    <div>
      {imgList.map((img) => {
        return (
          <div key={img.id} className="card_item">
            <ImageListItem img={img} />
          </div>
        );
      })}
    </div>
  );
}
