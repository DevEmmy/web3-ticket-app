import toast from 'react-hot-toast';
import { CheckCircle, AlertCircle } from 'lucide-react';

// Custom styling for Solana-themed toast notifications
const toastBaseStyle = {
  borderRadius: '8px',
  padding: '16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '14px',
  fontFamily: '"Inter", sans-serif',
  maxWidth: '380px',
};

/**
 * Display a success toast notification with Solana theme
 * @param message Success message to display
 */
const toastSuccess = (message: string) => {
  toast.custom((t) => (
    <div
      className={`${t.visible ? 'animate-enter' : 'animate-leave'}`}
      style={{
        ...toastBaseStyle,
        background: 'linear-gradient(135deg, #14F195 0%, #9945FF 100%)',
        border: '1px solid rgba(20, 241, 149, 0.3)',
        color: '#FFFFFF',
      }}
    >
      <CheckCircle size={20} strokeWidth={2.5} />
      <div>
        <strong style={{ fontWeight: 600 }}>Success!</strong>
        <p style={{ margin: '2px 0 0 0', opacity: 0.9 }}>{message}</p>
        {/* <div style={{ 
          fontSize: '12px', 
          opacity: 0.8, 
          marginTop: '4px',
          fontStyle: 'italic'
        }}>
          ✦ Solana network
        </div> */}
      </div>
    </div>
  ), {
    duration: 3000,
    position: 'top-right',
  });
};

/**
 * Display an error toast notification with Solana theme
 * @param message Error message to display
 */
const toastError = (message: string) => {
  toast.custom((t) => (
    <div
      className={`${t.visible ? 'animate-enter' : 'animate-leave'}`}
      style={{
        ...toastBaseStyle,
        background: '#1E1E2E',
        border: '1px solid #FF3B30',
        color: '#FFFFFF',
      }}
    >
      <AlertCircle size={20} color="#FF3B30" strokeWidth={2.5} />
      <div>
        <strong style={{ fontWeight: 600, color: '#FF3B30' }}>Error</strong>
        <p style={{ margin: '2px 0 0 0', opacity: 0.9 }}>{message}</p>
        {/* <div style={{ 
          fontSize: '12px', 
          opacity: 0.7, 
          marginTop: '4px'
        }}>
          <span style={{ color: '#9945FF' }}>SOL</span> transaction failed
        </div> */}
      </div>
    </div>
  ), {
    duration: 3000,
    position: 'top-right',
  });
};

// Usage examples:
// toastSuccess("Transaction confirmed! 0.5 SOL transferred");
// toastError("Transaction rejected: Insufficient balance");

export { toastSuccess, toastError };