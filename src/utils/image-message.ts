import imageToAscii from "image-to-ascii";

interface ImageMessageProps {
  imageUrl: string;
}

/**
 * @param {string} imageUrl - The image to be displayed.
 * @description This function will display a message on the console with image.
 * @returns { void } console with the image messages
 */
export default function imageMessage({ imageUrl }: ImageMessageProps) {
  imageToAscii(imageUrl, (err: any, converted: any) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(converted);
  });
}
