import { useState } from 'react';
import { Loader2 } from 'lucide-react';

import { FALLBACK_IMAGE_URL } from '@/utils/imageUtils';

interface ImageWithLoaderProps {
    src: string;
    alt: string;
    className?: string;
}

export const ImageWithLoader = ({ src, alt, className = '' }: ImageWithLoaderProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    return (
        <div className="relative w-full h-full">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
            )}
            <img
                src={hasError ? FALLBACK_IMAGE_URL : src}
                alt={alt}
                className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                onLoad={handleLoad}
                onError={handleError}
            />
        </div>
    );
};
