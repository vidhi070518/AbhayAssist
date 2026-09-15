import React from 'react';
import { Info } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="bg-slate-900/90 border-b border-slate-800 text-[11px] text-slate-400 py-1.5 px-4 text-center flex items-center justify-center space-x-2">
      <Info className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
      <span>
        <strong className="text-slate-200">Prototype Disclaimer:</strong> AbhayAssist is an SIH prototype platform. Risk scores and selected geographic layers shown in this demonstration are prototype assessments unless explicitly marked as official data.
      </span>
    </div>
  );
}
