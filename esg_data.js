const data = [
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
  {
    "Company": "Pinnacle West Capital Corp",
    "Emissions (mtCO2e)": 5905134.813999999,
    "log_emissions": 6.77123,
    "environment_score": 629,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "Eastman Chemical Co",
    "Emissions (mtCO2e)": 5899994.0940000005,
    "log_emissions": 6.770852,
    "environment_score": 583,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Westrock Co",
    "Emissions (mtCO2e)": 5779510.298,
    "log_emissions": 6.761891,
    "environment_score": 555,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "EOG Resources Inc",
    "Emissions (mtCO2e)": 5578196.988,
    "log_emissions": 6.746494,
    "environment_score": 550,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Nucor Corp",
    "Emissions (mtCO2e)": 5386353.79,
    "log_emissions": 6.731295,
    "environment_score": 374,
    "environment_grade": "BB",
    "environment_level": "Medium"
  },
  {
    "Company": "NiSource Inc",
    "Emissions (mtCO2e)": 5027591.001999999,
    "log_emissions": 6.70136,
    "environment_score": 361,
    "environment_grade": "BB",
    "environment_level": "Medium"
  },
  {
    "Company": "Hawaiian Electric Industries Inc",
    "Emissions (mtCO2e)": 4498201.5608,
    "log_emissions": 6.653039,
    "environment_score": 585,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Devon Energy Corp",
    "Emissions (mtCO2e)": 4466016.704,
    "log_emissions": 6.64992,
    "environment_score": 570,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "CenterPoint Energy Inc",
    "Emissions (mtCO2e)": 4192299.8871999998,
    "log_emissions": 6.622452,
    "environment_score": 550,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Pioneer Natural Resources Co",
    "Emissions (mtCO2e)": 4123898.238604354,
    "log_emissions": 6.615308,
    "environment_score": 700,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "Martin Marietta Materials Inc",
    "Emissions (mtCO2e)": 3999044.162,
    "log_emissions": 6.601956,
    "environment_score": 573,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Consolidated Edison Inc",
    "Emissions (mtCO2e)": 3983727.99,
    "log_emissions": 6.60029,
    "environment_score": 700,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "ONEOK Inc",
    "Emissions (mtCO2e)": 3424095.5965607,
    "log_emissions": 6.534546,
    "environment_score": 581,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Sempra Energy",
    "Emissions (mtCO2e)": 3423949.1079999995,
    "log_emissions": 6.534527,
    "environment_score": 700,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "Marathon Oil Corp",
    "Emissions (mtCO2e)": 2514878.816,
    "log_emissions": 6.400517,
    "environment_score": 530,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Loews Corp",
    "Emissions (mtCO2e)": 2049069.3429697999,
    "log_emissions": 6.311557,
    "environment_score": 505,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Tyson Foods Inc",
    "Emissions (mtCO2e)": 1874907.486,
    "log_emissions": 6.27298,
    "environment_score": 530,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Diamondback Energy Inc",
    "Emissions (mtCO2e)": 1757044.196,
    "log_emissions": 6.244783,
    "environment_score": 513,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Celanese Corp",
    "Emissions (mtCO2e)": 1710685.842,
    "log_emissions": 6.23317,
    "environment_score": 500,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Hess Corp",
    "Emissions (mtCO2e)": 1509286.4872464524,
    "log_emissions": 6.178772,
    "environment_score": 535,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Packaging Corp of America",
    "Emissions (mtCO2e)": 1498344.226,
    "log_emissions": 6.175612,
    "environment_score": 500,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Newmont Corporation",
    "Emissions (mtCO2e)": 1393004.114,
    "log_emissions": 6.143952,
    "environment_score": 675,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "Sempra Energy",
    "Emissions (mtCO2e)": 1385410.8190000001,
    "log_emissions": 6.141579,
    "environment_score": 700,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "Coterra Energy Inc",
    "Emissions (mtCO2e)": 1358410.236,
    "log_emissions": 6.133031,
    "environment_score": 555,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Delta Air Lines Inc",
    "Emissions (mtCO2e)": 1256096.862,
    "log_emissions": 6.099023,
    "environment_score": 515,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Warrior Met Coal Inc",
    "Emissions (mtCO2e)": 1163558.75,
    "log_emissions": 6.065788,
    "environment_score": 215,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "Edison International",
    "Emissions (mtCO2e)": 1101786.0468000001,
    "log_emissions": 6.042097,
    "environment_score": 700,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "Texas Instruments Inc",
    "Emissions (mtCO2e)": 1057774.335383,
    "log_emissions": 6.024393,
    "environment_score": 500,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "3M Co",
    "Emissions (mtCO2e)": 1007143.688924,
    "log_emissions": 6.003091,
    "environment_score": 526,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Commercial Metals Co",
    "Emissions (mtCO2e)": 860624.344,
    "log_emissions": 5.934814,
    "environment_score": 223,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "Atmos Energy Corp",
    "Emissions (mtCO2e)": 574821.7255584,
    "log_emissions": 5.759533,
    "environment_score": 572,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Sempra Energy",
    "Emissions (mtCO2e)": 555211.294,
    "log_emissions": 5.744458,
    "environment_score": 700,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "Ford Motor Co",
    "Emissions (mtCO2e)": 497625.124,
    "log_emissions": 5.696902,
    "environment_score": 292,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "General Motors Co",
    "Emissions (mtCO2e)": 491788.832,
    "log_emissions": 5.691779,
    "environment_score": 510,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Microchip Technology Inc",
    "Emissions (mtCO2e)": 472938.201976,
    "log_emissions": 5.674804,
    "environment_score": 500,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Public Service Enterprise Group Inc",
    "Emissions (mtCO2e)": 463035.342,
    "log_emissions": 5.665614,
    "environment_score": 500,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Caterpillar Inc",
    "Emissions (mtCO2e)": 456901.738,
    "log_emissions": 5.659823,
    "environment_score": 235,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "Lamb Weston Holdings Inc",
    "Emissions (mtCO2e)": 413668.974,
    "log_emissions": 5.616653,
    "environment_score": 345,
    "environment_grade": "BB",
    "environment_level": "Medium"
  },
  {
    "Company": "Merck & Co Inc",
    "Emissions (mtCO2e)": 365529.704,
    "log_emissions": 5.562923,
    "environment_score": 500,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Honeywell International Inc",
    "Emissions (mtCO2e)": 354899.02920000005,
    "log_emissions": 5.550105,
    "environment_score": 545,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "PepsiCo Inc",
    "Emissions (mtCO2e)": 317942.602,
    "log_emissions": 5.502349,
    "environment_score": 719,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "Micron Technology Inc",
    "Emissions (mtCO2e)": 303884.3484487,
    "log_emissions": 5.482708,
    "environment_score": 530,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Exelon Corp",
    "Emissions (mtCO2e)": 301249.63759999996,
    "log_emissions": 5.478927,
    "environment_score": 694,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "Mohawk Industries Inc",
    "Emissions (mtCO2e)": 292597.1,
    "log_emissions": 5.46627,
    "environment_score": 570,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "WEC Energy Group Inc",
    "Emissions (mtCO2e)": 285126.636,
    "log_emissions": 5.455038,
    "environment_score": 635,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "General Electric Co",
    "Emissions (mtCO2e)": 272224.39280000003,
    "log_emissions": 5.434927,
    "environment_score": 533,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Freeport-McMoRan Inc",
    "Emissions (mtCO2e)": 260273.666,
    "log_emissions": 5.41543,
    "environment_score": 608,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "Albemarle Corp",
    "Emissions (mtCO2e)": 229671.722,
    "log_emissions": 5.361108,
    "environment_score": 545,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Pfizer Inc",
    "Emissions (mtCO2e)": 225796.41,
    "log_emissions": 5.353717,
    "environment_score": 500,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Eversource Energy",
    "Emissions (mtCO2e)": 206262.3,
    "log_emissions": 5.31442,
    "environment_score": 576,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Campbell Soup Co",
    "Emissions (mtCO2e)": 206162.124,
    "log_emissions": 5.314209,
    "environment_score": 515,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "PPG Industries Inc",
    "Emissions (mtCO2e)": 198602.998,
    "log_emissions": 5.297986,
    "environment_score": 293,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "Eastman Chemical Co",
    "Emissions (mtCO2e)": 194469.09,
    "log_emissions": 5.288851,
    "environment_score": 583,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Dupont De Nemours Inc",
    "Emissions (mtCO2e)": 180836.70799999998,
    "log_emissions": 5.257287,
    "environment_score": 550,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Compass Minerals International Inc",
    "Emissions (mtCO2e)": 151413.08000000002,
    "log_emissions": 5.180163,
    "environment_score": 505,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Corning Inc",
    "Emissions (mtCO2e)": 146051.952,
    "log_emissions": 5.164507,
    "environment_score": 200,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "Abbott Laboratories",
    "Emissions (mtCO2e)": 134386.892,
    "log_emissions": 5.128357,
    "environment_score": 515,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "WEC Energy Group Inc",
    "Emissions (mtCO2e)": 128827.002,
    "log_emissions": 5.110007,
    "environment_score": 635,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "Howmet Aerospace Inc",
    "Emissions (mtCO2e)": 124137.59400000001,
    "log_emissions": 5.093903,
    "environment_score": 525,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Analog Devices Inc",
    "Emissions (mtCO2e)": 117771.628108,
    "log_emissions": 5.071041,
    "environment_score": 350,
    "environment_grade": "BB",
    "environment_level": "Medium"
  },
  {
    "Company": "Conagra Brands Inc",
    "Emissions (mtCO2e)": 112660.176,
    "log_emissions": 5.05177,
    "environment_score": 525,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Northrop Grumman Corp",
    "Emissions (mtCO2e)": 110192.27799999999,
    "log_emissions": 5.042151,
    "environment_score": 505,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "MGM Resorts International",
    "Emissions (mtCO2e)": 110103.336,
    "log_emissions": 5.0418,
    "environment_score": 500,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Qorvo Inc",
    "Emissions (mtCO2e)": 102517.521773,
    "log_emissions": 5.010798,
    "environment_score": 535,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Spirit AeroSystems Holdings Inc",
    "Emissions (mtCO2e)": 100998.62,
    "log_emissions": 5.004315,
    "environment_score": 515,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Abbvie Inc",
    "Emissions (mtCO2e)": 99777.824,
    "log_emissions": 4.999034,
    "environment_score": 505,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Lockheed Martin Corp",
    "Emissions (mtCO2e)": 95794.13399999999,
    "log_emissions": 4.981339,
    "environment_score": 510,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Bristol-Myers Squibb Co",
    "Emissions (mtCO2e)": 95102.73999999999,
    "log_emissions": 4.978193,
    "environment_score": 500,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Leggett & Platt Inc",
    "Emissions (mtCO2e)": 85048.448,
    "log_emissions": 4.929666,
    "environment_score": 500,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Tesla Inc",
    "Emissions (mtCO2e)": 80515.196,
    "log_emissions": 4.905878,
    "environment_score": 555,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "General Motors Co",
    "Emissions (mtCO2e)": 80382.12,
    "log_emissions": 4.905159,
    "environment_score": 510,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "General Mills Inc",
    "Emissions (mtCO2e)": 70688.598,
    "log_emissions": 4.849349,
    "environment_score": 585,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Altria Group Inc",
    "Emissions (mtCO2e)": 66467.196,
    "log_emissions": 4.822607,
    "environment_score": 500,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Amgen Inc",
    "Emissions (mtCO2e)": 61780.352,
    "log_emissions": 4.79085,
    "environment_score": 575,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Hormel Foods Corp",
    "Emissions (mtCO2e)": 58585.68,
    "log_emissions": 4.767791,
    "environment_score": 570,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Haynes International Inc",
    "Emissions (mtCO2e)": 56641.288,
    "log_emissions": 4.753133,
    "environment_score": 500,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Corteva Inc",
    "Emissions (mtCO2e)": 56532.988,
    "log_emissions": 4.752302,
    "environment_score": 610,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "Alphabet Inc",
    "Emissions (mtCO2e)": 56418.04,
    "log_emissions": 4.751418,
    "environment_score": 295,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "Caesars Entertainment Inc",
    "Emissions (mtCO2e)": 56095.788,
    "log_emissions": 4.74893,
    "environment_score": 265,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "Textron Inc",
    "Emissions (mtCO2e)": 55579.572,
    "log_emissions": 4.744915,
    "environment_score": 500,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Heritage-Crystal Clean Inc",
    "Emissions (mtCO2e)": 51235.75,
    "log_emissions": 4.709573,
    "environment_score": 525,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Huntington Ingalls Industries Inc",
    "Emissions (mtCO2e)": 49706.726,
    "log_emissions": 4.696415,
    "environment_score": 545,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Qualcomm Inc",
    "Emissions (mtCO2e)": 48566.816,
    "log_emissions": 4.68634,
    "environment_score": 409,
    "environment_grade": "BBB",
    "environment_level": "High"
  },
  {
    "Company": "Deere & Co",
    "Emissions (mtCO2e)": 45075.88,
    "log_emissions": 4.653944,
    "environment_score": 560,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Baxter International Inc",
    "Emissions (mtCO2e)": 43203.836,
    "log_emissions": 4.635522,
    "environment_score": 500,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Universal Stainless & Alloy Products Inc",
    "Emissions (mtCO2e)": 42448.248,
    "log_emissions": 4.62786,
    "environment_score": 238,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "Weyerhaeuser Co",
    "Emissions (mtCO2e)": 41144.524,
    "log_emissions": 4.614312,
    "environment_score": 700,
    "environment_grade": "AA",
    "environment_level": "Excellent"
  },
  {
    "Company": "Broadcom Inc",
    "Emissions (mtCO2e)": 34457.051985,
    "log_emissions": 4.537278,
    "environment_score": 210,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "American Airlines Group Inc",
    "Emissions (mtCO2e)": 34261.918,
    "log_emissions": 4.534812,
    "environment_score": 270,
    "environment_grade": "B",
    "environment_level": "Medium"
  },
  {
    "Company": "Thermo Fisher Scientific Inc",
    "Emissions (mtCO2e)": 28392.342,
    "log_emissions": 4.453201,
    "environment_score": 527,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Biogen Inc",
    "Emissions (mtCO2e)": 28268.192,
    "log_emissions": 4.451298,
    "environment_score": 380,
    "environment_grade": "BB",
    "environment_level": "Medium"
  },
  {
    "Company": "Viatris Inc",
    "Emissions (mtCO2e)": 26031.806,
    "log_emissions": 4.415504,
    "environment_score": 500,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Skyworks Solutions Inc",
    "Emissions (mtCO2e)": 24116.71997,
    "log_emissions": 4.382318,
    "environment_score": 515,
    "environment_grade": "A",
    "environment_level": "High"
  },
  {
    "Company": "Raytheon Technologies Corp",
    "Emissions (mtCO2e)": 18147.032,
    "log_emissions": 4.258806,
    "environment_score": 520,
    "environment_grade": "A",
    "environment_level": "High"
  }
];