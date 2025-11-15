import './ImageSlider.scss'

import { useState } from "react"

import type { Swiper as SwiperType } from "swiper/types"

import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { ImageWithLoader } from "@/components/ui/image-with-loader"

interface ImageSliderProps {
    images: string[]
    title: string
}

export const ImageSlider = ({ images, title }: ImageSliderProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

    if (!images || images.length === 0) {
        return (
            <div className="image-slider__empty">
                <span className="image-slider__empty-text">Нет изображений</span>
            </div>
        )
    }

    return (
        <div className="image-slider">
            <Swiper
                modules={[Navigation, Pagination, Thumbs, FreeMode]}
                navigation
                pagination={{ clickable: true }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                className="image-slider__main-slider"
                spaceBetween={10}
                slidesPerView={1}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="image-slider__slide">
                            <ImageWithLoader
                                src={image}
                                alt={`${title} - ${index + 1}`}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {images.length > 1 && (
                <Swiper
                    onSwiper={setThumbsSwiper}
                    modules={[FreeMode, Thumbs]}
                    watchSlidesProgress
                    freeMode
                    spaceBetween={10}
                    slidesPerView={4}
                    className="image-slider__thumbs-slider"
                    breakpoints={{
                        640: {
                            slidesPerView: 5,
                        },
                        768: {
                            slidesPerView: 6,
                        },
                    }}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index} className="image-slider__thumb-slide">
                            <div className="image-slider__thumb">
                                <ImageWithLoader
                                    src={image}
                                    alt={`${title} thumbnail ${index + 1}`}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    )
}
