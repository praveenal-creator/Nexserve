/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { AiRepairAssistant } from './components/AiRepairAssistant';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Navbar } from './components/Navbar';
import { RepairRequestModal } from './components/RepairRequestModal';
import { ServiceCategories } from './components/ServiceCategories';
import { TrustSection } from './components/TrustSection';
import { ServiceCategoryId } from './data/fixnowData';

export default function App() {
  const [locationInput, setLocationInput] = useState('');
  const [submittedLocation, setSubmittedLocation] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceCategoryId>('plumbing');
  const [assistantCategory, setAssistantCategory] = useState<ServiceCategoryId | 'general'>('plumbing');
  const [uploadedPreviewUrl, setUploadedPreviewUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isRepairModalOpen, setIsRepairModalOpen] = useState(false);

  const scrollToElement = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryAndScroll = (categoryId: ServiceCategoryId) => {
    setSelectedServiceId(categoryId);
    setAssistantCategory(categoryId);
    scrollToElement('#services');
  };

  const handleOpenAssistantWithCategory = (categoryId: ServiceCategoryId) => {
    setAssistantCategory(categoryId);
    scrollToElement('#ai-assistant');
  };

  const handleStartRepairRequest = (categoryId?: ServiceCategoryId) => {
    if (categoryId) {
      setSelectedServiceId(categoryId);
    }
    setIsRepairModalOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-[#0b1f3a]">
        <Navbar onOpenRepairModal={() => handleStartRepairRequest()} />

        <main className="flex-1">
          <Hero
            location={locationInput}
            submittedLocation={submittedLocation}
            onLocationChange={setLocationInput}
            onLocationSubmit={(submitted) => setSubmittedLocation(submitted)}
            onSelectCategoryAndScroll={handleSelectCategoryAndScroll}
            onJumpToAssistant={() => scrollToElement('#ai-assistant')}
          />

          <ServiceCategories
            selectedCategoryId={selectedServiceId}
            onSelectCategory={(id) => {
              setSelectedServiceId(id);
              setAssistantCategory(id);
            }}
            onOpenAssistantWithCategory={handleOpenAssistantWithCategory}
            onStartRepairRequest={handleStartRepairRequest}
          />

          <AiRepairAssistant
            selectedCategory={assistantCategory}
            onCategoryChange={setAssistantCategory}
            uploadedPreviewUrl={uploadedPreviewUrl}
            uploadedFileName={uploadedFileName}
            onImageSelected={(previewUrl, fileName) => {
              setUploadedPreviewUrl(previewUrl);
              setUploadedFileName(fileName);
            }}
            onRequestTechnicianFromAssistant={handleStartRepairRequest}
          />

          <HowItWorks />

          <TrustSection />
        </main>

        <Footer onOpenRepairModal={() => handleStartRepairRequest()} />

        <RepairRequestModal
          isOpen={isRepairModalOpen}
          onClose={() => setIsRepairModalOpen(false)}
          initialCategory={selectedServiceId}
          initialLocation={submittedLocation || locationInput}
          hasAttachedPhoto={Boolean(uploadedPreviewUrl)}
          attachedPhotoName={uploadedFileName}
        />
      </div>
    </MotionConfig>
  );
}
