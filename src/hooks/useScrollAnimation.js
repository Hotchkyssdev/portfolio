import { useEffect, useRef, useState } from 'react';

/**
 * useScrollAnimation
 * Devuelve un ref y un booleano `isVisible`.
 * Cuando el elemento entra en el viewport, isVisible = true.
 *
 * Uso:
 *   const { ref, isVisible } = useScrollAnimation();
 *   <div ref={ref} className={isVisible ? 'visible' : ''}>...</div>
 */
export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // dispara solo una vez
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}