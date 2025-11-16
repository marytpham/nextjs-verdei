'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { Card, type BackendCompanyData } from "./src/card";
import { Infocard } from "./src/infocard";
import { Modal, type ModalItem } from "./src/modal";
import { ScatterPlot } from "./src/scatterplot";
import { EmissionsBarChart } from "./src/barchart";
import { TCFDPieCharts } from "./src/tcfdpiechart";

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

    // Proper CSV parsing function that handles commas in fields
    const parseCSVLine = (line: string): string[] => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };

    const headers = parseCSVLine(lines[0]);
    const companies: BackendCompanyData[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue; // Skip empty lines
      
      const values = parseCSVLine(lines[i]);
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
      const riskValue = parseFloat(row.risk); // risk metric from CSV

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

      // Compute risk level based on risk column (inverted: higher risk value = lower risk rating)
      let riskLevel: 'High' | 'Medium' | 'Low' = 'Medium';
      if (!isNaN(riskValue)) {
        const riskPercentage = riskValue * 100;
        if (riskPercentage > 5) riskLevel = 'Low'; // Higher risk value = Low risk rating
        else if (riskPercentage < 2) riskLevel = 'High'; // Lower risk value = High risk rating
      }

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
  const [activeTab, setActiveTab] = useState<'mission' | 'metrics' | 'graphs'>('mission');

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

          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            <a
              href="#company-reports"
              className="flex h-12 w-max items-center justify-center gap-2 rounded-full bg-[#076912] px-5 text-white transition-colors hover:bg-[#054d0e] cursor-pointer"
            >
              Find Company Reports
            </a>
          </div>
        </div>
      </main>

       <section id="metrics-section" className="relative flex min-h-full w-full items-center justify-center bg-white p-12">
        <div className="max-w-6xl w-full">
          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('mission')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'mission'
                  ? 'bg-[#076912] text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Our Mission
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'metrics'
                  ? 'bg-[#076912] text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Measures & Metrics
            </button>
            <button
              onClick={() => setActiveTab('graphs')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'graphs'
                  ? 'bg-[#076912] text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Our Research
            </button>
          </div>

          {/* Our Mission Tab Content */}
          {activeTab === 'mission' && (
            <div className="max-w-6xl mx-auto">
              {/* Hero Section */}
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-[#076912] mb-6 leading-tight">
                  Unmasking Corporate<br />Sustainability
                </h2>
                <p className="text-2xl text-gray-600 font-light max-w-3xl mx-auto">
                  Exposing Greenwashing Through Data & Language Analysis
                </p>
              </div>

              {/* Key Points Grid */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="text-center p-6">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">The Problem</h3>
                  <p className="text-gray-600 leading-relaxed">
                    ESG ratings are hidden behind paywalls and opaque methods, allowing companies to appear "green" while harming the planet.
                  </p>
                </div>
                
                <div className="text-center p-6 bg-[#076912] text-white rounded-lg shadow-lg transform scale-105">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Our Solution</h3>
                  <p className="leading-relaxed">
                    We combine EPA emissions data, ESG scores, and AI language analysis to reveal the truth.
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Our Focus</h3>
                  <p className="text-gray-600 leading-relaxed">
                    U.S. companies with the highest emissions — from the world's second-largest CO₂ emitter.
                  </p>
                </div>
              </div>

              {/* Visualization Section */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">Global CO₂ Emissions Per Capita</h3>
                <div className="bg-white rounded-lg shadow-inner p-4">
                  <iframe 
                    src="https://ourworldindata.org/grapher/co-emissions-per-capita?tab=line" 
                    loading="lazy" 
                    className="w-full h-[600px] border-0 rounded" 
                    allow="web-share; clipboard-write"
                    title="CO2 Emissions Per Capita"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Metrics Tab Content */}
          {activeTab === 'metrics' && (
            <div>
              <h2 className="text-3xl font-semibold text-black mb-6 text-center flex items-center justify-center gap-3">
                <svg className="w-8 h-8 text-[#076912]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Measures & Metrics: How We Quantify Greenwashing
              </h2>
              <p className="text-lg text-gray-700 mb-4 text-center max-w-4xl mx-auto">
                To expose the gap between what companies say and what they emit, we integrate verified EPA greenhouse gas emissions, ESG environmental scores, and AI-driven climate language analysis. This multi-layered approach gives us a transparent, empirical way to measure sustainability truthfulness.
              </p>
              <p className="text-base text-gray-600 mb-8 text-center">
                Below are the core metrics powering our analysis.
              </p>

          {/* Metrics Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* EPA Emissions Data Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="w-16 h-16 mb-3 bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#076912] transition-colors">
                EPA Emissions Data — The Ground Truth
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                We use emissions data from the EPA Greenhouse Gas Reporting Program (GHGRP), established in 2009 requiring major emitters to report annual greenhouse gas emissions.
              </p>
              <details className="text-sm text-gray-700">
                <summary className="cursor-pointer font-medium text-[#076912] hover:underline mb-2">
                  Learn more →
                </summary>
                <div className="mt-3 space-y-3 pl-2 border-l-2 border-gray-200">
                  <div>
                    <p className="font-semibold mb-1">What it measures:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Direct (Scope 1) emissions from facilities emitting 25,000+ metric tons CO₂e per year</li>
                      <li>Power plants, refineries, chemical plants, steel mills, pipelines, and more</li>
                      <li>85–90% of U.S. industrial emissions across 8,000+ facilities</li>
                      <li>Standardized reporting under 40 CFR Part 98</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">What it doesn't measure:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Scope 2 emissions (purchased electricity)</li>
                      <li>Scope 3 emissions (supply chains, products, logistics)</li>
                      <li>Small emitters, tech offices, warehouses, global operations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Why we still use it:</p>
                    <p className="text-xs">
                      Although EPA data is self-reported, it is the most complete, regulated, and publicly available emissions dataset in the United States. We supplement with self-reported Scope 2/3 disclosures for comprehensive estimates.
                    </p>
                  </div>
                </div>
              </details>
            </div>

            {/* ESG Environmental Scores Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="w-16 h-16 mb-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#076912] transition-colors">
                ESG Environmental Scores — What Companies Claim
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                ESG agencies claim to measure "a company's environmental impact, including carbon emissions, waste, pollution, water usage, biodiversity, and climate risk management."
              </p>
              <details className="text-sm text-gray-700">
                <summary className="cursor-pointer font-medium text-[#076912] hover:underline mb-2">
                  Learn more →
                </summary>
                <div className="mt-3 space-y-3 pl-2 border-l-2 border-gray-200">
                  <div>
                    <p className="font-semibold mb-2">But ESG systems suffer from major flaws:</p>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span><span className="font-semibold">Poor availability:</span> Data is paywalled and expensive, limiting transparency.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span><span className="font-semibold">Poor compatibility:</span> No standard method — different firms give different scores for the same company.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span><span className="font-semibold">Lack of transparency:</span> Rating formulas are private, unregulated, and often arbitrary.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <p className="font-bold text-sm mb-1 flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Key finding:
                    </p>
                    <p className="text-xs font-semibold">There is no meaningful correlation between a company's total emissions and its ESG Environmental Score.</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
                      <li>Big polluters can receive high ESG scores</li>
                      <li>Low-emission companies can receive poor scores</li>
                    </ul>
                  </div>
                </div>
              </details>
            </div>

            {/* Climate Language Analysis Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="w-16 h-16 mb-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#076912] transition-colors">
                Climate Language Metrics — Analyzing What Companies Say
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                We process sustainability reports using ClimateBERT, a transformer model trained specifically on climate disclosures, extracting five core metrics.
              </p>
              <details className="text-sm text-gray-700">
                <summary className="cursor-pointer font-medium text-[#076912] hover:underline mb-2">
                  Learn more →
                </summary>
                <div className="mt-3 space-y-3 pl-2 border-l-2 border-gray-200">
                  <div>
                    <p className="font-semibold text-xs">Relatedness:</p>
                    <p className="text-xs">How many sentences actually discuss climate, carbon, emissions, or environmental strategy.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-xs">Specificity:</p>
                    <p className="text-xs">Whether claims include numerical targets, deadlines, and measurable actions vs. vague statements.</p>
                    <p className="text-xs italic mt-1">High: "Reduce Scope 1 emissions 40% by 2030, with $500M allocated."</p>
                    <p className="text-xs italic">Low: "We are committed to building a greener future."</p>
                  </div>
                  <div>
                    <p className="font-semibold text-xs">Sentiment:</p>
                    <p className="text-xs">Tone from financial perspective: risk (threats), neutral (factual), or opportunity (business upside).</p>
                  </div>
                  <div>
                    <p className="font-semibold text-xs">Commitment:</p>
                    <p className="text-xs">Real pledges like emission targets, net-zero timelines, clean energy purchasing, or just PR messaging.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-xs">TCFD Subcategories:</p>
                    <p className="text-xs">Classifies sentences into Metrics, Strategy, Governance, or Risk to reveal balanced vs. cherry-picked reporting.</p>
                  </div>
                </div>
              </details>
            </div>
          </div>

          {/* Greenwash Residual Index Card - Full Width */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-8 shadow-lg">
            <div className="text-center mb-4">
              <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-green-200 to-blue-200 rounded-xl flex items-center justify-center">
                <svg className="w-10 h-10 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                The Greenwash Residual Index — Measuring the "Talk vs Walk" Gap
              </h3>
              <p className="text-base text-gray-700 max-w-3xl mx-auto">
                To quantify greenwashing, we compare a company's climate language profile with its actual emissions.
              </p>
            </div>
            
            <details className="text-sm text-gray-700">
              <summary className="cursor-pointer font-semibold text-lg text-[#076912] hover:underline mb-4 text-center">
                See how we calculate it →
              </summary>
              <div className="mt-4 space-y-4 max-w-3xl mx-auto">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="font-semibold mb-2">Step 1 — Predict Emissions from Language</p>
                  <p className="text-xs">We train a Random Forest model that predicts emissions based solely on climate language metrics.</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="font-semibold mb-2">Step 2 — Compare Predicted vs Actual Emissions</p>
                  <p className="text-xs font-mono bg-gray-100 p-2 rounded">Greenwash Residual = actual emissions − predicted emissions</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="font-semibold mb-2">Step 3 — Standardize</p>
                  <p className="text-xs">We convert this to a z-score, forming our final metric:</p>
                  <div className="mt-3 bg-green-50 p-4 rounded border border-green-200">
                    <p className="font-bold text-center text-base">⭐ Greenwash Residual Index (GRI)</p>
                    <p className="text-xs text-center mt-2">A higher score = stronger evidence of greenwashing</p>
                  </div>
                </div>
                <p className="text-xs text-center text-gray-600 italic">
                  This allows transparency, comparability, and interpretability across industries.
                </p>
              </div>
            </details>
          </div>

          <Infocard />
            </div>
          )}

          {/* Graphs Tab Content */}
          {activeTab === 'graphs' && (
            <div className="space-y-12">
              <div className="bg-gray-50 p-8 rounded-lg">
                <ScatterPlot />
              </div>
              <div className="bg-white p-8 rounded-lg">
                <EmissionsBarChart />
              </div>
              
              {/* Mary's Interactive Visualizations */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Industry Distribution Analysis</h3>
                <iframe 
                  src="/analysis_outputs/pie_industry_all.html" 
                  className="w-full h-[600px] border-0"
                  title="Industry Mix Chart"
                />
              </div>

              <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">ESG Predictions vs Actual Scores</h3>
                <div className="max-w-3xl mx-auto mb-6">
                  <p className="text-base text-gray-700 leading-relaxed text-center">
                    We developed a predictive model to estimate emissions based on ESG environmental data. <span className="font-semibold text-orange-700">Companies positioned above the regression line</span> are emitting more greenhouse gases than their ESG scores would predict, revealing potential greenwashing.
                  </p>
                </div>
                <iframe 
                  src="/analysis_outputs/scatter_esg_pred_vs_actual.html" 
                  className="w-full h-[600px] border-0"
                  title="ESG Predictions Scatter Plot"
                />
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Language Analysis Predictions vs Actual</h3>
                <div className="max-w-3xl mx-auto mb-6">
                  <p className="text-base text-gray-700 leading-relaxed text-center">
                    We trained a predictive model to estimate emissions based on AI-analyzed climate language patterns from sustainability reports. <span className="font-semibold text-orange-700">Companies positioned above the regression line</span> use language suggesting lower environmental impact than their actual emissions demonstrate.
                  </p>
                </div>
                <iframe 
                  src="/analysis_outputs/scatter_language_pred_vs_actual.html" 
                  className="w-full h-[600px] border-0"
                  title="Language Analysis Scatter Plot"
                />
              </div>

              <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Top Greenwashers vs Climate Winners</h3>
                <iframe 
                  src="/analysis_outputs/top7_greenwashers_vs_winners.html" 
                  className="w-full h-[600px] border-0"
                  title="Greenwashers vs Winners Comparison"
                />
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Greenwashing Explainability - Top 7 Companies</h3>
                <div className="max-w-4xl mx-auto mb-6">
                  <p className="text-base text-gray-700 leading-relaxed text-center mb-3">
                    The <span className="font-semibold text-[#076912]">Greenwash Residual Index (GRI)</span> measures the gap between what companies say and what they actually emit. We predict emissions from their climate language, then calculate the residual difference from actual reported emissions.
                  </p>
                  <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border-l-4 border-red-500 p-4">
                    <p className="text-base font-semibold text-red-900 text-center">
                      Higher GRI values (shown in red) indicate more severe greenwashing — where language significantly understates actual environmental impact.
                    </p>
                  </div>
                </div>
                <iframe 
                  src="/analysis_outputs/top7_greenwash_explainability_table.html" 
                  className="w-full h-[700px] border-0"
                  title="Greenwashing Explainability Table"
                />
              </div>

              <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                <TCFDPieCharts />
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="company-reports" className="relative w-full items-center justify-center bg-[url(/reportbckg.jpeg)] bg-cover bg-center dark:bg-black p-12">
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
