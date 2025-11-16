'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { Card, type BackendCompanyData } from "./src/card";
import { Infocard } from "./src/infocard";
import { Modal, type ModalItem } from "./src/modal";

// Parse CSV data from main_dataset_2024.csv
async function loadCompaniesFromCSV(): Promise<BackendCompanyData[]> {
  try {
    // Try to fetch from public folder
    const response = await fetch('/main_dataset_2024.csv');
    
    if (!response.ok) {
      console.error('CSV fetch failed with status:', response.status);
      return [];
    }
    
    const csvText = await response.text();
    
    if (!csvText) {
      console.error('CSV file is empty');
      return [];
    }

    const lines = csvText.trim().split('\n');
    
    if (lines.length < 2) {
      console.error('CSV has no data rows');
      return [];
    }

    const headers = lines[0].split(',').map(h => h.trim());
    const companies: BackendCompanyData[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue; // Skip empty lines
      
      const values = lines[i].split(',');
      const row: Record<string, string> = {};
      
      headers.forEach((header, idx) => {
        row[header] = values[idx]?.trim() || '';
      });

      // Map CSV columns to BackendCompanyData
      const spec = parseFloat(row.spec);
      const relate = parseFloat(row.relate);
      const commit = parseFloat(row.commit);
      const emissions = parseFloat(row.all_total_emissions);
      const metrics = parseFloat(row.metrics); // model outputs / metrics quality
      const strategy = parseFloat(row.strategy);

      const greenwashingScore = isNaN(spec) ? 50 : Math.round(spec * 100);
      const esgScore = isNaN(relate) || isNaN(commit) ? 50 : Math.round(((relate * 100 + commit * 100) / 2));

      // Helper function to convert 0-100 score to 1-5 stars
      const scoreToStars = (score: number | undefined): number | undefined => {
        if (score === undefined || isNaN(score)) return undefined;
        // Clamp score to 0-100 range
        const normalizedScore = Math.max(0, Math.min(100, score));
        if (normalizedScore >= 80) return 5;
        if (normalizedScore >= 60) return 4;
        if (normalizedScore >= 40) return 3;
        if (normalizedScore >= 20) return 2;
        return 1;
      };

      // Calculate individual metric ratings (1-5 stars each)
      const modelOutputsRating = scoreToStars((metrics || 0) * 100); // Model outputs / metrics quality
      const emissionsRating = scoreToStars(100 - Math.min(100, (emissions / 70000000) * 100)); // Lower emissions = better
      const esgRanking = scoreToStars(esgScore); // ESG score (0-100)
      const vaguenessRating = scoreToStars((1 - (strategy || 0)) * 100); // Lower strategy = more vague, invert it
      const commitmentRating = scoreToStars((commit || 0) * 100); // Commitment score (0-1 -> 0-100)
      const greenwashRating = scoreToStars((spec || 0) * 100); // Specificity / Greenwash score

      // Compute risk level based on data
      let riskLevel: 'High' | 'Medium' | 'Low' = 'Medium';
      if (greenwashingScore < 30) riskLevel = 'High';
      else if (greenwashingScore > 70) riskLevel = 'Low';

      // Calculate overall star rating (1-5) based on: commitment, spec (greenwash), relate (relatedness), emissions (lower is better), ESG score
      // Weighted scoring: commitment (25%), spec (25%), relate (20%), ESG score (20%), emissions factor (10%)
      const commitmentScore = (commit * 100) || 0; // 0-100
      const specScore = (spec * 100) || 0; // 0-100 (higher spec is better)
      const relateScore = (relate * 100) || 0; // 0-100 (higher relate is better)
      const esgFactor = esgScore || 0; // 0-100

      // Emissions: normalize by max emissions seen (assume ~70M), lower emissions = better
      const maxEmissions = 70000000;
      const emissionsPenalty = Math.min(100, (emissions / maxEmissions) * 100);
      const emissionsScore = 100 - emissionsPenalty; // Invert so higher is better

      // Weighted average: 0-100
      const rawScore = (commitmentScore * 0.25) + (specScore * 0.25) + (relateScore * 0.2) + (esgFactor * 0.2) + (emissionsScore * 0.1);
      
      // Convert to 1-5 stars: 0-20 = 1 star, 20-40 = 2 stars, 40-60 = 3 stars, 60-80 = 4 stars, 80-100 = 5 stars
      let starRating = 1;
      if (rawScore >= 80) starRating = 5;
      else if (rawScore >= 60) starRating = 4;
      else if (rawScore >= 40) starRating = 3;
      else if (rawScore >= 20) starRating = 2;

      companies.push({
        id: row.ticker || `company-${i}`,
        companyName: row.name || row.ticker || 'Unknown Company',
        imageUrl: row.logo || undefined,
        greenwashingScore,
        esgScore,
        riskLevel,
        grade: row.total_grade || undefined,
        starRating,
        modelOutputsRating,
        emissionsRating,
        esgRanking,
        vaguenessRating,
        commitmentRating,
        greenwashRating,
        description: `${row.name} - ${row.industry || 'Company'}. ESG Score: ${row.total_grade || 'N/A'}. Total Score: ${row.total_score || 'N/A'}`,
      });
      
      // Debug: log first company's ratings
      if (i === 1) {
        console.log('First company ratings:', {
          companyName: row.name,
          modelOutputsRating,
          emissionsRating,
          esgRanking,
          vaguenessRating,
          commitmentRating,
          greenwashRating,
        });
      }
    }

    console.log('Loaded companies from CSV:', companies.length);
    return companies;
  } catch (error) {
    console.error('Failed to load CSV:', error);
    return [];
  }
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ModalItem | undefined>(undefined);
  const [companies, setCompanies] = useState<BackendCompanyData[]>([]);

  // Load CSV data on component mount
  useEffect(() => {
    loadCompaniesFromCSV().then(setCompanies);
  }, []);

  const handleCardClick = (company: BackendCompanyData) => {
    setSelectedItem({
      title: company.companyName,
      description: company.description || `Company: ${company.companyName}`,
      data: company,
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <main className="relative flex w-full items-center justify-center bg-white h-screen p-[27px]">
        <div className="absolute inset-0 m-[27px] rounded-[50px] bg-[url(/verdei_gradient.jpeg)] bg-cover bg-center overflow-hidden" />
        
        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          <Image
            className="dark:invert mb-4"
            src="/verde-i.png"
            alt="verde-i logo"
            width={100}
            height={20}
            priority
          />
          <h1 className="text-4xl flex font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Know the Real Score.
          </h1>
          <p className="max-w-xl text-lg leading-6 text-zinc-600 dark:text-zinc-400">
            Instantly verify a company's sustainability claims against hard, quantifiable evidence. Look at our transparent Verde-i Trust Score before you buy or support.
          </p>
          <div className="flex flex-col gap-8 text-base font-medium sm:flex-row">
            <a
              className="flex h-12 w-max items-center justify-center gap-2 rounded-full bg-[#076912] px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Find Company Reports
            </a>
            <a
              className="flex h-12 w-max items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors bg-white opacity-56 text-[#076912] hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
              target="_blank"
              rel="noopener noreferrer"
            >
              See how scoring works
            </a>
          </div>
        </div>
      </main>

       <section className="relative flex min-h-full w-full items-center justify-center bg-white p-12">
        <div className="max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-black dark:text-white mb-4">What We Measure</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
            This section is intentionally empty so you can add more content as you scroll. Replace this placeholder with sections, cards, or any components you need.
          </p>
          <Infocard />
        </div>
      </section>

      <section className="relative w-full items-center justify-center bg-[url(/reportbckg.jpeg)] bg-cover bg-center dark:bg-black p-12">
        <div className="w-full">
          <h2 className="text-3xl font-semibold text-black dark:text-white mb-4 text-center">Browse Company Sustainability Reports</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 text-center">
            We took sustainability reports from 40 companies top S&P 500 companies and pulled out key data to see whether their climate talk lines up with actual documented actions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {companies.map((company) => (
              <Card
                key={company.id}
                companyName={company.companyName}
                riskLabel={company.riskLevel}
                imageUrl={company.imageUrl}
                data={company}
                onClick={() => handleCardClick(company)}
                rating={company.grade}
              />
            ))}
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} item={selectedItem} />
    </>
  );
}
