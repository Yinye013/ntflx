import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  enabled?: boolean;
  threshold?: number;
  rootMargin?: string;
}

const useIntersectionObserver = ({
  onIntersect,
  enabled = true,
  threshold = 0.1,
  rootMargin = '100px'
}: UseIntersectionObserverProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [refSet, setRefSet] = useState(false);

  useEffect(() => {
    console.log('useIntersectionObserver effect running:', {
      enabled,
      hasTarget: !!targetRef.current,
      targetRefCurrent: targetRef.current,
      threshold,
      rootMargin
    });
    
    if (!enabled) {
      console.log('Observer disabled');
      return;
    }
    
    if (!targetRef.current) {
      console.log('No target ref found');
      return;
    }

    console.log('Creating intersection observer');
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        console.log('Intersection observer triggered:', {
          isIntersecting: entry.isIntersecting,
          enabled,
          threshold,
          rootMargin
        });
        if (entry.isIntersecting) {
          console.log('Calling onIntersect');
          onIntersect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentTarget = targetRef.current;
    console.log('Observing target:', currentTarget);
    observer.observe(currentTarget);

    return () => {
      console.log('Cleaning up observer');
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [onIntersect, enabled, threshold, rootMargin, refSet]);

  // Return a callback ref that also updates our state
  const callbackRef = (element: HTMLDivElement | null) => {
    targetRef.current = element;
    setRefSet(!!element);
    console.log('Callback ref set:', element);
  };

  return callbackRef;
};

export default useIntersectionObserver;