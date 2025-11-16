'use client';

const API_BASE_URL = 'http://localhost:8000'; // FastAPI backend URL
const RATING_CATEGORIES = ['Climate & Footprint', 'People & Community', 'Leadership & Ethics'];

import { useState, useEffect } from 'react';
import Image from "next/image";
import { Card, type BackendCompanyData } from "./src/card";
import { Infocard } from "./src/infocard";
import { Modal, type ModalItem } from "./src/modal";

// Sample backend response shape (update with your FastAPI response)
interface CompanyAnalysis {
  id: string;
  companyName: string;
  imageUrl?: string;
  greenwashingScore: number;
  esgScore: number;
  riskLevel: "High" | "Medium" | "Low";
  description?: string;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ModalItem | undefined>(undefined);
  const [companies, setCompanies] = useState<BackendCompanyData[]>([]);

  // Sample data for testing (replace with API data)
  const sampleCompanies: BackendCompanyData[] = [
    {
      id: '1',
      companyName: 'Acme Corp',
      imageUrl: '/verde-i.png',
      greenwashingScore: 35,
      esgScore: 72,
      riskLevel: 'High',
      description: 'Acme Corp shows moderate ESG compliance with elevated greenwashing concerns.',
    },
    {
      id: '2',
      companyName: 'Beta Ltd',
      imageUrl: '/reportbckg.jpeg',
      greenwashingScore: 55,
      esgScore: 68,
      riskLevel: 'Medium',
      description: 'Beta Ltd demonstrates balanced ESG performance with some reporting gaps.',
    },
    {
      id: '3',
      companyName: 'Gamma Inc',
      imageUrl: undefined,
      greenwashingScore: 78,
      esgScore: 85,
      riskLevel: 'Low',
      description: 'Gamma Inc shows strong ESG credentials with transparent sustainability practices.',
    },
  ];

  // Fetch companies from FastAPI backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Replace with your actual FastAPI endpoint
        // Example: GET /api/companies or POST /api/analyze
        const response = await fetch(`${API_BASE_URL}/api/companies`);
        if (response.ok) {
          const data: CompanyAnalysis[] = await response.json();
          // Map backend data to BackendCompanyData format
          setCompanies(data.map(company => ({
            id: company.id,
            companyName: company.companyName,
            imageUrl: company.imageUrl,
            greenwashingScore: company.greenwashingScore,
            esgScore: company.esgScore,
            riskLevel: company.riskLevel,
            description: company.description,
          })));
        }
      } catch (error) {
        console.error('Failed to fetch companies:', error);
        // Fallback to sample data if fetch fails
        setCompanies(sampleCompanies);
      }
    };
    fetchCompanies();
  }, [sampleCompanies]);

  const handleCardClick = (company: BackendCompanyData) => {
    setSelectedItem({
      title: company.companyName,
      description: company.description || `Company: ${company.companyName}`,
      data: company,
    });
    setIsModalOpen(true);
  };

  const displayCompanies = companies.length > 0 ? companies : sampleCompanies;

  return (
    <>
      <main className="relative flex min-h-full w-full flex-col items-center justify-center bg-[url(/verdei_gradient.jpeg)] bg-cover bg-center h-screen dark:bg-black">
        <Image
          className="absolute top-4 left-4 dark:invert"
          src="/verde-i.png"
          alt="verde-i logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl flex font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Know the Real Score.
          </h1>
          <p className="max-w-md text-lg leading-6 text-zinc-600 dark:text-zinc-400">
            Instantly verify if a company's sustainability promises are backed by hard, quantifiable evidence. Upload a report to get the transparent Company Trust Score before you buy or support.
          </p>
        </div>
        <br />
        <div className="flex flex-col gap-8 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find Company Reports
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            target="_blank"
            rel="noopener noreferrer"
          >
            See how scoring works
          </a>
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

      <section className="relative flex min-h-full w-full items-center justify-center bg-[url(/reportbckg.jpeg)] bg-cover bg-center h-screen dark:bg-black p-12">
        <div className="max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-black dark:text-white mb-4">Browse Company Sustainability Reports</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
            This section is intentionally empty so you can add more content as you scroll. Replace this placeholder with sections, cards, or any components you need.
          </p>
          <div className="gap-8 flex flex-row flex-wrap justify-center">
            {displayCompanies.map((company) => (
              <Card
                key={company.id}
                companyName={company.companyName}
                riskLabel={company.riskLevel}
                imageUrl={company.imageUrl}
                data={company}
                onClick={() => handleCardClick(company)}
              />
            ))}
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} item={selectedItem} />
    </>
  );
}
