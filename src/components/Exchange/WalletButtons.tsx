import React from 'react';
import { Button } from '../common/Button';

const WalletButtons: React.FC = () => {
  return (
    <div className="space-y-4 mb-8">
      <Button 
        onClick={() => {}} 
        icon="/ton.png"
        className="bg-blue-600 hover:bg-blue-700"
      >
        Connect Wallet
      </Button>
      
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => {}}
          icon="/phantom.png"
          className="bg-purple-600 hover:bg-purple-700"
        >
          Phantom
        </Button>
        
        <Button
          onClick={() => {}}
          icon="/metamask.png"
          className="bg-orange-600 hover:bg-orange-700"
        >
          MetaMask
        </Button>
      </div>
    </div>
  );
};

export default WalletButtons;