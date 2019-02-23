// C# code
// using System;
// using System.Linq;
// using System.Collections.Generic;
import { CPU, Core } from './models';
import * as fs from 'fs';
import { promisify } from 'util';


function convertMHztoGHz( mhz : number ) : number {
    return mhz / Math.pow(10, 3);
}

export async function Parse( cpuInfoFilePath : string = '/proc/cpuinfo' ) : CPU {
    const readFile = promisify( fs.readFile );
    let file = await readFile( cpuInfoFilePath, { encoding: 'utf8' } );
    let coreStringArrays : string[][] = 
        file
            .split( '\n\n' )
            .map( ( core : string ) => core.split( '\n' ) );
    
    let coreDicts : Map<string,string>[] =
        coreStringArrays
            .map( ( coreStringArray : string[] ) => {
                let coreDict : Map<string, string> = new Map();
                for( let line in coreStringArray ) {
                    let pair : string[] = line.split( ' : ' );
                    let key = pair[0].replace( ' ', '' );
                    let value = pair[1];
                    coreDict.set( key, value );
                }
                return coreDict;
            } )
    
    let cpu = new CPU();

    let modelname = coreDicts[0].get( 'modelname' );
    if( modelname !== undefined ) {
        cpu.name = modelname;
    }
    cpu.cores =
        coreDicts
            .map( ( coreDict : Map<string, string> ) => {
                let mhz = coreDict.get( 'cpuMHz' );
                if( mhz !== undefined ) {
                    return new Core( convertMHztoGHz( parseFloat( mhz ) ) )
                }
            } )
            .filter( ( core ) => { return core !== undefined } );


    // still unfinished
    
    
        
}

// namespace performance_reader
// {
//     public static class CPUInfoParser
//     {
//         public static CPU Parse( string cpuinfoFilePath )
//         {
//             // get fields: model name, cpu MHz
//             CPU cpu = new CPU();
//             cpu.Name = coreDicts[0]["modelname"];
//             cpu.Cores = 
//                 coreDicts
//                     .Select<Dictionary<string, string>, CPU.Core>(coreDict => 
//                             new CPU.Core { ClockSpeed = MegahertzToGigahertz(float.Parse(coreDict["cpuMHz"])) }
//                     )
//                     .ToArray();

//             float sumOfClockSpeeds = 0F;
//             foreach (CPU.Core core in cpu.Cores)
//             {
//                 sumOfClockSpeeds += core.ClockSpeed;
//             }

//             cpu.ClockSpeed = sumOfClockSpeeds / cpu.Cores.Length;

//             return cpu;
//         }

//     }
// }
