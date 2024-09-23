import { useLoaderStore } from '@/core/stores/LoaderStore';

export const loadWithLoader = async (asyncFunction: () => Promise<void>) => {
  const loaderStore = useLoaderStore();
  loaderStore.setLoading(true); // Start loading
  try {
    await asyncFunction();
  } finally {
    loaderStore.setLoading(false); // Stop loading
  }
};
