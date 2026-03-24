'use client';

import { useState } from 'react';
import config from '@/src/config';

interface ScanResult {
  domain: string;
  riskLevel: number;
  riskCategory: string;
  sslGrade: string;
  domainAge: number;
  security_score: number;
  is_fake: boolean;
}

export default function UrlScanner() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('https://vigilante-scanner.onrender.com/api/scan/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ url: url }),
});

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Scan failed');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Scan failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-card rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-foreground">URL Scanner</h2>
      <p className="text-muted-foreground mb-6">
        Check if a website is safe or potentially fraudulent
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to scan (e.g., https://example.com)"
          className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          onKeyPress={(e) => e.key === 'Enter' && handleScan()}
        />
        <button
          onClick={handleScan}
          disabled={loading}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Scanning...' : 'Scan URL'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          ❌ {error}
        </div>
      )}

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Scan Results</h3>
          
          <div className="grid gap-4">
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="font-medium">Domain:</span>
              <span className="text-foreground">{result.domain}</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="font-medium">Risk Level:</span>
              <span className={`font-bold ${
                result.riskCategory === 'critical' || result.riskCategory === 'high' 
                  ? 'text-red-500' 
                  : result.riskCategory === 'medium' 
                  ? 'text-yellow-500' 
                  : 'text-green-500'
              }`}>
                {result.riskLevel}% ({result.riskCategory.toUpperCase()})
              </span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="font-medium">SSL Grade:</span>
              <span className="font-mono font-bold">{result.sslGrade}</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="font-medium">Domain Age:</span>
              <span>{Math.round(result.domainAge / 365)} years ({result.domainAge} days)</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="font-medium">Security Score:</span>
              <span className="font-bold">{result.security_score}/100</span>
            </div>
            
            <div className={`p-4 rounded-lg ${
              result.is_fake 
                ? 'bg-red-500/10 border border-red-500/20' 
                : 'bg-green-500/10 border border-green-500/20'
            }`}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{result.is_fake ? '⚠️' : '✅'}</span>
                <span className={`font-semibold ${result.is_fake ? 'text-red-500' : 'text-green-500'}`}>
                  {result.is_fake 
                    ? 'SUSPICIOUS - This site may be fake!' 
                    : 'SAFE - This site appears legitimate'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}"// Force deploy - v3" 
