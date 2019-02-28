export class RAM {
    totalMemory : number;
    usedMemory : number;
    totalMemoryOnDisk : number;
    usedMemoryOnDisk : number;

    constructor() {
        this.totalMemory = 0;
        this.totalMemoryOnDisk = 0;
        this.usedMemory = 0;
        this.usedMemoryOnDisk = 0;
    }
}

export class CPU {
    name : string;
    cores : Core[];
    constructor() {
        this.name = '';
        this.cores = [];
    }

}

export class Core {
    clockSpeed : number;
    constructor( clockSpeed : number ) {
        this.clockSpeed = clockSpeed;
    }
}
