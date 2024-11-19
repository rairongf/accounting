'use client';

import { useState } from 'react';

export function useSearchFilter() {
  // states
  const [search, changeSearch] = useState<string>('');

  // actions
  const onSearchChanged = (value: string) => {
    changeSearch(value);
  };

  return {
    // states
    search,

    // actions
    onSearchChanged
  };
}
