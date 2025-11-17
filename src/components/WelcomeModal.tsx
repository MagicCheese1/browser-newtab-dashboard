
interface WelcomeModalProps {
  onGetStarted: () => void;
  onClose: () => void;
}

export function WelcomeModal({ onGetStarted, onClose }: WelcomeModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg p-8 w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Welcome to Dashboard!</h2>
          <p className="text-muted-foreground">
            Create your personalized dashboard by adding widgets.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-md hover:bg-accent transition-colors"
          >
            Maybe Later
          </button>
          <button
            onClick={onGetStarted}
            className="flex-1 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

