// C# code
import { RAM } from './models';
import * as fs from 'fs';
import { promisify } from 'util';

function KilobytesToGigabytes( kilobytes : number ) {
    return kilobytes / Math.pow(10, 6); 
}

export async function Parse( ramInfoFilePath : string = '/proc/meminfo' ) : Promise<RAM> {
    const readFile = promisify(fs.readFile);
    let file = await readFile(ramInfoFilePath, { encoding: 'utf8' });
    let memDict : Map<string, number> = new Map();

    file
        .split("\n")
        .forEach( ( str : string )  => {
            let pair : string[] = str
                .replace(" ", "")
                .replace("kB", "")
                .split(":")
            memDict.set(pair[0], KilobytesToGigabytes(parseFloat(pair[1])))
        });
    
    let memInfo = new RAM();
    let totalMemory = memDict.get("MemTotal");
    if (totalMemory !== undefined) memInfo.totalMemory = totalMemory;
    let usedMemory = memDict.get("MemFree");
    if (usedMemory !== undefined) memInfo.usedMemory = usedMemory;
    let totalMemoryOnDisk = memDict.get("SwapTotal");
    if (totalMemoryOnDisk !== undefined) memInfo.totalMemoryOnDisk = totalMemoryOnDisk;  
    let usedMemoryOnDisk = memDict.get("SwapFree");
    if (usedMemoryOnDisk !== undefined) memInfo.usedMemoryOnDisk = usedMemoryOnDisk;
        
    return memInfo;
}
