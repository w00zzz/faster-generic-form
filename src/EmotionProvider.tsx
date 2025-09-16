import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Crear un caché para Emotion
const cache = createCache({ key: 'css' });

export default function EmotionProvider({ children }: { children: React.ReactNode }) {
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}