import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-text-primary">
        <header className="p-4 border-b border-border">
          <h1 className="text-xl font-bold text-primary">TutorTrust PK</h1>
        </header>
        <main className="flex-1 p-8 flex items-center justify-center">
          <div className="bg-surface p-6 rounded-xl border border-border text-center shadow-sm">
            <h2 className="text-2xl mb-4 font-semibold">Welcome to TutorTrust PK</h2>
            <p className="text-text-secondary">Setup is complete. Scaffolded with React, Tailwind, and Firebase.</p>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
