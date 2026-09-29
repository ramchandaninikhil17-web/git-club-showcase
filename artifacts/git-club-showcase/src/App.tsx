import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { ProjectDetailPage } from '@/pages/ProjectDetailPage';
import { TechnologiesPage } from '@/pages/TechnologiesPage';
import { FeaturedPage } from '@/pages/FeaturedPage';
import { AboutPage } from '@/pages/AboutPage';
import NotFound from '@/pages/not-found';
import { Router as WouterRouter, Route, Switch } from 'wouter';

const queryClient = new QueryClient();

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="noise min-h-[100dvh] flex flex-col justify-between bg-background text-foreground transition-colors selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Shell>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/projects" component={ProjectsPage} />
        <Route path="/projects/:slug" component={ProjectDetailPage} />
        <Route path="/technologies" component={TechnologiesPage} />
        <Route path="/featured" component={FeaturedPage} />
        <Route path="/about" component={AboutPage} />
        <Route component={NotFound} />
      </Switch>
    </Shell>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;