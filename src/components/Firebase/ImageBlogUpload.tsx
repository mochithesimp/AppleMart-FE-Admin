
import { storage } from "./Firebase"; // Import Storage từ Firebase
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const ImageBlogUpload = async (file: File, blogId: number): Promise<string> => {

    if (!file) throw new Error("No file provided");

  const storageRef = ref(storage, `BlogImages/${blogId}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null,
      (error) => reject(error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at", downloadURL);
        resolve(downloadURL);
      }
    );
  });
};

