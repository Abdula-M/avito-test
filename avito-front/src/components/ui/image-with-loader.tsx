import { useEffect, useState } from 'react';
import { ImageOff, Loader2 } from 'lucide-react';

interface ImageWithLoaderProps {
    src: string;
    alt: string;
    className?: string;
}

const IMAGE_LOAD_TIMEOUT = 5000; // 5 секунд

export const ImageWithLoader = ({ src, alt, className = '' }: ImageWithLoaderProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [hasTimedOut, setHasTimedOut] = useState(false);

    useEffect(() => {
        // Сброс состояний при изменении src
        setIsLoading(true);
        setHasError(false);
        setHasTimedOut(false);

        // Таймаут для загрузки изображения
        const timeout = setTimeout(() => {
            setIsLoading((prevLoading) => {
                if (prevLoading) {
                    setHasTimedOut(true);
                }
                return false;
            });
        }, IMAGE_LOAD_TIMEOUT);

        return () => clearTimeout(timeout);
    }, [src]);

    const handleLoad = () => {
        setIsLoading(false);
        setHasTimedOut(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    // Показываем заглушку если произошла ошибка или таймаут
    const showPlaceholder = hasError || hasTimedOut;

    return (
        <div className="relative w-full h-full">
            {isLoading && !showPlaceholder && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
            )}
            {showPlaceholder ? (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <ImageOff className="w-12 h-12 text-muted-foreground/50" />
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                    onLoad={handleLoad}
                    onError={handleError}
                />
            )}
        </div>
    );
};
