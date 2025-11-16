# Backend Integration Guide

## FastAPI Connection

Your Next.js frontend is now ready to connect to your FastAPI backend for greenwashing and ESG scores.

### Current Setup

- **Frontend API Base URL**: `http://localhost:8000` (change in `app/page.tsx` if needed)
- **Expected Endpoint**: `GET /api/companies`

### Backend Response Format

Your FastAPI endpoint should return data matching this shape:

```python
# FastAPI example (Python)
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class CompanyAnalysis(BaseModel):
    id: str
    companyName: str
    imageUrl: Optional[str] = None
    greenwashingScore: float  # 0..100
    esgScore: float  # 0..100
    riskLevel: str  # "High" | "Medium" | "Low"
    description: Optional[str] = None

@app.get("/api/companies")
async def get_companies():
    return [
        {
            "id": "1",
            "companyName": "Acme Corp",
            "imageUrl": None,
            "greenwashingScore": 35,
            "esgScore": 72,
            "riskLevel": "High",
            "description": "Acme Corp description..."
        },
        # ... more companies
    ]
```

### Frontend Code Flow

1. **Fetch on Mount** (`useEffect` in `app/page.tsx`):
   - Calls `${API_BASE_URL}/api/companies`
   - Maps response to `BackendCompanyData` format
   - Stores in `companies` state

2. **Fallback**:
   - If fetch fails or no data, uses `sampleCompanies` (defined in `page.tsx`)
   - Ensures UI always renders

3. **Card Click**:
   - `handleCardClick(company)` receives `BackendCompanyData`
   - Opens modal with ESG/greenwashing scores displayed

### Data Display

#### In Card (`app/src/card.tsx`):
- Company name
- Risk level (High/Medium/Low) - colored badge
- Optional logo image

#### In Modal (`app/src/modal.tsx`):
- Company name
- Description
- Greenwashing Score (%)
- ESG Score (%)
- Risk Level

### How to Update

**Step 1**: Replace the `API_BASE_URL` in `app/page.tsx`:
```typescript
const API_BASE_URL = 'http://localhost:8000'; // Change to your FastAPI URL
```

**Step 2**: Update the endpoint path if different:
```typescript
// Current
const response = await fetch(`${API_BASE_URL}/api/companies`);

// Change to match your endpoint
const response = await fetch(`${API_BASE_URL}/your/custom/endpoint`);
```

**Step 3**: Adjust the `CompanyAnalysis` interface if your backend returns different fields:
```typescript
interface CompanyAnalysis {
  // Match your FastAPI response shape
  id: string;
  companyName: string;
  // ... other fields
}
```

### Testing

1. Start your FastAPI server (e.g., `uvicorn main:app --reload`)
2. Open browser DevTools (F12) → Network tab
3. Load the page and check if `GET /api/companies` succeeds
4. Check the Application tab to verify data fetched

### CORS (If Needed)

If you get CORS errors, add this to your FastAPI app:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Real-time Updates

To refresh data periodically:

```typescript
useEffect(() => {
  const interval = setInterval(fetchCompanies, 30000); // Refresh every 30s
  return () => clearInterval(interval);
}, []);
```

---

**Ready to connect?** Push your FastAPI endpoint and the frontend will automatically pull and display the data.
