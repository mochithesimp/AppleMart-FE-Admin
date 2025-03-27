import { useState } from "react";

interface DropdownProps {
  images: { blogImageID: number; imageUrl: string; blogId: number }[];
  onImageChange: (index: number, file: File) => void;
}

const ImageBlogDropdownProps: React.FC<DropdownProps> = ({ images, onImageChange }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="image-dropdown">
      <select onChange={(e) => setSelectedIndex(Number(e.target.value))}>
        <option value="">Select Image</option>
        {images.map((img, index) => (
          <option key={img.blogImageID} value={index}>
            Image {index + 1}
          </option>
        ))}
      </select>

      {selectedIndex !== null && (
        <div className="image-preview">
          <img src={images[selectedIndex].imageUrl} alt="Selected" className="product-image" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                onImageChange(selectedIndex, e.target.files[0]);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageBlogDropdownProps;
