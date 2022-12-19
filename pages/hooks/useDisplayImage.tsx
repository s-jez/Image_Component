import { useState } from "react";

const useDisplayImage = () => {
  const [result, setResult] = useState("");
  const uploader = (e: { target: HTMLInputElement }) => {
    if (e.target.files != null) {
      const imageFileName = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        let data: string | ArrayBuffer = e.target?.result!;
        setResult(data.toString());
      });
      reader.readAsDataURL(imageFileName);
    }
  };
  return { result, uploader };
};
export default useDisplayImage;
