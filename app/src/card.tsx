import Image from "next/image";

export interface BackendCompanyData {
    id: string;
    companyName: string;
    imageUrl?: string;
    greenwashingScore?: number; // 0..100
    esgScore?: number; // 0..100
    riskLevel?: "High" | "Medium" | "Low";
    grade?: string;
    starRating?: number; // 1-5 star rating
    // Individual metric ratings (1-5 stars)
    modelOutputsRating?: number;
    emissionsRating?: number;
    esgRanking?: number;
    vaguenessRating?: number;
    commitmentRating?: number;
    greenwashRating?: number;
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
    
    // Validate URL before using it
    const isValidUrl = (url: string | undefined): boolean => {
        if (!url) return false;
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const validImageUrl = isValidUrl(imageUrl) ? imageUrl : undefined;

    return (
        <div className="w-full h-full p-4 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-left flex flex-col gap-3 cursor-pointer transition-all hover:shadow-lg" onClick={onClick}>
            {validImageUrl ? (
                <div className="w-20 h-20 relative">
                    <Image 
                        src={validImageUrl} 
                        alt={`${companyName} logo`} 
                        fill 
                        sizes="80px" 
                        className="object-contain rounded-md"
                        onError={(e) => {
                            // Fallback if image fails to load
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                </div>
            ) : (
                <div className="w-20 h-20 rounded-md bg-zinc-100 dark:bg-zinc-700" />
            )}

            <h3 className="text-md font-semibold text-black dark:text-white leading-tight">{companyName}</h3>

             {rating && (
                <div className="inline-flex items-center text-sm font-medium text-black">
                    Grade: {rating}
                </div>
            )}

            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-white self-start w-max ${colorClass}`}>
                {label} Risk
            </span>
        </div>
    );
}