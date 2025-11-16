'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Import the esg_data
const esgData = [
  {
    "Company": "Home Depot",
    "Emissions (mtCO2e)": 206494563.0,
    "log_emissions": 8.314909,
    "environment_score": 230,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "Amazon",
    "Emissions (mtCO2e)": 68250000.0,
    "log_emissions": 7.834103,
    "environment_score": 668,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "Coca-Cola Company",
    "Emissions (mtCO2e)": 61517567.0,
    "log_emissions": 7.788999,
    "environment_score": 200,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "Chevron",
    "Emissions (mtCO2e)": 54000000.0,
    "log_emissions": 7.732394,
    "environment_score": 210,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "UnitedHealth Group",
    "Emissions (mtCO2e)": 17977601.0,
    "log_emissions": 7.254732,
    "environment_score": 500,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Microsoft",
    "Emissions (mtCO2e)": 17162000.0,
    "log_emissions": 7.234568,
    "environment_score": 715,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "Cisco",
    "Emissions (mtCO2e)": 17092306.0,
    "log_emissions": 7.232801,
    "environment_score": 280,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "Apple",
    "Emissions (mtCO2e)": 15600000.0,
    "log_emissions": 7.193125,
    "environment_score": 355,
    "environment_grade": "BB",
    "environment_level": "Medium"
  },
  {
    "Company": "Walmart",
    "Emissions (mtCO2e)": 15060000.0,
    "log_emissions": 7.177825,
    "environment_score": 310,
    "environment_grade": "BB",
    "environment_level": "Medium"
  },
  {
    "Company": "Google",
    "Emissions (mtCO2e)": 14300000.0,
    "log_emissions": 7.155336,
    "environment_score": 295,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "Meta",
    "Emissions (mtCO2e)": 7500000.0,
    "log_emissions": 6.875061,
    "environment_score": 205,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "Johnson & Johnson",
    "Emissions (mtCO2e)": 7372687.0,
    "log_emissions": 6.867626,
    "environment_score": 565,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Lilly (Eli)",
    "Emissions (mtCO2e)": 6701000.0,
    "log_emissions": 6.82614,
    "environment_score": 510,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Costco",
    "Emissions (mtCO2e)": 4700000.0,
    "log_emissions": 6.672098,
    "environment_score": 537,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Nvidia",
    "Emissions (mtCO2e)": 3692423.0,
    "log_emissions": 6.567311,
    "environment_score": 323,
    "environment_grade": "BB",
    "environment_level": "Medium"
  },
  {
    "Company": "Broadcom",
    "Emissions (mtCO2e)": 1847962.0,
    "log_emissions": 6.266693,
    "environment_score": 210,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "Oracle Corporation",
    "Emissions (mtCO2e)": 1164600.0,
    "log_emissions": 6.066177,
    "environment_score": 500,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "JP Morgan",
    "Emissions (mtCO2e)": 873876.0,
    "log_emissions": 5.94145,
    "environment_score": 505,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Visa Inc.",
    "Emissions (mtCO2e)": 487000.0,
    "log_emissions": 5.687529,
    "environment_score": 504,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Exon Mobil",
    "Emissions (mtCO2e)": 290000.0,
    "log_emissions": 5.462398,
    "environment_score": 538,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Bank of America",
    "Emissions (mtCO2e)": 68821.0,
    "log_emissions": 4.837721,
    "environment_score": 220,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "Duke Energy Corp",
    "Emissions (mtCO2e)": 65077745.5932,
    "log_emissions": 7.813432,
    "environment_score": 604,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "American Electric Power Company Inc",
    "Emissions (mtCO2e)": 48124049.1456,
    "log_emissions": 7.682362,
    "environment_score": 500,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Nextera Energy Inc",
    "Emissions (mtCO2e)": 40964268.725600004,
    "log_emissions": 7.612405,
    "environment_score": 668,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "Exxon Mobil Corp",
    "Emissions (mtCO2e)": 36792767.284,
    "log_emissions": 7.565762,
    "environment_score": 538,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Entergy Corp",
    "Emissions (mtCO2e)": 32446877.0148,
    "log_emissions": 7.511173,
    "environment_score": 653,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "Phillips 66",
    "Emissions (mtCO2e)": 30706527.914,
    "log_emissions": 7.487231,
    "environment_score": 569,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Xcel Energy Inc",
    "Emissions (mtCO2e)": 29597308.068800002,
    "log_emissions": 7.471252,
    "environment_score": 223,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "Dominion Energy Inc",
    "Emissions (mtCO2e)": 29274234.363199998,
    "log_emissions": 7.466486,
    "environment_score": 535,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Marathon Petroleum Corp",
    "Emissions (mtCO2e)": 28729668.849600002,
    "log_emissions": 7.458331,
    "environment_score": 700,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "PPL Corp",
    "Emissions (mtCO2e)": 26919146.4032,
    "log_emissions": 7.430061,
    "environment_score": 525,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Valero Energy Corp",
    "Emissions (mtCO2e)": 23535216.552,
    "log_emissions": 7.371718,
    "environment_score": 608,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "DTE Energy Co",
    "Emissions (mtCO2e)": 23317452.069999997,
    "log_emissions": 7.367681,
    "environment_score": 592,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "NRG Energy Inc",
    "Emissions (mtCO2e)": 22723329.304,
    "log_emissions": 7.356472,
    "environment_score": 371,
    "environment_grade": "BB",
    "environment_level": "Medium"
  },
  {
    "Company": "CF Industries Holdings Inc",
    "Emissions (mtCO2e)": 20579424.174,
    "log_emissions": 7.313433,
    "environment_score": 525,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Chevron Corp",
    "Emissions (mtCO2e)": 19859598.269999996,
    "log_emissions": 7.29797,
    "environment_score": 210,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "Ameren Corp",
    "Emissions (mtCO2e)": 19790344.651600003,
    "log_emissions": 7.296453,
    "environment_score": 562,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "WEC Energy Group Inc",
    "Emissions (mtCO2e)": 19196211.57,
    "log_emissions": 7.283216,
    "environment_score": 635,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "Evergy Inc",
    "Emissions (mtCO2e)": 19050740.8012,
    "log_emissions": 7.279912,
    "environment_score": 555,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Dow Inc",
    "Emissions (mtCO2e)": 16789121.0044,
    "log_emissions": 7.225028,
    "environment_score": 225,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "AES Corp",
    "Emissions (mtCO2e)": 15677526.79,
    "log_emissions": 7.195278,
    "environment_score": 525,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Alliant Energy Corp",
    "Emissions (mtCO2e)": 15563848.496,
    "log_emissions": 7.192117,
    "environment_score": 519,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "FirstEnergy Corp",
    "Emissions (mtCO2e)": 15338451.137999998,
    "log_emissions": 7.185782,
    "environment_score": 510,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Waste Management Inc",
    "Emissions (mtCO2e)": 11650459.606,
    "log_emissions": 7.066343,
    "environment_score": 613,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "Occidental Petroleum Corp",
    "Emissions (mtCO2e)": 11123031.52,
    "log_emissions": 7.046223,
    "environment_score": 505,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Republic Services Inc",
    "Emissions (mtCO2e)": 10718356.044,
    "log_emissions": 7.030128,
    "environment_score": 293,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "CMS Energy Corp",
    "Emissions (mtCO2e)": 10419392.854,
    "log_emissions": 7.017842,
    "environment_score": 450,
    "environment_grade": "BBB",
    "environment_level": "High"
  },
  {
    "Company": "Linde PLC",
    "Emissions (mtCO2e)": 8787322.32,
    "log_emissions": 6.943857,
    "environment_score": 210,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "Conocophillips",
    "Emissions (mtCO2e)": 7979116.608,
    "log_emissions": 6.901955,
    "environment_score": 687,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
];

// Get top 10 companies by emissions
const top10Companies = [...esgData]
  .sort((a, b) => b["Emissions (mtCO2e)"] - a["Emissions (mtCO2e)"])
  .slice(0, 10)
  .map(item => ({
    company: item.Company,
    emissions: item["Emissions (mtCO2e)"] / 1000000, // Convert to millions
    emissionsRaw: item["Emissions (mtCO2e)"],
    grade: item.environment_grade,
    level: item.environment_level,
    score: item.environment_score
  }));

// Function to determine bar color based on environment level
const getBarColor = (level: string) => {
  switch (level) {
    case 'Excellent':
      return '#10b981'; // Green
    case 'High':
      return '#3b82f6'; // Blue
    case 'Medium':
      return '#f59e0b'; // Orange
    default:
      return '#6b7280'; // Gray
  }
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border border-gray-300 rounded shadow-lg">
        <p className="font-semibold text-gray-800 mb-2">{data.company}</p>
        <p className="text-sm text-gray-600">Emissions: {data.emissions.toFixed(2)} million mtCO₂e</p>
        <p className="text-sm text-gray-600">Environmental Score: {data.score}</p>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700">Grade: <span className="font-bold">{data.grade}</span></p>
          <p className="text-sm font-medium text-gray-700">Level: <span className="font-bold">{data.level}</span></p>
        </div>
      </div>
    );
  }
  return null;
};

