import React, { useState, useCallback } from 'react';

import './ImagePreview.scss';

const className = 'image-preview';

export const ImagePreview: React.FC<{
    addtitionalClass?: string,
    selectedImage: any,
    unselectImage: (event: React.MouseEvent<HTMLButtonElement>) => void,
    previousImage:  (selectedImage: any) => void,
    nextImage:  (selectedImage: any) => void,
}> = ({
    addtitionalClass = '',
    selectedImage,
    unselectImage,
    previousImage,
    nextImage,
}) =>  {
    const [size, setSize] = useState(100);
    const { 
        author,
        camera,
        full_picture,
        tags,
    } = selectedImage;

    const resizePlus = useCallback(() => {
        setSize(size + 10);
    }, [size]);

    const resizeMinus = useCallback(() => {
        setSize(size - 10);
    }, [size]);

    const setDefault = useCallback(() => {
        setSize(100);
    }, [size]);

    return (
        <div
            style={{
                backgroundImage: `url(${full_picture})`,
                backgroundSize: `${size}%`,
            }}
            className={`${className}
            ${addtitionalClass}`}
        >
            <button onClick={unselectImage} className={`${className}__close`}>Close</button>
            <button onClick={() => previousImage(selectedImage)} className={`${className}__previous`}></button>
            <button onClick={() => nextImage(selectedImage)} className={`${className}__next`}></button>
            <div className={`${className}__scroll-block`}>
                <button onClick={resizePlus} className={`${className}__plus`}>+</button>
                <button onClick={setDefault} className={`${className}__reset`}>Reset</button>
                <button onClick={resizeMinus} className={`${className}__minus`}>-</button>
            </div>
            <div className={`${className}__overlap`}>
                {author && <div>Author: {author}</div>}
                {tags && <div>Tags: {tags}</div>}
                {camera && <div>Camera: {camera}</div>}
            </div>
        </div>
    );
};
