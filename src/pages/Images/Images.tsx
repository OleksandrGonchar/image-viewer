import React, { useState, useCallback, useEffect } from 'react';
import { Image } from '../../common/Image';
import { Http } from '../../services/http';
import { Pagination } from '../../common/Pagination';
import { ImagePreview } from '../../common/ImagePreview';

import './Images.scss';

const cssClass = 'image-list';

export const Images: React.FC = () => {
    const [imageList, setImageList] = useState([]);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [selectedImage, setSelectedImage ] = useState();

    const getImages = useCallback((page: number) => {
        Http.get(`images?page=${page}`).then(responce => {
            setImageList(responce.pictures);
            setPage(responce.page);
            setPageCount(responce.pageCount);
        });
    }, [page]);

    useEffect(() => {        
        getImages(page);
    }, [page]);

    const setPageNum = useCallback((num: number) => {
        setImageList([]);
        setPage(num);
    }, [page]);

    const findImageIndex = useCallback((imageId: string, images): number =>
        images.findIndex(({ id }: { id: string }) => imageId === id), []);

    const previousImage = useCallback((selectedImage: any) => {
        const selectedNum = findImageIndex(selectedImage.id, imageList);
        const targetIndex = selectedNum - 1;
        openImage(imageList[targetIndex < 0 ? imageList.length - 1 : targetIndex]);
    }, [page, imageList]);

    const nextImage = useCallback((selectedImage: any) => {
        const selectedNum = findImageIndex(selectedImage.id, imageList);
        const targetIndex = selectedNum + 1;
        const index: number = imageList.length === targetIndex ? 0 : targetIndex;
        openImage(imageList[index]);
    }, [page, imageList]);

    const openImage = useCallback((selectedImage: any) => {
        Http.get(`images/${selectedImage.id}`)
            .then(setSelectedImage);
    }, [page]);

    return (<div className={cssClass}>
        { !selectedImage && <>
            <h1 className={`${cssClass}__title`}>Images</h1>
            <Pagination count={pageCount} callBack={setPageNum} position={page} />
            <div className={`${cssClass}__container`}>
                { !imageList.length && <h2 className={`${cssClass}__loading`}>Image loading...</h2> }
                { imageList.map((picture: any) => (<div className={`${cssClass}__item`}>
                    <Image key={picture.id} picture={picture} openImage={openImage}/>
                </div>)) }
            </div>
        </>}
        { selectedImage &&
            <ImagePreview
                selectedImage={selectedImage}
                previousImage={previousImage}
                nextImage={nextImage}
                unselectImage={() => setSelectedImage(undefined) }
                />
        }

    </div>);
};
