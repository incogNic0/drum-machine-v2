export type FilterNode = BiquadFilterType | null;

export interface Filter {
	cutoff: number;
	resonance: number;
	type: BiquadFilterType | null;
	filterNode: FilterNode;
}
