import { motion, AnimatePresence } from 'motion/react';
import { X, Globe, Check, ChevronLeft } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface VersionNavDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: 'english' | 'swahili';
  currentVersion: string;
  onNavigate: (language: 'english' | 'swahili', version: string) => void;
  anchorRef?: React.RefObject<HTMLElement>;
}

interface LanguageVersions {
  name: string;
  key: 'english' | 'swahili';
  versions: { code: string; name: string }[];
}

const languageVersions: LanguageVersions[] = [
  {
    name: 'English',
    key: 'english',
    versions: [{ code: 'KJV', name: 'King James Version' }],
  },
  {
    name: 'Swahili',
    key: 'swahili',
    versions: [{ code: 'SUV', name: 'Swahili Union Version' }],
  },
];

export function VersionNavDropdown({
  isOpen,
  onClose,
  currentLanguage,
  currentVersion,
  onNavigate,
  anchorRef,
}: VersionNavDropdownProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'swahili'>(currentLanguage);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update selected language when current language changes
  useEffect(() => {
    setSelectedLanguage(currentLanguage);
  }, [currentLanguage]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        anchorRef?.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose, anchorRef]);

  const selectedLangData = languageVersions.find(l => l.key === selectedLanguage);
  const versions = selectedLangData?.versions || [];

  const handleNavigate = (version: string) => {
    onNavigate(selectedLanguage, version);
    onClose();
  };

  const handleLanguageSelect = (lang: 'english' | 'swahili') => {
    setSelectedLanguage(lang);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="fixed md:absolute inset-0 md:inset-auto md:top-full md:left-0 md:mt-2 md:w-[600px] md:max-w-[90vw] bg-[#1a2942] border-0 md:border md:border-white/20 md:rounded-xl shadow-2xl z-[100] overflow-hidden flex flex-col"
        >
          {/* Unified Header */}
          <div className="p-2 md:p-3 border-b border-white/10 bg-gradient-to-r from-teal-500/10 to-blue-500/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 md:gap-2">
              <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-teal-400" />
              <span className="text-white text-xs md:text-sm font-medium">Bible Version</span>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 md:w-6 md:h-6 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex-shrink-0"
            >
              <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </div>

          {/* Unified Sub-Header */}
          <div className="p-2 md:p-3 border-b border-white/10 flex items-center gap-2 md:gap-3">
            {/* Selected Language Display */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 min-h-[32px] flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-[10px] md:text-xs font-medium truncate">Language</h3>
              </div>
              <span className="text-gray-400 text-[10px] md:text-xs ml-2 flex-shrink-0">
                {languageVersions.length} available
              </span>
            </div>
            
            {/* Selected Version Display */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 min-h-[32px] flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-[10px] md:text-xs font-medium truncate">{selectedLangData?.name}</h3>
              </div>
              <span className="text-gray-400 text-[10px] md:text-xs ml-2 flex-shrink-0">
                {versions.length} ver
              </span>
            </div>
          </div>

          <div className="flex flex-1 h-full md:h-auto md:max-h-[70vh] w-full overflow-hidden">
            {/* Left Sidebar - Languages (Mobile & Desktop) */}
            <div className="w-28 md:w-48 border-r border-white/10 flex flex-col bg-[#0f1a2e]">
              {/* Languages List */}
              <div className="flex-1 overflow-y-auto p-1.5 md:p-2">
                <div className="space-y-1 md:space-y-0.5">
                  {languageVersions.map((lang) => (
                    <button
                      key={lang.key}
                      onClick={() => handleLanguageSelect(lang.key)}
                      className={`w-full text-left px-2 md:px-2.5 py-2.5 md:py-2 rounded-lg transition-all flex items-center justify-between text-xs md:text-sm min-h-[44px] md:min-h-0 ${
                        selectedLanguage === lang.key
                          ? 'bg-gradient-to-r from-teal-500/20 to-blue-500/20 text-white border border-teal-500/30'
                          : 'text-gray-300 hover:bg-white/5 active:bg-white/10'
                      }`}
                    >
                      <span className="truncate">{lang.name}</span>
                      {lang.key === currentLanguage && (
                        <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-teal-400 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Versions (Mobile & Desktop) */}
            <div className="flex-1 flex flex-col overflow-hidden max-h-screen md:max-h-[70vh]">
              {/* Versions List */}
              <div className="flex-1 overflow-y-auto p-2 md:p-3">
                <div className="space-y-2">
                  {versions.map((version) => {
                    const isCurrent = version.code === currentVersion && selectedLanguage === currentLanguage;
                    
                    return (
                      <motion.button
                        key={version.code}
                        onClick={() => handleNavigate(version.code)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          w-full text-left p-2.5 md:p-3 rounded-lg min-h-[44px]
                          transition-all duration-200
                          ${isCurrent 
                            ? 'bg-gradient-to-br from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/30' 
                            : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-white/20 active:bg-white/10'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className={`font-medium text-sm ${isCurrent ? 'text-white' : 'text-white'}`}>
                              {version.code}
                            </div>
                            <div className={`text-xs mt-0.5 truncate ${isCurrent ? 'text-white/80' : 'text-gray-400'}`}>
                              {version.name}
                            </div>
                          </div>
                          {isCurrent && (
                            <Check className="w-4 h-4 text-white flex-shrink-0 ml-2" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Footer - Status */}
              <div className="p-2 md:p-3 border-t border-white/10 bg-white/5">
                <div className="flex items-center gap-2 md:gap-4 justify-center flex-wrap text-[10px] md:text-xs">
                  <div className="flex items-center gap-1 md:gap-1.5">
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded-md bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                    </div>
                    <span className="text-gray-400">Current</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
