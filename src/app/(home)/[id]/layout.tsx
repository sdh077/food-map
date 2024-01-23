'use client';

import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

import { Navbar } from 'flowbite-react';
import { Local } from '@/interface/local';
import { supabase } from '@/lib/api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface DocsLayoutState {
  isCollapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  locals: Local[]
}

const getLocals = async (): Promise<Local[]> => {
  const { data, error } = await supabase.from('locals').select('*').returns<Local[]>()
  return data || []
}

export default function DocsLayout({ children }: PropsWithChildren) {
  const [isCollapsed, setCollapsed] = useState(true);
  const [locals, setLocals] = useState<Local[]>([]);
  useEffect(() => {
    getLocals().then(locals => setLocals(locals))
  }, [])

  const state: DocsLayoutState = {
    isCollapsed,
    setCollapsed,
    locals
  };

  return (
    <div className="w-full min-w-0 flex-auto">
      <div className="relative bg-white text-gray-600 antialiased dark:bg-gray-900 dark:text-gray-400">
        <DocsNavbar {...state} />
      </div>
      {children}
    </div>
  );
}

function DocsNavbar({ isCollapsed, setCollapsed, locals }: DocsLayoutState) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())
  const localId = params.get('local') ? Number(params.get('local')) : null
  const subId = params.get('sub') ? Number(params.get('sub')) : null
  const isSeoul = localId === 26
  const choice = (id: number | null, key: string) => {
    id ? params.set(key, String(id)) : params.delete(key)
    const url = `${pathname}?${params.toString()}`
    router.push(url, { scroll: false })
  }
  return (
    <Navbar
      fluid
      theme={{
        root: {
          base: 'sticky top-0 z-[60] bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between w-full mx-auto py-2.5 px-4',
          inner: {
            base: 'mx-auto flex flex-wrap justify-between items-center w-full',
          },
        },
      }}
    >
      {isSeoul && <div className='cursor-pointer' onClick={() => {
        choice(null, 'sub')
        choice(null, 'local')
      }}>이전</div>}
      {locals.filter(local => local.parent_local_id === (isSeoul ? 26 : null)).map(local =>
        <div className='cursor-pointer' key={local.name}
          onClick={() => choice(local.id, isSeoul ? 'sub' : 'local')}
        >
          {local.name}
        </div>
      )}
    </Navbar>
  );
}

