import React, { useCallback } from 'react';

import './Image.scss';

export const Image: React.FC<{
    picture: any,
    addtitionalClass?: any,
    openImage: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}> = ({ picture, addtitionalClass = '', openImage }) => {
    const openImageCallBack = useCallback(() => {
        openImage(picture);
    }, []);
    return (
        <div className={'image ' + addtitionalClass} onClick={openImageCallBack}>
           <img src={picture ? picture.cropped_picture : ''} />
        </div>
    );
};
