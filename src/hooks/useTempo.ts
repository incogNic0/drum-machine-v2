import { useCallback, useState } from 'react';

const useTempo = (initialTempo?: number) => {
	const [tempo, setTempo] = useState<number>(initialTempo || 100);
	const updateTempo = useCallback((newTempo: number) => setTempo(newTempo), []);
	return [tempo, updateTempo];
};
