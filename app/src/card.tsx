import Image from "next/image";

export interface BackendCompanyData {
    id: string;
    companyName: string;
    imageUrl?: string;
    greenwashingScore?: number; // 0..100
    esgScore?: number; // 0..100
    riskLevel?: "High" | "Medium" | "Low";
    description?: string;
}

export interface CardProps {
    companyName: string;
    riskLabel?: "High" | "Medium" | "Low" | string;
    imageUrl?: string;
    rating?: "A" | "B" | "C" | "D" | "F" | string;
    onClick?: () => void;
    data?: BackendCompanyData; // backend data for display
}

export function Card({ companyName, riskLabel, imageUrl, rating, onClick, data }: CardProps) {
    const label = riskLabel ?? data?.riskLevel ?? "Unknown";
    const colorClass =
        label === "High" ? "bg-red-500" : label === "Medium" ? "bg-yellow-500" : label === "Low" ? "bg-green-500" : "bg-gray-500";
    return (
        <div className="w-328 h-80 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-left flex flex-col gap-3 cursor-pointer transition-all hover:shadow-lg" onClick={onClick}>
            {imageUrl ? (
                <div className="w-20 h-20 relative">
                    <Image src={imageUrl} alt={`${companyName} logo`} fill sizes="80px" className="object-contain rounded-md" />
                </div>
            ) : (
                <div className="w-20 h-20 rounded-md bg-zinc-100 dark:bg-zinc-700" />
            )}

            <h3 className="text-lg font-semibold text-black dark:text-white">{companyName}</h3>

            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-white ${colorClass}`}>
                {label} Risk
            </span>
            {rating && (
                <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-black">
                    Rating: {rating}
                </span>
            )}
        </div>
    );
}