export function EmissionsBarChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Top 10 Companies by Total Emissions
      </h3>
      <div className="max-w-3xl mx-auto mb-6">
        <p className="text-base text-gray-700 leading-relaxed text-center mb-2">
          <span className="font-semibold">7 out of 10</span> of the companies with the most emissions received <span className="font-semibold">excellent/high ESG environmental scores</span> and <span className="font-semibold">no companies received low scores.</span>
        </p>
        <p className="text-sm text-gray-600 text-center">
          Hover over bars to see detailed information including environmental grades
        </p>
      </div>
      
      <div className="h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={top10Companies}
            margin={{ top: 20, right: 30, left: 80, bottom: 120 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="company" 
              angle={-45}
              textAnchor="end"
              height={120}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              label={{ value: 'Emissions (Million mtCO₂e)', angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} />
            <Bar 
              dataKey="emissions" 
              name="Emissions"
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {top10Companies.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBarColor(entry.level)}
                  opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.5}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Company details table */}
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700">Company</th>
              <th className="border border-gray-300 px-4 py-2 text-right font-semibold text-gray-700">Emissions (mtCO₂e)</th>
              <th className="border border-gray-300 px-4 py-2 text-center font-semibold text-gray-700">Grade</th>
              <th className="border border-gray-300 px-4 py-2 text-center font-semibold text-gray-700">Level</th>
            </tr>
          </thead>
          <tbody>
            {top10Companies.map((company, index) => (
              <tr 
                key={index}
                className="hover:bg-gray-50 transition-colors"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ 
                  backgroundColor: hoveredIndex === index ? 'rgba(59, 130, 246, 0.1)' : undefined 
                }}
              >
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{company.company}</td>
                <td className="border border-gray-300 px-4 py-2 text-right text-gray-800">
                  {company.emissionsRaw.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <span className="font-bold text-gray-800">{company.grade}</span>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: getBarColor(company.level) }}
                  >
                    {company.level}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
          <span className="text-xs text-gray-600">Excellent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
          <span className="text-xs text-gray-600">High</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
          <span className="text-xs text-gray-600">Medium</span>
        </div>
      </div>
    </div>
  );
}
