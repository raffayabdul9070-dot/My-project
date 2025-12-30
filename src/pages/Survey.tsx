import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MapPin, Activity, Database, User, ChevronRight, CheckCircle } from 'lucide-react';
import './Survey.css';

const Survey = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', region: '', dialect: '', vitality: '' });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="survey-outer">
      <div className="survey-container">
        
        {/* Left Sidebar: Progress Tracking */}
        <div className="survey-sidebar">
          <div className="sidebar-header">
            <ShieldCheck className="gold-icon" />
            <span>Field Portal v1.0</span>
          </div>
          <div className="step-list">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`step-item ${step === s ? 'active' : step > s ? 'done' : ''}`}>
                <div className="step-number">{step > s ? <CheckCircle size={16} /> : s}</div>
                <div className="step-label">{s === 1 ? 'Identity' : s === 2 ? 'Location' : 'Linguistics'}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content: The Form Card */}
        <motion.div className="survey-card-premium" layout>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1" 
                initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
                className="step-content"
              >
                <div className="step-header">
                  <h2 className="gold-text">Personnel Identity</h2>
                  <p>Enter your official identification for the national archive.</p>
                </div>
                <div className="input-box">
                  <label><User size={16} /> Full Name / ID</label>
                  <input name="name" type="text" placeholder="e.g. Dr. Ahmed Khan" value={formData.name} onChange={handleChange} />
                </div>
                <button className="next-btn" onClick={nextStep} disabled={!formData.name}>
                  Continue <ChevronRight size={18} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2" 
                initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
                className="step-content"
              >
                <div className="step-header">
                  <h2 className="gold-text">Region Mapping</h2>
                  <p>Where was this linguistic data collected?</p>
                </div>
                <div className="input-box">
                  <label><MapPin size={16} /> Select Province</label>
                  <div className="grid-options">
                    {['Punjab', 'Sindh', 'KPK', 'Balochistan', 'GB', 'Kashmir'].map(p => (
                      <button 
                        key={p} 
                        className={`option-tile ${formData.region === p ? 'selected' : ''}`}
                        onClick={() => setFormData({...formData, region: p})}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="btn-group">
                  <button className="back-btn" onClick={prevStep}>Back</button>
                  <button className="next-btn" onClick={nextStep} disabled={!formData.region}>Next</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3" 
                initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
                className="step-content"
              >
                <div className="step-header">
                  <h2 className="gold-text">Linguistic Data</h2>
                  <p>Define the dialect and its current status.</p>
                </div>
                <div className="input-box">
                  <label><Activity size={16} /> Dialect Name</label>
                  <input name="dialect" type="text" placeholder="e.g. Hindko" onChange={handleChange} />
                </div>
                <div className="input-box">
                  <label>Vitality Status</label>
                  <div className="vitality-selector">
                    {['Growing', 'Stable', 'Endangered'].map(v => (
                      <label key={v} className="v-tile">
                        <input type="radio" name="vitality" value={v} onChange={handleChange} />
                        <span>{v}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="btn-group">
                  <button className="back-btn" onClick={prevStep}>Back</button>
                  <button className="final-btn" onClick={() => alert("Uploading to Archive...")}>
                    <Database size={18} /> SYNC TO ARCHIVE
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Survey;