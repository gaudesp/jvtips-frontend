import { useLoaderStore } from '@/core/stores/LoaderStore';

export const loadWithLoader = async (asyncFunction: () => Promise<void>,loaderKey: string) => {
  const loaderStore = useLoaderStore();
  
  loaderStore.setLoading(loaderKey, true);
  try {
    await asyncFunction();
  } finally {
    loaderStore.setLoading(loaderKey, false);
  }
};
