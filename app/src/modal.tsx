import type { BackendCompanyData } from "./card";

export interface ModalItem {
    title: string;
    description: string;
    data?: BackendCompanyData;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    item?: ModalItem;
}

const StarRating = ({ rating }: { rating?: number }) => {
    if (rating === undefined) return <span className="text-gray-400">N/A</span>;
    return (
        <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-lg ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                </span>
            ))}
        </div>
    );
};

export const Modal = ({ isOpen, onClose, item }: ModalProps) => {
    if (!isOpen) return null;
    const data = item?.data;
    return (
        <div className="grid grid-cols-2 fixed inset-0 z-50 flex items-center justify-center bg-black/50 " onClick={onClose}>
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-black dark:text-white mb-2">{item?.title}</h2>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4">{item?.description}</p>

                {data && (
                    <>
                        <div className="bg-zinc-100 dark:bg-zinc-700 rounded-lg p-4 mb-4 space-y-3">
                            <h3 className="font-semibold text-black dark:text-white mb-3">Sustainability Metrics</h3>
                            
                            {data.modelOutputsRating !== undefined && (
                                <div className="flex justify-between items-center">
                                    <span className="text-black dark:text-white">Model Outputs / Data Quality:</span>
                                    <StarRating rating={data.modelOutputsRating} />
                                </div>
                            )}
                            
                            {data.emissionsRating !== undefined && (
                                <div className="flex justify-between items-center">
                                    <span className="text-black dark:text-white">Emissions Score:</span>
                                    <StarRating rating={data.emissionsRating} />
                                </div>
                            )}
                            
                            {data.esgRanking !== undefined && (
                                <div className="flex justify-between items-center">
                                    <span className="text-black dark:text-white">ESG Ranking:</span>
                                    <StarRating rating={data.esgRanking} />
                                </div>
                            )}
                            
                            {data.vaguenessRating !== undefined && (
                                <div className="flex justify-between items-center">
                                    <span className="text-black dark:text-white">Clarity Score:</span>
                                    <StarRating rating={data.vaguenessRating} />
                                </div>
                            )}
                            
                            {data.commitmentRating !== undefined && (
                                <div className="flex justify-between items-center">
                                    <span className="text-black dark:text-white">Commitment:</span>
                                    <StarRating rating={data.commitmentRating} />
                                </div>
                            )}
                            
                            {data.greenwashRating !== undefined && (
                                <div className="flex justify-between items-center">
                                    <span className="text-black dark:text-white">Greenwash Score:</span>
                                    <StarRating rating={data.greenwashRating} />
                                </div>
                            )}
                        </div>
                    </>
                )}

                <button onClick={onClose} className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                    Close
                </button>
            </div>
        </div>
    );
};