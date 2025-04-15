
import React from 'react';
import { AppHeader } from '@/components/AppHeader';

const Focus = () => {
  return (
    <div className="min-h-screen flex flex-col japanese-paper">
      <AppHeader />
      
      <main className="flex-1 container max-w-2xl py-8 px-4 sm:px-6">
        <h1 className="text-2xl font-medium mb-6">Focus Mode</h1>
        
        <div className="text-center py-12">
          <p className="text-muted-foreground">Focus mode coming soon.</p>
          <p className="text-sm text-muted-foreground mt-2">This page will help you concentrate on your highest priority tasks.</p>
        </div>
      </main>
    </div>
  );
};

export default Focus;
