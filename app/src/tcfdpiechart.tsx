'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Top 10 companies by Greenwash Index with their TCFD breakdown
const companiesData = [
  { name: 'Microsoft', metrics: 0.15, strategy: 0.80, governance: 0.01, risk: 0.04 },
  { name: 'Duke Energy', metrics: 0.10, strategy: 0.83, governance: 0.05, risk: 0.02 },
  { name: 'Amazon.com', metrics: 0.24, strategy: 0.72, governance: 0.03, risk: 0.00 },
  { name: 'Apple', metrics: 0.28, strategy: 0.67, governance: 0.01, risk: 0.04 },
  { name: 'American Electric Power', metrics: 0.16, strategy: 0.71, governance: 0.10, risk: 0.04 },
  { name: 'Xcel Energy', metrics: 0.24, strategy: 0.63, governance: 0.12, risk: 0.02 },
  { name: 'Cisco Systems', metrics: 0.34, strategy: 0.66, governance: 0.00, risk: 0.00 },
  { name: 'Alliant Energy', metrics: 0.35, strategy: 0.61, governance: 0.02, risk: 0.02 },
  { name: 'Meta Platforms', metrics: 0.36, strategy: 0.61, governance: 0.01, risk: 0.02 },
  { name: 'Xcel Energy', metrics: 0.31, strategy: 0.40, governance: 0.16, risk: 0.01 },
];

const COLORS = {
  metrics: '#10B981',    // green
  strategy: '#3B82F6',   // blue
  governance: '#F59E0B', // amber
  risk: '#EF4444',       // red
};

const CATEGORY_LABELS = {
  metrics: 'Metrics',
  strategy: 'Strategy',
  governance: 'Governance',
  risk: 'Risk',
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-900">{payload[0].name}</p>
        <p className="text-sm text-gray-700">
          {(payload[0].value * 100).toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

export function TCFDPieCharts() {
  return (
    <div className="w-full bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        TCFD Category Breakdown - Top 10 Greenwashing Companies
      </h3>
      <div className="max-w-4xl mx-auto mb-6">
        <p className="text-base text-gray-700 leading-relaxed text-center">
          These pie charts show how each company distributes their climate reporting across the four TCFD (Task Force on Climate-related Financial Disclosures) categories. A balanced report should address all four areas, while <span className="font-bold text-red-600">cherry-picked reporting often focuses heavily on Strategy</span> while neglecting concrete Metrics.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {companiesData.map((company) => {
          const pieData = [
            { name: CATEGORY_LABELS.metrics, value: company.metrics, category: 'metrics' },
            { name: CATEGORY_LABELS.strategy, value: company.strategy, category: 'strategy' },
            { name: CATEGORY_LABELS.governance, value: company.governance, category: 'governance' },
            { name: CATEGORY_LABELS.risk, value: company.risk, category: 'risk' },
          ];

          return (
            <div key={company.name} className="bg-gray-50 rounded-lg p-4 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                {company.name}
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.category as keyof typeof COLORS]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 space-y-1 text-xs">
                {pieData.map((entry) => (
                  <div key={entry.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-sm" 
                        style={{ backgroundColor: COLORS[entry.category as keyof typeof COLORS] }}
                      />
                      <span className="text-gray-700">{entry.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {(entry.value * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-3 text-center">Understanding TCFD Categories</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex gap-3">
            <div className="w-4 h-4 rounded-sm bg-[#10B981] flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-900">Metrics</p>
              <p className="text-gray-700">Quantifiable data and targets (emissions, reductions, timelines)</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-4 h-4 rounded-sm bg-[#3B82F6] flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-900">Strategy</p>
              <p className="text-gray-700">Long-term climate plans and business impacts</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-4 h-4 rounded-sm bg-[#F59E0B] flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-900">Governance</p>
              <p className="text-gray-700">Board oversight and organizational accountability</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-4 h-4 rounded-sm bg-[#EF4444] flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-900">Risk</p>
              <p className="text-gray-700">Climate-related risks and risk management processes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
