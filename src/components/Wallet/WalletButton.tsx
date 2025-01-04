import { formatWalletAddress } from '../../utils/formatters';

interface WalletButtonProps {
  name: string;
  icon: string;
  onClick: () => void;
  address?: string | null;
  isConnected?: boolean;
}

export const WalletButton: React.FC<WalletButtonProps> = ({
  name,
  icon,
  onClick,
  address,
  isConnected
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full p-3 rounded-lg bg-[#13141F] hover:bg-[#1C1D2A] transition-colors border border-gray-800 hover:border-gray-700"
    >
      <img src={icon} alt={name} className="w-8 h-8" />
      <div className="flex flex-col items-start">
        <span className="text-white text-sm font-medium">
          {isConnected ? 'Disconnect' : `Connect ${name}`}
        </span>
        {isConnected && address && (
          <span className="text-gray-400 text-xs">
            {formatWalletAddress(address)}
          </span>
        )}
      </div>
    </button>
  );
};