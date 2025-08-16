export const DNOTE_REGEX = /^d(?<octShift>[_$]*)(?<deg>f?2|s?3|s?4|s?6|s?7|[1-7])(?<int>i(?:\d+|[23]min|[23]maj|6min|6maj|7min|7maj)?)?(?<dur>x\d+)?(?:%(?<durMod>\d+))?$/

export const DNOTE_DURS: DNoteDur[] = [1, 2, 4, 8, 16, 32]

export const DNOTE_INTS: DNoteInt[] = ["1", "2min", "2maj", "3", "3min", "3maj", "4", "5", "6", "6min", "6maj", "7", "7min", "7maj", "8"] 

export const SHIFT_VALS: number[] = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]