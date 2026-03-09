import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import type { AddressData } from "@/lib/api";

interface AddressSuggestionsProps {
  suggestions: AddressData[];
  visible: boolean;
  onSelect: (address: AddressData) => void;
}

const AddressSuggestions = ({ suggestions, visible, onSelect }: AddressSuggestionsProps) => {
  return (
    <AnimatePresence>
      {visible && suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -4, scaleY: 0.96 }}
          animate={{ opacity: 1, y: 0, scaleY: 1 }}
          exit={{ opacity: 0, y: -4, scaleY: 0.96 }}
          transition={{ duration: 0.18 }}
          className="absolute left-0 right-0 top-[58px] z-50 bg-card border border-border rounded-2xl shadow-lg overflow-hidden"
        >
          {suggestions.map((addr, i) => (
            <button
              key={addr.sneeph}
              onClick={() => onSelect(addr)}
              className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-secondary/60 active:bg-secondary transition-colors"
              style={{ borderTop: i > 0 ? "1px solid hsl(var(--border))" : undefined }}
            >
              <div className="mt-0.5 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={15} className="text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground truncate">{addr.sneeph}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {addr.street_no} {addr.street_name}, {addr.lga} · {addr.state}
                </p>
              </div>
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddressSuggestions;
