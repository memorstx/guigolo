export type ProcessCardBase = {
  id: string;
  phase: string;
};

export const PROCESS_STACK_BASE: ProcessCardBase[] = [
  { id: "phase-01", phase: "PHASE_01" },
  { id: "phase-02", phase: "PHASE_02" },
  { id: "phase-03", phase: "PHASE_03" },
  { id: "phase-04", phase: "PHASE_04" },
  { id: "phase-05", phase: "PHASE_05" },
];
