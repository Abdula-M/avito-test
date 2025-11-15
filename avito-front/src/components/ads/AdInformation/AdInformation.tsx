import './AdInformation.scss'

import { Calendar, Clock, Star, Tag, User } from "lucide-react"

import type { Advertisement } from "@/api/types/ads.types"

import { formatDate, formatShortDate } from "@/utils/dateFormat"
import { formatPrice } from "@/utils/formatters"

interface AdInformationProps {
    ad: Advertisement
}

export const AdInformation = ({ ad }: AdInformationProps) => {
    return (
        <div className="ad-information">
            <div className="ad-information__price">
                {formatPrice(ad.price)}
            </div>

            <div className="ad-information__content">
                <div>
                    <h2 className="ad-information__section-title">Основная информация</h2>
                    <div className="ad-information__info-grid">
                        <div className="ad-information__info-item">
                            <Tag className="ad-information__icon" />
                            <div>
                                <div className="ad-information__info-label">Категория</div>
                                <div className="ad-information__info-value">{ad.category}</div>
                            </div>
                        </div>
                        <div className="ad-information__info-item">
                            <Clock className="ad-information__icon" />
                            <div>
                                <div className="ad-information__info-label">Создано</div>
                                <div className="ad-information__info-value">{formatDate(ad.createdAt)}</div>
                            </div>
                        </div>
                        <div className="ad-information__info-item">
                            <Clock className="ad-information__icon" />
                            <div>
                                <div className="ad-information__info-label">Обновлено</div>
                                <div className="ad-information__info-value">{formatDate(ad.updatedAt)}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="ad-information__section-title">Полное описание</h2>
                    <p className="ad-information__description">{ad.description}</p>
                </div>

                {ad.characteristics && Object.keys(ad.characteristics).length > 0 && (
                    <div>
                        <h2 className="ad-information__section-title">Характеристики товара</h2>
                        <table className="ad-information__table">
                            <tbody>
                                {Object.entries(ad.characteristics).map(([key, value]) => (
                                    <tr key={key}>
                                        <td className="ad-information__table-key">
                                            {key}
                                        </td>
                                        <td>{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div>
                    <h2 className="ad-information__section-title">Информация о продавце</h2>
                    <div className="ad-information__seller-card">
                        <div className="ad-information__seller-grid">
                            <div className="ad-information__seller-column">
                                <div className="ad-information__seller-item">
                                    <User className="ad-information__icon ad-information__icon--large" />
                                    <div>
                                        <div className="ad-information__info-label">Имя продавца</div>
                                        <div className="ad-information__seller-name">{ad.seller.name}</div>
                                    </div>
                                </div>

                                <div className="ad-information__seller-item">
                                    <Star className="ad-information__icon ad-information__icon--large ad-information__icon--star" />
                                    <div>
                                        <div className="ad-information__info-label">Рейтинг</div>
                                        <div className="ad-information__info-value">{ad.seller.rating}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="ad-information__seller-column">
                                <div className="ad-information__seller-item">
                                    <Tag className="ad-information__icon ad-information__icon--large" />
                                    <div>
                                        <div className="ad-information__info-label">Количество объявлений</div>
                                        <div className="ad-information__info-value">{ad.seller.totalAds}</div>
                                    </div>
                                </div>

                                <div className="ad-information__seller-item">
                                    <Calendar className="ad-information__icon ad-information__icon--large" />
                                    <div>
                                        <div className="ad-information__info-label">Дата регистрации</div>
                                        <div className="ad-information__info-value">{formatShortDate(ad.seller.registeredAt)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
