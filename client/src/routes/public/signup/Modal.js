import styles from './Modal.module.css';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useState, useEffect, useCallback, useRef } from 'react';
import useHeight from '../../../hooks/useHeight';

const Modal = ({ avatar, avatarHandler, changeAvatarHandler }) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const screenHeight = useHeight();

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  return (
    <div className={styles.modal} style={{ height: screenHeight }}>
      <ReactCrop
        className={styles.reactCrop}
        src={avatar}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />

      <div className={styles.canvas}>
        <canvas
          ref={previewCanvasRef}
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
          }}
        />
      </div>

      <div className={styles.buttonsContainer}>
        <div className={styles.otherAvatar}>
          <label className={styles.otherAvatarLabel}>Change</label>

          <input
            className={styles.otherAvatarInput}
            type='file'
            onChange={changeAvatarHandler}
          />
        </div>

        <button
          className={`${styles.modalButton} ${styles.saveAvatar}`}
          type='button'
          disabled={!completedCrop?.width || !completedCrop?.height}
          onClick={() => avatarHandler(previewCanvasRef.current, completedCrop)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Modal;
