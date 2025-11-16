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

export const Modal = ({ isOpen, onClose, item }: ModalProps) => {
    if (!isOpen) return null;
    const data = item?.data;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-black dark:text-white mb-2">{item?.title}</h2>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4">{item?.description}</p>

                {data && (
                    <div className="bg-zinc-100 dark:bg-zinc-700 rounded-lg p-4 mb-4 space-y-2">
                        {data.greenwashingScore !== undefined && (
                            <div className="flex justify-between">
                                <span className="font-semibold text-black dark:text-white">Greenwashing Score:</span>
                                <span className="text-zinc-600 dark:text-zinc-300">{data.greenwashingScore}%</span>
                            </div>
                        )}
                        {data.esgScore !== undefined && (
                            <div className="flex justify-between">
                                <span className="font-semibold text-black dark:text-white">ESG Score:</span>
                                <span className="text-zinc-600 dark:text-zinc-300">{data.esgScore}%</span>
                            </div>
                        )}
                        {data.riskLevel && (
                            <div className="flex justify-between">
                                <span className="font-semibold text-black dark:text-white">Risk Level:</span>
                                <span className="text-zinc-600 dark:text-zinc-300">{data.riskLevel}</span>
                            </div>
                        )}
                    </div>
                )}

                <button onClick={onClose} className="w-full px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                    Close
                </button>
            </div>
        </div>
    );
};