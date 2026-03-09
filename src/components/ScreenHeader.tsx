import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
}

const ScreenHeader = ({ title, subtitle }: ScreenHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 px-1 py-4">
      <button
        onClick={() => navigate(-1)}
        className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-foreground active:scale-90 transition-transform"
      >
        <ArrowLeft size={18} />
      </button>
      <div>
        <h1 className="text-lg font-bold text-foreground">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
};

export default ScreenHeader;
